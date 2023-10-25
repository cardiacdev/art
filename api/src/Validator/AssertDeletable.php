<?php

declare(strict_types=1);

namespace App\Validator;

use Attribute;
use Symfony\Component\Validator\Attribute\HasNamedArguments;
use Symfony\Component\Validator\Constraint;

#[Attribute]
class AssertDeletable extends Constraint
{
    public string $message = 'Dieses Objekt kann nicht gelöscht werden, da es von anderen Objekten referenziert wird. Folgende Felder sind betroffen: {{ fields }}';

    #[HasNamedArguments]
    public function __construct(
        array $groups = null,
        public array $fields
    ) {
        parent::__construct([], $groups, null);
    }

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
