<?php

declare(strict_types=1);

namespace App\Doctrine\DBAL\Type;

use App\Model\Decimal;
use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\Type;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class PercentageColumnType extends Type
{
    public const TYPE_NAME = 'percentage';

    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform): string
    {
        return $platform->getDecimalTypeDeclarationSQL([
            'precision' => 14,
            'scale' => 13,
        ] + $fieldDeclaration);
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform): ?string
    {
        if (null !== $value) {
            if (!$value instanceof Decimal) {
                throw new UnexpectedTypeException($value, Decimal::class);
            }

            return $value->getValue();
        }

        return null;
    }

    public function convertToPHPValue($value, AbstractPlatform $platform): ?Decimal
    {
        return null !== $value
            ? new Decimal((string) $value)
            : null;
    }

    public function requiresSQLCommentHint(AbstractPlatform $platform): bool
    {
        return true;
    }

    public function getName(): string
    {
        return self::TYPE_NAME;
    }
}
