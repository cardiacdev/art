<?php

declare(strict_types=1);

namespace App\ApiResource;

use ApiPlatform\Doctrine\Orm\State\Options;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Task;
use App\State\DtoToEntityStateProcessor;
use App\State\EntityToDtoStateProvider;
use Symfony\Component\Validator\Constraints\NotBlank;

#[ApiResource(
    shortName: 'Task',
    stateOptions: new Options(
        entityClass: Task::class,
    ),
    security: 'is_granted("ROLE_USER")',
    provider: EntityToDtoStateProvider::class,
    processor: DtoToEntityStateProcessor::class,
    paginationItemsPerPage: 10,
)]
class TaskDto
{
    #[ApiProperty(identifier: true, writable: false, readable: false)]
    public ?int $id = null;

    #[NotBlank]
    public ?string $title = null;

    public ?string $reference = null;

    public ?string $euroAmount = null;

    public ?string $externalHours = null;

    public ?string $remarks = null;

    public ?string $plannedCompletionDate = null;

    public ?string $firstSandboxDeploymentDate = null;

    public ?string $firstLiveDeploymentDate = null;

    public ?string $orderNumber = null;

    public ?string $orderConfirmationDate = null;

    /**
     * @var array<int, InvoiceItemDto>
     */
    #[ApiProperty(writable: false)]
    public array $invoiceItems = [];
}