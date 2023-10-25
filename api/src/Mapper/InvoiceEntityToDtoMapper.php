<?php

declare(strict_types=1);

namespace App\Mapper;

use App\ApiResource\ClientDto;
use App\ApiResource\InvoiceDto;
use App\ApiResource\InvoiceItemDto;
use App\Entity\Invoice;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

use function assert;

#[AsMapper(from: Invoice::class, to: InvoiceDto::class)]
class InvoiceEntityToDtoMapper implements MapperInterface
{
    public function __construct(
        private MicroMapperInterface $microMapper
    ) {
    }

    public function load(object $from, string $toClass, array $context = []): object
    {
        $entity = $from;
        assert($entity instanceof Invoice);

        $dto = new InvoiceDto();
        $dto->id = $entity->getId();

        return $dto;
    }

    public function populate(object $from, object $to, array $context = []): object
    {
        $entity = $from;
        assert($entity instanceof Invoice);
        $dto = $to;
        assert($dto instanceof InvoiceDto);

        $dto->invoiceNumber = $entity->getInvoiceNumber();
        $dto->billingDate = $entity->getBillingDate()?->format('d.m.Y');
        $dto->remarks = $entity->getRemarks();

        $dto->client = $this->microMapper->map($entity->getClient(), ClientDto::class);

        $dto->invoiceItems = array_map(
            fn ($invoiceItem) => $this->microMapper->map($invoiceItem, InvoiceItemDto::class, [
                MicroMapperInterface::MAX_DEPTH => 0,
            ]),
            $entity->getInvoiceItems()->toArray()
        );

        return $dto;
    }
}
