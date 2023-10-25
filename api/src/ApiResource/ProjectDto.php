<?php

declare(strict_types=1);

namespace App\ApiResource;

use ApiPlatform\Doctrine\Orm\State\Options;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Entity\Project;
use App\State\DtoToEntityStateProcessor;
use App\State\EntityToDtoStateProvider;
use Symfony\Component\Validator\Constraints\NotBlank;

#[ApiResource(
    shortName: 'Project',
    stateOptions: new Options(
        entityClass: Project::class,
    ),
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Patch(),
        new Delete(),
    ],
    security: 'is_granted("ROLE_USER")',
    provider: EntityToDtoStateProvider::class,
    processor: DtoToEntityStateProcessor::class,
    paginationItemsPerPage: 10,
)]
class ProjectDto
{
    #[ApiProperty(identifier: true, writable: false, readable: false)]
    public ?int $id = null;

    #[NotBlank]
    public ?string $name = null;

    public ?string $hourlyRate = null;

    public ?ClientDto $client = null;
}
