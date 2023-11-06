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
use App\Validator\AssertUnique;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;

#[ApiResource(
    shortName: 'Project',
    stateOptions: new Options(
        entityClass: Project::class,
    ),
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            validationContext: ['groups' => ['Default', 'postValidation']]
        ),
        new Patch(
            validationContext: ['groups' => ['Default', 'patchValidation']],
        ),
        new Delete(),
    ],
    security: 'is_granted("ROLE_USER")',
    provider: EntityToDtoStateProvider::class,
    processor: DtoToEntityStateProcessor::class,
    paginationItemsPerPage: 10,
)]
#[AssertUnique(
    entityClass: Project::class,
    fields: ['name'],
    groups: ['postValidation', 'patchValidation'],
)]
class ProjectDto
{
    #[ApiProperty(identifier: true, writable: false, readable: false)]
    public ?int $id = null;

    #[NotBlank]
    public ?string $name = null;

    public ?string $hourlyRate = null;

    #[NotNull]
    public ?ClientDto $client = null;

    #[ApiProperty(writable: false)]
    public ?string $clientName = null;
}
