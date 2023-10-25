<?php

declare(strict_types=1);

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class AssertDeletableValidator extends ConstraintValidator
{
    public function validate(mixed $value, Constraint $constraint): void
    {
        if (!$constraint instanceof AssertDeletable) {
            throw new UnexpectedTypeException($constraint, AssertDeletable::class);
        }

        if (null === $value || '' === $value) {
            return;
        }

        if (empty($constraint->fields)) {
            return;
        }

        $dto = $value;
        $fields = $constraint->fields;

        $affectedFields = [];
        foreach ($fields as $field) {
            if (empty($dto->{$field})) {
                continue;
            }

            $affectedFields[] = $field;
        }

        if (empty($affectedFields)) {
            return;
        }

        $affectedFields = implode(', ', $affectedFields);

        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ fields }}', $affectedFields)
            ->addViolation();
    }
}
