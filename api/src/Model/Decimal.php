<?php

declare(strict_types=1);

namespace App\Model;

use BCMathExtended\BC;
use Doctrine\Common\Comparable;
use Stringable;

use const STR_PAD_RIGHT;

use function str_contains;

class Decimal implements Comparable, Stringable
{
    public const SCALE_MAX = 12;
    public const SCALE_CURRENCY_RESULT = 2;
    private string $value;

    public function __construct(string $value = '0.0')
    {
        if (str_contains($value, 'E')) {
            $value = self::floatFromScientificFormat($value);
        }

        /**
         * If it contains a dot, pad with '0' until it has 2 digits after the dot
         * If it does not contain a dot, append '.00'.
         */
        if (str_contains($value, '.')) {
            $parts = explode('.', $value);
            $value = $parts[0].'.'.str_pad($parts[1], 2, '0', STR_PAD_RIGHT);
        } else {
            $value .= '.00';
        }

        $this->value = $value;
    }

    public function __toString(): string
    {
        return $this->value;
    }

    public function getValue(): string
    {
        return $this->value;
    }

    /**
     * @param Decimal $other
     */
    public function compareTo($other): int
    {
        return $this->compare($other, self::SCALE_MAX);
    }

    public function compare(self $other, int $scale = self::SCALE_CURRENCY_RESULT): int
    {
        return bccomp($this->value, $other->getValue(), $scale);
    }

    public function equals(self $other, int $scale = self::SCALE_MAX, bool $round = false): bool
    {
        if (!$round) {
            return 0 === $this->compare($other, $scale);
        }

        return 0 === self::round($this, $scale)->compare(self::round($other, $scale), $scale);
    }

    public function compareToZero(int $scale = self::SCALE_CURRENCY_RESULT): int
    {
        return bccomp($this->value, '0.0', $scale);
    }

    public function lt(self $other, int $scale = self::SCALE_CURRENCY_RESULT): bool
    {
        return $this->compare($other, $scale) < 0;
    }

    public function lte(self $other, int $scale = self::SCALE_CURRENCY_RESULT): bool
    {
        return $this->compare($other, $scale) <= 0;
    }

    public function gt(self $other, int $scale = self::SCALE_CURRENCY_RESULT): bool
    {
        return $this->compare($other, $scale) > 0;
    }

    public function gte(self $other, int $scale = self::SCALE_CURRENCY_RESULT): bool
    {
        return $this->compare($other, $scale) >= 0;
    }

    public function isZero(int $scale = self::SCALE_CURRENCY_RESULT): bool
    {
        return 0 === bccomp($this->value, '0.0', $scale);
    }

    public function isNegative(int $scale = self::SCALE_CURRENCY_RESULT): bool
    {
        return $this->lt(new self(), $scale);
    }

    public function isPositive(int $scale = self::SCALE_CURRENCY_RESULT): bool
    {
        return $this->gt(new self(), $scale);
    }

    public static function round(self $decimal, int $scale = self::SCALE_CURRENCY_RESULT): self
    {
        return new self(BC::round($decimal->getValue(), $scale));
    }

    public static function sum(array $decimals, int $scale = self::SCALE_MAX): self
    {
        return array_reduce(
            $decimals,
            fn (self $carry, self $decimal) => self::add($carry, $decimal, $scale),
            new self('0.0')
        );
    }

    public static function add(self $left, self $right, int $scale = self::SCALE_MAX): self
    {
        $val = bcadd($left->getValue(), $right->getValue(), $scale);

        return self::round(new self($val), $scale);
    }

    public static function sub(self $left, self $right, int $scale = self::SCALE_MAX): self
    {
        $val = bcsub($left->getValue(), $right->getValue(), $scale);

        return self::round(new self($val), $scale);
    }

    public static function div(self $left, string $scalar, $scale = self::SCALE_MAX): self
    {
        $val = bcdiv($left->getValue(), $scalar, $scale);

        return self::round(new self($val), $scale);
    }

    public static function mult(string $scalar, self $right, int $scale = self::SCALE_MAX): self
    {
        $val = bcmul($scalar, $right->getValue(), $scale);

        return self::round(new self($val), $scale);
    }

    public function invert(): self
    {
        return self::mult('-1.0', $this);
    }

    public function abs(): self
    {
        return $this->isNegative() ? $this->invert() : $this;
    }

    public static function floatFromScientificFormat(string $value): string
    {
        return sprintf('%.'.self::SCALE_MAX.'f', (float) $value);
    }
}
