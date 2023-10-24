<?php

declare(strict_types=1);

namespace App\ApiResource;

use ApiPlatform\Doctrine\Orm\State\Options;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Client;
use App\State\DtoToEntityStateProcessor;
use App\State\EntityToDtoStateProvider;
use Symfony\Component\Validator\Constraints\NotBlank;

#[ApiResource(
    shortName: 'Client',
    stateOptions: new Options(
        entityClass: Client::class,
    ),
    security: 'is_granted("ROLE_USER")',
    provider: EntityToDtoStateProvider::class,
    processor: DtoToEntityStateProcessor::class,
    paginationItemsPerPage: 10,
)]
class ClientDto
{
    #[ApiProperty(identifier: true, writable: false, readable: false)]
    public ?int $id = null;

    #[NotBlank]
    public ?string $name = null;

    /**
     * @var array<int, ProjectDto>
     */
    #[ApiProperty(writable: false)]
    public array $projects = [];

    /**
     * @var array<int, InvoiceDto>
     */
    #[ApiProperty(writable: false)]
    public array $invoices = [];
}
