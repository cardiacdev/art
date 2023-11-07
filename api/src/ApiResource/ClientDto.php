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
use ApiPlatform\Symfony\Validator\Exception\ValidationException;
use App\Entity\Client;
use App\State\DtoToEntityStateProcessor;
use App\State\EntityToDtoStateProvider;
use App\Validator\AssertDeletable;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\NotBlank;

#[ApiResource(
    shortName: 'Client',
    stateOptions: new Options(
        entityClass: Client::class,
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
    paginationItemsPerPage: 10,
    normalizationContext: [
        'groups' => ['client:read'],
    ],
)]
#[AssertDeletable(
    fields: ['projects', 'invoices'],
    groups: ['deleteValidation']
)]
class ClientDto
{
    #[ApiProperty(identifier: true, writable: false, readable: false)]
    public ?int $id = null;

    #[NotBlank]
    #[Groups(['client:read', 'project:read'])]
    public ?string $name = null;

    /**
     * @var array<int, ProjectDto>
     */
    #[ApiProperty(writable: false)]
    #[Groups(['client:read'])]
    public array $projects = [];

    /**
     * @var array<int, InvoiceDto>
     */
    #[ApiProperty(writable: false)]
    #[Groups(['client:read'])]
    public array $invoices = [];
}
