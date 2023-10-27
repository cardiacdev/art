<?php

declare(strict_types=1);

namespace App\Security\Voter;

use App\ApiResource\UserDto;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

use function assert;
use function in_array;

class UserVoter extends Voter
{
    public const EDIT_PASSWORD = 'EDIT_PASSWORD';

    public function __construct(private Security $security)
    {
    }

    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, [self::EDIT_PASSWORD])
            && $subject instanceof UserDto;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        // if the user is anonymous, do not grant access
        if (!$user instanceof User) {
            return false;
        }

        assert($subject instanceof UserDto);

        switch ($attribute) {
            case self::EDIT_PASSWORD:
                if ($subject->id === $user->getId()) {
                    return true;
                }

                break;
        }

        return false;
    }
}
