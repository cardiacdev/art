<?php

declare(strict_types=1);

namespace App\Mapper;

use App\ApiResource\UserDto;
use App\Entity\User;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

use function assert;

#[AsMapper(from: User::class, to: UserDto::class)]
class UserEntityToDtoMapper implements MapperInterface
{
    public function __construct(
        private MicroMapperInterface $microMapper
    ) {
    }

    public function load(object $from, string $toClass, array $context = []): object
    {
        $entity = $from;
        assert($entity instanceof User);

        $dto = new UserDto();

        return $dto;
    }

    public function populate(object $from, object $to, array $context = []): object
    {
        $entity = $from;
        assert($entity instanceof User);
        $dto = $to;
        assert($dto instanceof UserDto);

        $dto->id = $entity->getId();
        $dto->email = $entity->getEmail();
        $dto->username = $entity->getUsername();

        return $dto;
    }
}
