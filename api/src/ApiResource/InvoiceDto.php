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
use App\Entity\Invoice;
use App\State\DtoToEntityStateProcessor;
use App\State\EntityToDtoStateProvider;
use App\Validator\AssertDeletable;
use Symfony\Component\Validator\Constraints\NotNull;

#[ApiResource(
    shortName: 'Invoice',
    stateOptions: new Options(
        entityClass: Invoice::class,
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
)]
#[AssertDeletable(
    fields: ['invoiceItems'],
    groups: ['deleteValidation']
)]
class InvoiceDto
{
    #[ApiProperty(identifier: true, writable: false, readable: false)]
    public ?int $id = null;

    public ?string $invoiceNumber = null;

    public ?string $billingDate = null;

    public ?string $remarks = null;

    #[NotNull]
    public ?ClientDto $client = null;

    /**
     * @var array<int, InvoiceItemDto>
     */
    #[ApiProperty(writable: false)]
    public array $invoiceItems = [];
}
