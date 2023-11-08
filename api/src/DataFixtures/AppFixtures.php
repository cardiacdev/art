<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Factory\ClientFactory;
use App\Factory\InvoiceFactory;
use App\Factory\InvoiceItemFactory;
use App\Factory\ProjectFactory;
use App\Factory\TaskFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        UserFactory::createOne([
            'email' => 'admin@example.com',
            'password' => '123456',
        ]);

        UserFactory::createMany(25);

        ClientFactory::createMany(25);

        InvoiceFactory::createMany(150, function () {
            return [
                'client' => ClientFactory::random(),
            ];
        });

        ProjectFactory::createMany(30, function () {
            return [
                'client' => ClientFactory::random(),
            ];
        });

        TaskFactory::createMany(300, function () {
            return [
                'project' => ProjectFactory::random(),
            ];
        });

        InvoiceItemFactory::createMany(500, function () {
            return [
                'invoice' => InvoiceFactory::random(),
                'task' => TaskFactory::random(),
            ];
        });
    }
}
