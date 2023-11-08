<?php

declare(strict_types=1);

namespace App\Tests\Functional;

use App\Factory\ClientFactory;
use App\Factory\InvoiceFactory;
use App\Factory\InvoiceItemFactory;
use App\Factory\ProjectFactory;
use App\Factory\TaskFactory;
use App\Factory\UserFactory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class TaskResourceTest extends ApiTestCase
{
    use Factories;
    use ResetDatabase;

    public function testGetTask(): void
    {
        $user = UserFactory::createOne();
        $client = ClientFactory::createOne();
        $project = ProjectFactory::createOne(['client' => $client]);
        $task = TaskFactory::createOne(['project' => $project]);

        $this->browser()
            ->actingAs($user)
            ->get('/api/tasks/'.$task->getId())
            ->assertStatus(200)
            ->assertJsonMatches('"@id"', '/api/tasks/'.$task->getId())
            ->assertJsonMatches('title', $task->getTitle());
    }

    public function testGetTasks(): void
    {
        $user = UserFactory::createOne();
        $client = ClientFactory::createOne();
        $project = ProjectFactory::createOne(['client' => $client]);
        TaskFactory::createMany(6, ['project' => $project]);

        $this->browser()
            ->actingAs($user)
            ->get('/api/tasks')
            ->assertStatus(200)
            ->assertJsonMatches('"hydra:totalItems"', 6)
            ->assertJsonMatches('length("hydra:member")', 6);
    }

    public function testPostTask(): void
    {
        $user = UserFactory::createOne();
        $client = ClientFactory::createOne();
        $project = ProjectFactory::createOne(['client' => $client]);

        $this->browser()
            ->actingAs($user)
            ->post('/api/tasks', [
                'json' => [
                    'title' => 'Task title',
                    'project' => '/api/projects/'.$project->getId(),
                ],
            ])
            ->assertStatus(201)
            ->assertJsonMatches('title', 'Task title');
    }

    public function testPatchTask(): void
    {
        $user = UserFactory::createOne();
        $client = ClientFactory::createOne();
        $project = ProjectFactory::createOne(['client' => $client]);
        $task = TaskFactory::createOne(['project' => $project]);

        $this->browser()
            ->actingAs($user)
            ->patch('/api/tasks/'.$task->getId(), [
                'json' => [
                    'title' => 'Task title',
                ],
                'headers' => [
                    'Content-Type' => 'application/merge-patch+json',
                ],
            ])
            ->assertStatus(200)
            ->assertJsonMatches('title', 'Task title');
    }

    public function testDeleteOrphanedTask(): void
    {
        $user = UserFactory::createOne();
        $project = ProjectFactory::createOne();
        $task = TaskFactory::createOne(['project' => $project]);

        $this->browser()
            ->actingAs($user)
            ->delete('/api/tasks/'.$task->getId())
            ->assertStatus(204);
    }

    public function testDeleteTaskWithInvoiceItem(): void
    {
        $user = UserFactory::createOne();
        $client = ClientFactory::createOne();
        $project = ProjectFactory::createOne(['client' => $client]);
        $invoice = InvoiceFactory::createOne(['client' => $client]);
        $task = TaskFactory::createOne(['project' => $project]);
        $invoiceItem = InvoiceItemFactory::createOne(['invoice' => $invoice, 'task' => $task]);

        $this->browser()
            ->actingAs($user)
            ->delete('/api/tasks/'.$task->getId())
            ->assertStatus(422);
    }
}
