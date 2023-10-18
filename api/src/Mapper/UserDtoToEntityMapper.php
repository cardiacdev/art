<?php

declare(strict_types=1);

namespace App\Mapper;

use App\ApiResource\UserDto;
use App\Entity\User;
use App\Repository\UserRepository;
use Exception;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;

use function assert;

#[AsMapper(from: UserDto::class, to: User::class)]
class UserDtoToEntityMapper implements MapperInterface
{
    public function __construct(
        private UserRepository $userRepository,
        private UserPasswordHasherInterface $passwordHasher
    ) {
    }

    public function load(object $from, string $toClass, array $context = []): object
    {
        $dto = $from;
        assert($dto instanceof UserDto);

        $entity = $dto->id ? $this->userRepository->find($dto->id) : new User();
        if (!$entity) {
            throw new Exception(sprintf('Entity %d not found', $dto->id));
        }

        return $entity;
    }

    public function populate(object $from, object $to, array $context = []): object
    {
        $dto = $from;
        assert($dto instanceof UserDto);
        $entity = $to;
        assert($entity instanceof User);

        $entity->setEmail($dto->email);
        $entity->setUsername($dto->username);
        if ($dto->password) {
            $entity->setPassword($this->passwordHasher->hashPassword($entity, $dto->password));
        }

        return $entity;
    }
}
