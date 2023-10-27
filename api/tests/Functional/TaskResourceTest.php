<?php

declare(strict_types=1);

namespace App\Tests\Functional;

use App\Factory\InvoiceFactory;
use App\Factory\InvoiceItemFactory;
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
        $task = TaskFactory::createOne();

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
        TaskFactory::createMany(6);

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
        $invoice = InvoiceFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->post('/api/tasks', [
                'json' => [
                    'title' => 'Task title',
                    'invoice' => '/api/invoices/'.$invoice->getId(),
                ],
            ])
            ->assertStatus(201)
            ->assertJsonMatches('title', 'Task title');
    }

    public function testPatchTask(): void
    {
        $user = UserFactory::createOne();
        $task = TaskFactory::createOne();

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
        $task = TaskFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->delete('/api/tasks/'.$task->getId())
            ->assertStatus(204);
    }

    public function testDeleteTaskWithInvoiceItem(): void
    {
        $user = UserFactory::createOne();
        $task = TaskFactory::createOne();
        InvoiceItemFactory::createOne(['task' => $task]);

        $this->browser()
            ->actingAs($user)
            ->delete('/api/tasks/'.$task->getId())
            ->assertStatus(422);
    }
}
