<?php

declare(strict_types=1);

namespace App\Mapper;

use App\ApiResource\InvoiceItemDto;
use App\ApiResource\TaskDto;
use App\Entity\Task;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

use function assert;

#[AsMapper(from: Task::class, to: TaskDto::class)]
class TaskEntityToDtoMapper implements MapperInterface
{
    public function __construct(
        private MicroMapperInterface $microMapper
    ) {
    }

    public function load(object $from, string $toClass, array $context = []): object
    {
        $entity = $from;
        assert($entity instanceof Task);

        $dto = new TaskDto();
        $dto->id = $entity->getId();

        return $dto;
    }

    public function populate(object $from, object $to, array $context = []): object
    {
        $entity = $from;
        assert($entity instanceof Task);
        $dto = $to;
        assert($dto instanceof TaskDto);

        $dto->title = $entity->getTitle();
        $dto->reference = $entity->getReference();
        $dto->euroAmount = $entity->getEuroAmount()?->getValue();
        $dto->externalHours = $entity->getExternalHours()?->getValue();
        $dto->remarks = $entity->getRemarks();
        $dto->plannedCompletionDate = $entity->getPlannedCompletionDate()?->format('d.m.Y');
        $dto->firstSandboxDeploymentDate = $entity->getFirstSandboxDeploymentDate()?->format('d.m.Y');
        $dto->firstLiveDeploymentDate = $entity->getFirstLiveDeploymentDate()?->format('d.m.Y');
        $dto->orderNumber = $entity->getOrderNumber();
        $dto->orderConfirmationDate = $entity->getOrderConfirmationDate()?->format('d.m.Y');

        $dto->invoiceItems = array_map(
            fn ($invoiceItem) => $this->microMapper->map($invoiceItem, InvoiceItemDto::class, [
                MicroMapperInterface::MAX_DEPTH => 0,
            ]),
            $entity->getInvoiceItems()->toArray()
        );

        return $dto;
    }
}
