<?php

declare(strict_types=1);

namespace App\Mapper;

use App\ApiResource\InvoiceDto;
use App\Entity\Client;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use DateTimeImmutable;
use Exception;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

use function assert;

#[AsMapper(from: InvoiceDto::class, to: Invoice::class)]
class InvoiceDtoToEntityMapper implements MapperInterface
{
    public function __construct(
        private InvoiceRepository $invoiceRepository,
        private MicroMapperInterface $microMapper
    ) {
    }

    public function load(object $from, string $toClass, array $context = []): object
    {
        $dto = $from;
        assert($dto instanceof InvoiceDto);

        $entity = $dto->id ? $this->invoiceRepository->find($dto->id) : new Invoice();
        if (!$entity) {
            throw new Exception(sprintf('Entity %d not found', $dto->id));
        }

        return $entity;
    }

    public function populate(object $from, object $to, array $context = []): object
    {
        $dto = $from;
        assert($dto instanceof InvoiceDto);
        $entity = $to;
        assert($entity instanceof Invoice);

        $entity->setInvoiceNumber($dto->invoiceNumber);
        if ($dto->billingDate) {
            $entity->setBillingDate(new DateTimeImmutable($dto->billingDate));
        }
        $entity->setRemarks($dto->remarks);

        $entity->setClient($this->microMapper->map($dto->client, Client::class));

        return $entity;
    }
}
