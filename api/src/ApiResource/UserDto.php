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
use App\Entity\User;
use App\State\DtoToEntityStateProcessor;
use App\State\EntityToDtoStateProvider;
use App\Validator\AssertUnique;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;

#[ApiResource(
    shortName: 'User',
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            security: 'is_granted("PUBLIC_ACCESS")',
            validationContext: ['groups' => ['Default', 'postValidation']]
        ),
        new Patch(
            validationContext: ['groups' => ['Default', 'patchValidation']]
        ),
        new Delete(),
    ],
    stateOptions: new Options(
        entityClass: User::class,
    ),
    security: 'is_granted("ROLE_USER")',
    provider: EntityToDtoStateProvider::class,
    processor: DtoToEntityStateProcessor::class,
    paginationItemsPerPage: 10,
)]
class UserDto
{
    #[ApiProperty(identifier: true, writable: false, readable: false)]
    public ?int $id = null;

    #[NotBlank]
    #[Email]
    #[AssertUnique(
        entityClass: User::class,
        field: 'email',
        groups: ['postValidation', 'patchValidation'],
    )]
    public ?string $email = null;

    #[NotBlank]
    #[AssertUnique(
        entityClass: User::class,
        field: 'username',
        groups: ['postValidation', 'patchValidation'],
    )]
    public ?string $username = null;

    /**
     * The plaintext password when being set or changed.
     */
    #[ApiProperty(readable: false, writable: true)]
    #[NotBlank(groups: ['postValidation'])]
    public ?string $password = null;
}
