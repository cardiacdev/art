<?php

declare(strict_types=1);

namespace App\Mapper;

use App\ApiResource\TaskDto;
use App\Entity\Task;
use App\Repository\TaskRepository;
use Exception;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

use function assert;

#[AsMapper(from: TaskDto::class, to: Task::class)]
class TaskDtoToEntityMapper implements MapperInterface
{
    public function __construct(
        private TaskRepository $taskRepository,
        private MicroMapperInterface $microMapper
    ) {
    }

    public function load(object $from, string $toClass, array $context = []): object
    {
        $dto = $from;
        assert($dto instanceof TaskDto);

        $entity = $dto->id ? $this->taskRepository->find($dto->id) : new Task();
        if (!$entity) {
            throw new Exception(sprintf('Entity %d not found', $dto->id));
        }

        return $entity;
    }

    public function populate(object $from, object $to, array $context = []): object
    {
        $dto = $from;
        assert($dto instanceof TaskDto);
        $entity = $to;
        assert($entity instanceof Task);

        $entity->setTitle($dto->title);
        $entity->setReference($dto->reference);
        $entity->setEuroAmount($dto->euroAmount);
        $entity->setExternalHours($dto->externalHours);
        $entity->setRemarks($dto->remarks);
        $entity->setPlannedCompletionDate($dto->plannedCompletionDate);
        $entity->setFirstSandboxDeploymentDate($dto->firstSandboxDeploymentDate);
        $entity->setFirstLiveDeploymentDate($dto->firstLiveDeploymentDate);
        $entity->setOrderNumber($dto->orderNumber);
        $entity->setOrderConfirmationDate($dto->orderConfirmationDate);

        return $entity;
    }
}
