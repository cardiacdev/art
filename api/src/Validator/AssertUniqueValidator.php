<?php

declare(strict_types=1);

namespace App\Validator;

use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class AssertUniqueValidator extends ConstraintValidator
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private PropertyAccessorInterface $propertyAccessor
    ) {
    }

    public function validate(mixed $value, Constraint $constraint): void
    {
        if (!$constraint instanceof AssertUnique) {
            throw new UnexpectedTypeException($constraint, AssertUnique::class);
        }

        if (null === $value || '' === $value) {
            return;
        }

        $repository = $this->entityManager->getRepository($constraint->entityClass);

        foreach ($constraint->fields as $field) {
            $id = $this->propertyAccessor->getValue($value, 'id');
            $fieldValue = $this->propertyAccessor->getValue($value, $field);

            $criteria = new Criteria();
            $criteria->where(
                Criteria::expr()->eq($field, $fieldValue))
                    ->andWhere(Criteria::expr()->neq('id', $id));

            $resultIsEmpty = $repository->matching($criteria)->isEmpty();

            if (!$resultIsEmpty) {
                $this->context->buildViolation($constraint->message)
                    ->setParameter('{{ value }}', $fieldValue)
                    ->setParameter('{{ field }}', $field)
                    ->addViolation();
            }
        }
    }
}
