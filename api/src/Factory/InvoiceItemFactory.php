<?php

declare(strict_types=1);

namespace App\Factory;

use App\Entity\InvoiceItem;
use App\Repository\InvoiceItemRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<InvoiceItem>
 *
 * @method        InvoiceItem|Proxy                     create(array|callable $attributes = [])
 * @method static InvoiceItem|Proxy                     createOne(array $attributes = [])
 * @method static InvoiceItem|Proxy                     find(object|array|mixed $criteria)
 * @method static InvoiceItem|Proxy                     findOrCreate(array $attributes)
 * @method static InvoiceItem|Proxy                     first(string $sortedField = 'id')
 * @method static InvoiceItem|Proxy                     last(string $sortedField = 'id')
 * @method static InvoiceItem|Proxy                     random(array $attributes = [])
 * @method static InvoiceItem|Proxy                     randomOrCreate(array $attributes = [])
 * @method static InvoiceItemRepository|RepositoryProxy repository()
 * @method static InvoiceItem[]|Proxy[]                 all()
 * @method static InvoiceItem[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static InvoiceItem[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static InvoiceItem[]|Proxy[]                 findBy(array $attributes)
 * @method static InvoiceItem[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static InvoiceItem[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class InvoiceItemFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'euroAmount' => self::faker()->randomFloat(2, 0, 8000),
            'invoice' => InvoiceFactory::new(),
            'task' => TaskFactory::new(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(InvoiceItem $invoiceItem): void {})
        ;
    }

    protected static function getClass(): string
    {
        return InvoiceItem::class;
    }
}
