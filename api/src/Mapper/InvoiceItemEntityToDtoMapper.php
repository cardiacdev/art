<?php

declare(strict_types=1);

namespace App\Mapper;

use App\ApiResource\InvoiceDto;
use App\ApiResource\InvoiceItemDto;
use App\ApiResource\TaskDto;
use App\Entity\InvoiceItem;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

use function assert;

#[AsMapper(from: InvoiceItem::class, to: InvoiceItemDto::class)]
class InvoiceItemEntityToDtoMapper implements MapperInterface
{
    public function __construct(
        private MicroMapperInterface $microMapper
    ) {
    }

    public function load(object $from, string $toClass, array $context = []): object
    {
        $entity = $from;
        assert($entity instanceof InvoiceItem);

        $dto = new InvoiceItemDto();
        $dto->id = $entity->getId();

        return $dto;
    }

    public function populate(object $from, object $to, array $context = []): object
    {
        $entity = $from;
        assert($entity instanceof InvoiceItem);
        $dto = $to;
        assert($dto instanceof InvoiceItemDto);

        $dto->euroAmount = $entity->getEuroAmount()?->getValue();
        $dto->task = $this->microMapper->map($entity->getTask(), TaskDto::class);
        $dto->invoice = $this->microMapper->map($entity->getInvoice(), InvoiceDto::class);

        return $dto;
    }
}
