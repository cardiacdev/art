<?php

declare(strict_types=1);

namespace App\Tests\Functional;

use App\Factory\InvoiceFactory;
use App\Factory\InvoiceItemFactory;
use App\Factory\TaskFactory;
use App\Factory\UserFactory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class InvoiceItemResourceTest extends ApiTestCase
{
    use Factories;
    use ResetDatabase;

    public function testGetInvoiceItem(): void
    {
        $user = UserFactory::createOne();
        $invoiceItem = InvoiceItemFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->get('/api/invoice_items/'.$invoiceItem->getId())
            ->assertStatus(200)
            ->assertJsonMatches('"@id"', '/api/invoice_items/'.$invoiceItem->getId())
            ->assertJsonMatches('euroAmount', $invoiceItem->getEuroAmount()->getValue());
    }

    public function testGetInvoiceItems(): void
    {
        $user = UserFactory::createOne();
        InvoiceItemFactory::createMany(6);

        $this->browser()
            ->actingAs($user)
            ->get('/api/invoice_items')
            ->assertStatus(200)
            ->assertJsonMatches('"hydra:totalItems"', 6)
            ->assertJsonMatches('length("hydra:member")', 6);
    }

    public function testPostInvoiceItem(): void
    {
        $user = UserFactory::createOne();
        $task = TaskFactory::createOne();
        $invoice = InvoiceFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->post('/api/invoice_items', [
                'json' => [
                    'euroAmount' => '100.00',
                    'task' => '/api/tasks/'.$task->getId(),
                    'invoice' => '/api/invoices/'.$invoice->getId(),
                ],
            ])
            ->assertStatus(201)
            ->assertJsonMatches('euroAmount', '100.00');
    }

    public function testPatchInvoiceItem(): void
    {
        $user = UserFactory::createOne();
        $invoiceItem = InvoiceItemFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->patch('/api/invoice_items/'.$invoiceItem->getId(), [
                'json' => [
                    'euroAmount' => '100.00',
                ],
                'headers' => ['Content-Type' => 'application/merge-patch+json'],
            ])
            ->assertStatus(200)
            ->assertJsonMatches('euroAmount', '100.00');
    }

    public function testDeleteInvoiceItem(): void
    {
        $user = UserFactory::createOne();
        $invoiceItem = InvoiceItemFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->delete('/api/invoice_items/'.$invoiceItem->getId())
            ->assertStatus(204);
    }
}
