<?php

declare(strict_types=1);

namespace App\Command\Security;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use Exception;
use InvalidArgumentException;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\QuestionHelper;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

use function count;

#[AsCommand('app:security:change-password', 'Changes the password of an user')]
class ChangeUserPasswordCommand extends Command
{
    public function __construct(
        private readonly UserPasswordHasherInterface $passwordHasher,
        private readonly EntityManagerInterface $entityManager,
        private readonly UserRepository $userRepository,
        string $name = null
    ) {
        parent::__construct($name);
    }

    protected function configure(): void
    {
        $this
            ->addArgument('identifier', InputArgument::REQUIRED, 'UID, username or email of the user to change password for.')
            ->addArgument('password', InputArgument::REQUIRED, 'New Password.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $identifier = $input->getArgument('identifier');
        $password = $input->getArgument('password');

        $user = $this->findExactUser($identifier, $output);

        if (null === $user) {
            throw new EntityNotFoundException(sprintf('User "%s" does not exist.', $identifier));
        }

        $encodedPassword = $this->passwordHasher->hashPassword(
            $user,
            $password
        );

        $user->setPassword($encodedPassword);

        $this->entityManager->flush();

        $output->writeln(sprintf(
            'Changed password for user <comment>%s</comment> [%s]',
            $user->getEmail(),
            $user->getId()
        ));

        return Command::SUCCESS;
    }

    protected function interact(InputInterface $input, OutputInterface $output): void
    {
        /** @var QuestionHelper $questionHelper */
        $questionHelper = $this->getHelper('question');

        if (!$input->getArgument('identifier')) {
            $question = new Question('Identifier:');
            $question->setValidator(function (string $identifier): string {
                if (empty($identifier)) {
                    throw new Exception('Identifier can not be empty');
                }

                return $identifier;
            });
            $callback = function (string $userInput): array {
                $userIdentifiers = $this->findBestUserIdentifiers($userInput);
                $suggestions = [];
                foreach ($userIdentifiers as $userIdentifier) {
                    $suggestions = array_merge($suggestions, array_values($userIdentifier));
                }

                return array_unique($suggestions);
            };
            $question->setAutocompleterCallback($callback);

            /** @var string $answer */
            $answer = $questionHelper->ask($input, $output, $question);
            $input->setArgument('identifier', $answer);
        }

        if (!$input->getArgument('password')) {
            $question = new Question('New Password:');
            $question->setValidator(function (string $password): string {
                if (empty($password)) {
                    throw new Exception('Password can not be empty');
                }

                return $password;
            });
            $question->setHidden(true);

            /** @var string $answer */
            $answer = $questionHelper->ask($input, $output, $question);
            $input->setArgument('password', $answer);
        }
    }

    /**
     * @return list<array{id: string, username: string, email: ?string}>
     */
    protected function findBestUserIdentifiers(string $userInput): array
    {
        $users = [];
        $user = $this->userRepository->findOneBy(['id' => (int) $userInput]);
        if (null !== $user) {
            $users[] = ['id' => $user->getId(), 'username' => $user->getUsername(), 'email' => $user->getEmail()];
        }

        return array_merge($users, $this->userRepository->findBestUsernameOrEmailIdentifier($userInput));
    }

    protected function findExactUser(string $identifier, OutputInterface $output): ?User
    {
        $users = [];
        $user = $this->userRepository->findOneBy(['id' => (int) $identifier]);
        if ($user) {
            $users[] = $user;
        }

        $user = $this->userRepository->findOneBy(['username' => $identifier]);
        if ($user) {
            $users[] = $user;
        }

        $user = $this->userRepository->findOneBy(['email' => $identifier]);
        if ($user) {
            $users[] = $user;
        }

        $users = array_unique($users);

        // Falls ein User eine UUID als Usernamen hat oder die E-Mail Adresse eines anderen Nutzers
        // kann es möglicherweise zu Überschneidungen kommen.
        if (count($users) > 1) {
            $output->writeln('List of users found for the given identifier:');
            /** @var User $user */
            foreach ($users as $user) {
                $output->writeln(sprintf(
                    '<comment>%s</comment> (%s, %s)',
                    $user->getId(),
                    $user->getUsername(),
                    $user->getEmail(),
                ));
            }
            throw new InvalidArgumentException('Multiple users found by identifier: '.$identifier.'. Please use the exact UUID of the user.');
        }

        return array_pop($users);
    }
}
