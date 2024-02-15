<?php

declare(strict_types=1);

namespace App\ApiPlatform\ApiFilter;

use ApiPlatform\Doctrine\Common\Filter\OrderFilterInterface;
use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\PropertyInfo\Type;

use function array_key_exists;
use function is_array;

final class InvoiceItemsFilter extends AbstractFilter
{
    protected function filterProperty(string $property, $direction, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        if (is_array($direction) && array_key_exists('invoiceItems_length', $direction)) {
            $sortDirection = $direction['invoiceItems_length'];

            $rootAlias = $queryBuilder->getRootAliases()[0];

            $queryBuilder->addSelect('(SELECT COUNT(invoiceItem.id) FROM App\Entity\InvoiceItem invoiceItem WHERE invoiceItem.task = '.$rootAlias.'.id) AS HIDDEN invoiceItemsCount');
            $queryBuilder->addOrderBy('invoiceItemsCount', $sortDirection);
        }
    }

    public function getDescription(string $resourceClass): array
    {
        return [
            'order[invoiceItems_length]' => [
                'property' => 'invoiceItems.length',
                'type' => Type::BUILTIN_TYPE_STRING,
                'required' => false,
                'swagger' => [
                    'description' => 'Filter by invoice items',
                    'name' => 'Invoice items',
                    'type' => Type::BUILTIN_TYPE_STRING,
                ],
                'schema' => [
                    'type' => 'string',
                    'enum' => [
                        strtolower(OrderFilterInterface::DIRECTION_ASC),
                        strtolower(OrderFilterInterface::DIRECTION_DESC),
                    ],
                ],
            ],
        ];
    }
}
