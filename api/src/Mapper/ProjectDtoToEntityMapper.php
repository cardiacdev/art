<?php

declare(strict_types=1);

namespace App\Mapper;

use App\ApiResource\ProjectDto;
use App\Entity\Client;
use App\Entity\Project;
use App\Model\Decimal;
use App\Repository\ProjectRepository;
use Exception;
use Symfonycasts\MicroMapper\AsMapper;
use Symfonycasts\MicroMapper\MapperInterface;
use Symfonycasts\MicroMapper\MicroMapperInterface;

use function assert;

#[AsMapper(from: ProjectDto::class, to: Project::class)]
class ProjectDtoToEntityMapper implements MapperInterface
{
    public function __construct(
        private ProjectRepository $projectRepository,
        private MicroMapperInterface $microMapper
    ) {
    }

    public function load(object $from, string $toClass, array $context = []): object
    {
        $dto = $from;
        assert($dto instanceof ProjectDto);

        $entity = $dto->id ? $this->projectRepository->find($dto->id) : new Project();
        if (!$entity) {
            throw new Exception(sprintf('Entity %d not found', $dto->id));
        }

        return $entity;
    }

    public function populate(object $from, object $to, array $context = []): object
    {
        $dto = $from;
        assert($dto instanceof ProjectDto);
        $entity = $to;
        assert($entity instanceof Project);

        $entity->setName($dto->name);
        $entity->setHourlyRate($dto->hourlyRate ? new Decimal($dto->hourlyRate) : null);

        $entity->setClient($this->microMapper->map($dto->client, Client::class));

        return $entity;
    }
}
