<?php

declare(strict_types=1);

namespace App\Mapper;

use App\ApiResource\ClientDto;
use App\Entity\Client;
use App\Repository\ClientRepository;
use Exception;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;

use function assert;

#[AsMapper(from: ClientDto::class, to: Client::class)]
class ClientDtoToEntityMapper implements MapperInterface
{
    public function __construct(
        private ClientRepository $clientRepository,
    ) {
    }

    public function load(object $from, string $toClass, array $context = []): object
    {
        $dto = $from;
        assert($dto instanceof ClientDto);

        $entity = $dto->id ? $this->clientRepository->find($dto->id) : new Client();
        if (!$entity) {
            throw new Exception(sprintf('Entity %d not found', $dto->id));
        }

        return $entity;
    }

    public function populate(object $from, object $to, array $context = []): object
    {
        $dto = $from;
        assert($dto instanceof ClientDto);
        $entity = $to;
        assert($entity instanceof Client);

        $entity->setName($dto->name);
        // TODO - Relations

        return $entity;
    }
}
