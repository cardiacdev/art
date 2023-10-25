<?php

declare(strict_types=1);

namespace App\Tests\Functional;

use App\Factory\ClientFactory;
use App\Factory\InvoiceFactory;
use App\Factory\ProjectFactory;
use App\Factory\UserFactory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class ClientResourceTest extends ApiTestCase
{
    use Factories;
    use ResetDatabase;

    public function testGetClient(): void
    {
        $user = UserFactory::createOne();
        $client = ClientFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->get('/api/clients/'.$client->getId())
            ->assertStatus(200)
            ->assertJsonMatches('"@id"', '/api/clients/'.$client->getId())
            ->assertJsonMatches('name', $client->getName());
    }

    public function testGetClients(): void
    {
        $user = UserFactory::createOne();
        ClientFactory::createMany(6);

        $this->browser()
            ->actingAs($user)
            ->get('/api/clients')
            ->assertStatus(200)
            ->assertJsonMatches('"hydra:totalItems"', 6)
            ->assertJsonMatches('length("hydra:member")', 6);
    }

    public function testDeleteOrphanedClient(): void
    {
        $user = UserFactory::createOne();
        $client = ClientFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->delete('/api/clients/'.$client->getId())
            ->assertStatus(204);
    }

    public function testDeleteClientWithProject(): void
    {
        $user = UserFactory::createOne();
        $client = ClientFactory::createOne();
        ProjectFactory::createOne(['client' => $client]);
        InvoiceFactory::createOne(['client' => $client]);
        $this->browser()
            ->actingAs($user)
            ->delete('/api/clients/'.$client->getId())
            ->assertStatus(422);
    }

    public function testPostClient(): void
    {
        $user = UserFactory::createOne();
        $client = ClientFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->post('/api/clients', [
                'json' => [
                    'name' => $client->getName(),
                ],
            ])
            ->assertStatus(201)
            ->assertJsonMatches('name', $client->getName());
    }

    public function testPatchClient(): void
    {
        $user = UserFactory::createOne();
        $client = ClientFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->patch('/api/clients/'.$client->getId(), [
                'json' => [
                    'name' => 'new name',
                ],
                'headers' => ['Content-Type' => 'application/merge-patch+json'],
            ])
            ->assertStatus(200)
            ->assertJsonMatches('"@id"', '/api/clients/'.$client->getId())
            ->assertJsonMatches('name', 'new name');
    }
}
