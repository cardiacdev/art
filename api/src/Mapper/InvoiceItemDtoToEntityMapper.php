<?php

declare(strict_types=1);

namespace App\Mapper;

use App\ApiResource\InvoiceItemDto;
use App\Entity\Invoice;
use App\Entity\InvoiceItem;
use App\Entity\Task;
use App\Model\Decimal;
use App\Repository\InvoiceItemRepository;
use Exception;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

use function assert;

#[AsMapper(from: InvoiceItemDto::class, to: InvoiceItem::class)]
class InvoiceItemDtoToEntityMapper implements MapperInterface
{
    public function __construct(
        private InvoiceItemRepository $invoiceItemRepository,
        private MicroMapperInterface $microMapper
    ) {
    }

    public function load(object $from, string $toClass, array $context = []): object
    {
        $dto = $from;
        assert($dto instanceof InvoiceItemDto);

        $entity = $dto->id ? $this->invoiceItemRepository->find($dto->id) : new InvoiceItem();
        if (!$entity) {
            throw new Exception(sprintf('Entity %d not found', $dto->id));
        }

        return $entity;
    }

    public function populate(object $from, object $to, array $context = []): object
    {
        $dto = $from;
        assert($dto instanceof InvoiceItemDto);
        $entity = $to;
        assert($entity instanceof InvoiceItem);

        $entity->setEuroAmount($dto->euroAmount ? new Decimal($dto->euroAmount) : null);
        $entity->setTask($this->microMapper->map($dto->task, Task::class));
        $entity->setInvoice($this->microMapper->map($dto->invoice, Invoice::class));

        return $entity;
    }
}
