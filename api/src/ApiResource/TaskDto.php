<?php

declare(strict_types=1);

namespace App\ApiResource;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\State\Options;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Symfony\Validator\Exception\ValidationException;
use App\ApiPlatform\ApiFilter\InvoiceItemsFilter;
use App\Entity\Task;
use App\State\DtoToEntityStateProcessor;
use App\State\EntityToDtoStateProvider;
use App\Validator\AssertDeletable;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;

#[ApiResource(
    shortName: 'Task',
    stateOptions: new Options(
        entityClass: Task::class,
    ),
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Patch(),
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
        'groups' => ['task:read'],
    ],
)]
#[ApiResource(
    uriTemplate: '/projects/{projectId}/tasks',
    stateOptions: new Options(
        entityClass: Task::class,
    ),
    shortName: 'Project',
    openapiContext: [
        'summary' => 'Retrieve all tasks for a project',
    ],
    uriVariables: [
        'projectId' => new Link(
            fromClass: ProjectDto::class,
            fromProperty: 'tasks'
        ),
    ],
    operations: [new GetCollection()],
    security: 'is_granted("ROLE_USER")',
    provider: EntityToDtoStateProvider::class,
    processor: DtoToEntityStateProcessor::class,
    normalizationContext: [
        'groups' => ['task:read'],
    ],
    order: ['orderConfirmationDate' => 'DESC'],
)]
#[
    ApiFilter(
        OrderFilter::class,
        properties: ['title', 'reference', 'euroAmount', 'externalHours', 'plannedCompletionDate', 'firstSandboxDeploymentDate', 'firstLiveDeploymentDate', 'orderNumber', 'orderConfirmationDate', 'remarks'],
    )
]
#[ApiFilter(InvoiceItemsFilter::class)]
#[AssertDeletable(
    fields: ['invoiceItems'],
    groups: ['deleteValidation']
)]
class TaskDto
{
    #[ApiProperty(identifier: true, writable: false, readable: false)]
    public ?int $id = null;

    #[NotBlank]
    #[Groups(['task:read'])]
    public ?string $title = null;

    #[Groups(['task:read'])]
    public ?string $reference = null;

    #[Groups(['task:read'])]
    public ?string $euroAmount = null;

    #[Groups(['task:read'])]
    public ?string $externalHours = null;

    #[Groups(['task:read'])]
    public ?string $remarks = null;

    #[Groups(['task:read'])]
    public ?string $plannedCompletionDate = null;

    #[Groups(['task:read'])]
    public ?string $firstSandboxDeploymentDate = null;

    #[Groups(['task:read'])]
    public ?string $firstLiveDeploymentDate = null;

    #[Groups(['task:read'])]
    public ?string $orderNumber = null;

    #[Groups(['task:read'])]
    public ?string $orderConfirmationDate = null;

    #[NotNull]
    #[Groups(['task:read'])]
    public ?ProjectDto $project = null;

    /**
     * @var array<int, InvoiceItemDto>
     */
    #[ApiProperty(writable: false)]
    #[Groups(['task:read'])]
    public array $invoiceItems = [];
}
