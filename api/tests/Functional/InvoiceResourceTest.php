<?php

declare(strict_types=1);

namespace App\Tests\Functional;

use App\Factory\ClientFactory;
use App\Factory\InvoiceFactory;
use App\Factory\UserFactory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class InvoiceResourceTest extends ApiTestCase
{
    use Factories;
    use ResetDatabase;

    public function testGetInvoice(): void
    {
        $user = UserFactory::createOne();
        $invoice = InvoiceFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->get('/api/invoices/'.$invoice->getId())
            ->assertStatus(200)
            ->assertJsonMatches('"@id"', '/api/invoices/'.$invoice->getId())
            ->assertJsonMatches('invoiceNumber', $invoice->getInvoiceNumber());
    }

    public function testGetInvoices(): void
    {
        $user = UserFactory::createOne();
        InvoiceFactory::createMany(6);

        $this->browser()
            ->actingAs($user)
            ->get('/api/invoices')
            ->assertStatus(200)
            ->assertJsonMatches('"hydra:totalItems"', 6)
            ->assertJsonMatches('length("hydra:member")', 6);
    }

    public function testPostInvoice(): void
    {
        $user = UserFactory::createOne();
        $client = ClientFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->post('/api/invoices', [
                'json' => [
                    'invoiceNumber' => 'Invoice Number',
                    'billingDate' => '2021-01-01',
                    'client' => '/api/clients/'.$client->getId(),
                ],
            ])
            ->assertStatus(201)
            ->assertJsonMatches('invoiceNumber', 'Invoice Number');
    }

    public function testPatchInvoice(): void
    {
        $user = UserFactory::createOne();
        $invoice = InvoiceFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->patch('/api/invoices/'.$invoice->getId(), [
                'json' => [
                    'invoiceNumber' => 'Invoice Number',
                ],
                'headers' => [
                    'Content-Type' => 'application/merge-patch+json',
                ],
            ])
            ->assertStatus(200)
            ->assertJsonMatches('invoiceNumber', 'Invoice Number');
    }

    public function testDeleteInvoice(): void
    {
        $user = UserFactory::createOne();
        $invoice = InvoiceFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->delete('/api/invoices/'.$invoice->getId())
            ->assertStatus(204);
    }
}
