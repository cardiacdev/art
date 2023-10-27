<?php

declare(strict_types=1);

namespace App\Validator;

use Attribute;
use Symfony\Component\Validator\Attribute\HasNamedArguments;
use Symfony\Component\Validator\Constraint;

#[Attribute]
class AssertUnique extends Constraint
{
    public string $message = 'Ein Objekt mit dem Wert "{{ value }}" für das Feld "{{ field }}" existiert bereits.';

    #[HasNamedArguments]
    public function __construct(
        array $groups = null,
        public array $fields,
        public string $entityClass,
    ) {
        parent::__construct([], $groups, null);
    }

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
