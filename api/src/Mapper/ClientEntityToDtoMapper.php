<?php

declare(strict_types=1);

namespace App\Mapper;

use App\ApiResource\ClientDto;
use App\ApiResource\InvoiceDto;
use App\Entity\Client;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

use function assert;

#[AsMapper(from: Client::class, to: ClientDto::class)]
class ClientEntityToDtoMapper implements MapperInterface
{
    public function __construct(
        private MicroMapperInterface $microMapper
    ) {
    }

    public function load(object $from, string $toClass, array $context = []): object
    {
        $entity = $from;
        assert($entity instanceof Client);

        $dto = new ClientDto();
        $dto->id = $entity->getId();

        return $dto;
    }

    public function populate(object $from, object $to, array $context = []): object
    {
        $entity = $from;
        assert($entity instanceof Client);
        $dto = $to;
        assert($dto instanceof ClientDto);

        $dto->name = $entity->getName();
        $dto->projects = array_map(
            fn (object $project) => $this->microMapper->map($project, ClientDto::class, [
                MicroMapperInterface::MAX_DEPTH => 1,
            ]),
            $entity->getProjects()->toArray()
        );

        $dto->invoices = array_map(
            fn (object $invoice) => $this->microMapper->map($invoice, InvoiceDto::class, [
                MicroMapperInterface::MAX_DEPTH => 1,
            ]),
            $entity->getInvoices()->toArray()
        );

        return $dto;
    }
}
