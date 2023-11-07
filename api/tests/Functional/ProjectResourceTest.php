<?php

declare(strict_types=1);

namespace App\Tests\Functional;

use App\Factory\ClientFactory;
use App\Factory\ProjectFactory;
use App\Factory\UserFactory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class ProjectResourceTest extends ApiTestCase
{
    use Factories;
    use ResetDatabase;

    public function testGetProject(): void
    {
        $user = UserFactory::createOne();
        $project = ProjectFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->get('/api/projects/'.$project->getId())
            ->assertStatus(200)
            ->assertJsonMatches('"@id"', '/api/projects/'.$project->getId())
            ->assertJsonMatches('name', $project->getName());
    }

    public function testGetProjects(): void
    {
        $user = UserFactory::createOne();
        ProjectFactory::createMany(6);

        $this->browser()
            ->actingAs($user)
            ->get('/api/projects')
            ->assertStatus(200)
            ->assertJsonMatches('"hydra:totalItems"', 6)
            ->assertJsonMatches('length("hydra:member")', 6);
    }

    public function testPostProject(): void
    {
        $user = UserFactory::createOne();
        $client = ClientFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->post('/api/projects', [
                'json' => [
                    'name' => 'Project Name',
                    'client' => '/api/clients/'.$client->getId(),
                ],
            ])
            ->assertStatus(201)
            ->assertJsonMatches('name', 'Project Name');
    }

    public function testPostProjectWithNonUniqueName(): void
    {
        $user = UserFactory::createOne();
        $project = ProjectFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->post('/api/projects', [
                'json' => [
                    'name' => $project->getName(),
                ],
            ])
            ->assertStatus(422);
    }

    public function testPatchProject(): void
    {
        $user = UserFactory::createOne();
        $project = ProjectFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->patch('/api/projects/'.$project->getId(), [
                'json' => [
                    'name' => 'New Project Name',
                ],
                'headers' => ['Content-Type' => 'application/merge-patch+json'],
            ])
            ->assertStatus(200)
            ->assertJsonMatches('name', 'New Project Name');
    }

    public function testDeleteProject(): void
    {
        $user = UserFactory::createOne();
        $project = ProjectFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->delete('/api/projects/'.$project->getId())
            ->assertStatus(204);
    }
}
