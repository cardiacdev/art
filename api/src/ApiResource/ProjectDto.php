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
use App\Validator\AssertDeletable;
use App\Validator\AssertUnique;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;

#[ApiResource(
    shortName: 'Project',
    stateOptions: new Options(
        entityClass: Project::class,
    ),
    operations: [
        new Get(
            normalizationContext: [
                'groups' => ['project:read', 'project:item:get'],
            ],
        ),
        new GetCollection(),
        new Post(
            validationContext: ['groups' => ['Default', 'postValidation']]
        ),
        new Patch(
            validationContext: ['groups' => ['Default', 'patchValidation']],
        ),
        new Delete(
            validate: true,
            validationContext: [
                'groups' => ['deleteValidation'],
            ],
            exceptionToStatus: [
                ValidationException::class => 422,
            ],
        ),
    ],
    security: 'is_granted("ROLE_USER")',
    provider: EntityToDtoStateProvider::class,
    processor: DtoToEntityStateProcessor::class,
    normalizationContext: [
        'groups' => ['project:read'],
    ],
)]
#[AssertUnique(
    entityClass: Project::class,
    fields: ['name'],
    groups: ['postValidation', 'patchValidation'],
)]
#[AssertDeletable(
    fields: ['tasks'],
    groups: ['deleteValidation']
)]
class ProjectDto
{
    #[ApiProperty(identifier: true, writable: false, readable: false)]
    public ?int $id = null;

    #[NotBlank]
    #[Groups(['project:read', 'client:read'])]
    public ?string $name = null;

    #[Groups(['project:read'])]
    public ?string $hourlyRate = null;

    #[NotNull]
    #[Groups(['project:read'])]
    public ?ClientDto $client = null;

    /**
     * @var array<int, TaskDto>
     */
    #[Groups(['project:read'])]
    #[ApiProperty(writable: false)]
    public array $tasks = [];

    /**
     *  Count of tasks that aren't fully billed yet.
     */
    #[Groups(['project:item:get'])]
    #[ApiProperty(writable: false)]
    public ?int $openTasks = null;

    /**
     * Sum of all euro amounts of all tasks.
     */
    #[Groups(['project:item:get'])]
    #[ApiProperty(writable: false)]
    public ?string $euroAmount = null;

    /**
     * Sum of all billed amounts of all tasks.
     */
    #[Groups(['project:item:get'])]
    #[ApiProperty(writable: false)]
    public ?string $billedAmount = null;

    /**
     *  Sum of all not yet billed amounts of all tasks.
     *  Calculated by subtracting the sum of all billed amounts from the sum of all euro amounts.
     */
    #[Groups(['project:item:get'])]
    #[ApiProperty(writable: false)]
    public ?string $notBilledAmount = null;
}
