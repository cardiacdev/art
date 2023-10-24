<?php

declare(strict_types=1);

namespace App\ApiResource;

use ApiPlatform\Doctrine\Orm\State\Options;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Invoice;
use App\State\DtoToEntityStateProcessor;
use App\State\EntityToDtoStateProvider;

#[ApiResource(
    shortName: 'Invoice',
    stateOptions: new Options(
        entityClass: Invoice::class,
    ),
    security: 'is_granted("ROLE_USER")',
    provider: EntityToDtoStateProvider::class,
    processor: DtoToEntityStateProcessor::class,
    paginationItemsPerPage: 10,
)]
class InvoiceDto
{
    #[ApiProperty(identifier: true, writable: false, readable: false)]
    public ?int $id = null;

    public ?string $invoiceNumber = null;

    public ?string $billingDate = null;

    public ?string $remarks = null;

    public ?ClientDto $client = null;

    /**
     * @var array<int, InvoiceItemDto>
     */
    #[ApiProperty(writable: false)]
    public array $invoiceItems = [];
}
