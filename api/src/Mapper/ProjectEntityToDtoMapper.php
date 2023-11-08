<?php

declare(strict_types=1);

namespace App\Mapper;

use App\ApiResource\ClientDto;
use App\ApiResource\ProjectDto;
use App\ApiResource\TaskDto;
use App\Entity\Project;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

use function assert;

#[AsMapper(from: Project::class, to: ProjectDto::class)]
class ProjectEntityToDtoMapper implements MapperInterface
{
    public function __construct(
        private MicroMapperInterface $microMapper
    ) {
    }

    public function load(object $from, string $toClass, array $context = []): object
    {
        $entity = $from;
        assert($entity instanceof Project);

        $dto = new ProjectDto();
        $dto->id = $entity->getId();

        return $dto;
    }

    public function populate(object $from, object $to, array $context = []): object
    {
        $entity = $from;
        assert($entity instanceof Project);
        $dto = $to;
        assert($dto instanceof ProjectDto);

        $dto->name = $entity->getName();
        $dto->hourlyRate = $entity->getHourlyRate()?->getValue();
        $dto->client = $this->microMapper->map($entity->getClient(), ClientDto::class, [
            MicroMapperInterface::MAX_DEPTH => 1,
        ]);
        $dto->tasks = array_map(
            fn ($task) => $this->microMapper->map($task, TaskDto::class, [
                MicroMapperInterface::MAX_DEPTH => 1,
            ]),
            $entity->getTasks()->toArray()
        );

        return $dto;
    }
}
