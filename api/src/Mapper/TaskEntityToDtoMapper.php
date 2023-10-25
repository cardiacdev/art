<?php

declare(strict_types=1);

namespace App\Mapper;

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
        $dto->euroAmount = $entity->getEuroAmount();
        $dto->externalHours = $entity->getExternalHours();
        $dto->remarks = $entity->getRemarks();
        $dto->plannedCompletionDate = $entity->getPlannedCompletionDate();
        $dto->firstSandboxDeploymentDate = $entity->getFirstSandboxDeploymentDate();
        $dto->firstLiveDeploymentDate = $entity->getFirstLiveDeploymentDate();
        $dto->orderNumber = $entity->getOrderNumber();
        $dto->orderConfirmationDate = $entity->getOrderConfirmationDate();

        // TODO - InvoiceItems

        return $dto;
    }
}
