<?php

declare(strict_types=1);

namespace App\Factory;

use App\Entity\Task;
use App\Model\Decimal;
use App\Repository\TaskRepository;
use DateTimeImmutable;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Task>
 *
 * @method        Task|Proxy                     create(array|callable $attributes = [])
 * @method static Task|Proxy                     createOne(array $attributes = [])
 * @method static Task|Proxy                     find(object|array|mixed $criteria)
 * @method static Task|Proxy                     findOrCreate(array $attributes)
 * @method static Task|Proxy                     first(string $sortedField = 'id')
 * @method static Task|Proxy                     last(string $sortedField = 'id')
 * @method static Task|Proxy                     random(array $attributes = [])
 * @method static Task|Proxy                     randomOrCreate(array $attributes = [])
 * @method static TaskRepository|RepositoryProxy repository()
 * @method static Task[]|Proxy[]                 all()
 * @method static Task[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Task[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Task[]|Proxy[]                 findBy(array $attributes)
 * @method static Task[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Task[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class TaskFactory extends ModelFactory
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
        $hasSandBoxDeployment = self::faker()->boolean(60);
        $hasOrderNumber = self::faker()->boolean(80);

        return [
            'title' => self::faker()->text(255),
            'reference' => self::faker()->boolean(60) ? self::faker()->numerify('ref-####') : null,
            'euroAmount' => self::faker()->boolean(60) ? new Decimal((string) self::faker()->randomFloat(2, 0, 40000)) : null,
            'externalHours' => self::faker()->boolean(60) ? new Decimal((string) self::faker()->randomFloat(2, 0, 200)) : null,
            'remarks' => self::faker()->boolean(60) ? self::faker()->text(random_int(64, 255)) : null,
            'plannedCompletionDate' => self::faker()->boolean(80) ? DateTimeImmutable::createFromMutable(self::faker()->dateTimeBetween('-1 month', '+1 year')) : null,
            'firstSandboxDeploymentDate' => $hasSandBoxDeployment ? DateTimeImmutable::createFromMutable(self::faker()->dateTimeBetween('-1 year', '-2 months')) : null,
            'firstLiveDeploymentDate' => $hasSandBoxDeployment && self::faker()->boolean(70) ? DateTimeImmutable::createFromMutable(self::faker()->dateTimeBetween('-6 months', 'now')) : null,
            'orderNumber' => $hasOrderNumber ? self::faker()->numerify('order-####') : null,
            'orderConfirmationDate' => $hasOrderNumber ? DateTimeImmutable::createFromMutable(self::faker()->dateTimeBetween('-1 year', '-2 months')) : null,
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Task $task): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Task::class;
    }
}
