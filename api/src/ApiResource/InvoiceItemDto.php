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
use App\Entity\InvoiceItem;
use App\State\DtoToEntityStateProcessor;
use App\State\EntityToDtoStateProvider;
use Symfony\Component\Validator\Constraints\NotNull;

#[ApiResource(
    shortName: 'InvoiceItem',
    stateOptions: new Options(
        entityClass: InvoiceItem::class,
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
class InvoiceItemDto
{
    #[ApiProperty(identifier: true, writable: false, readable: false)]
    public ?int $id = null;

    public ?string $euroAmount = null;

    #[NotNull]
    public ?TaskDto $task = null;

    #[NotNull]
    public ?InvoiceDto $invoice = null;
}
