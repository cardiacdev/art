<?php

declare(strict_types=1);

namespace App\Tests\Integration;

use App\Factory\ClientFactory;
use App\Factory\InvoiceFactory;
use App\Factory\InvoiceItemFactory;
use App\Factory\ProjectFactory;
use App\Factory\TaskFactory;
use App\Model\Decimal;
use App\Service\Calculator;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class CalculatorTest extends KernelTestCase
{
    use Factories;
    use ResetDatabase;

    private Calculator $calculator;

    protected function setUp(): void
    {
        parent::setUp();
        self::bootKernel();
        $this->calculator = static::getContainer()->get(Calculator::class);
    }

    public function openTasksByProjectDataProvider(): array
    {
        return [
            [1, '50', '50.00'],
            [2, '50', '100.00'],
            [2, '49.99', '99.98'],
            [2, '50.01', '100.02'],
            [1, '101', '101.00'],
            [4, '27.25', '109.00'],
            [22, '1.01', '22.22'],
            [22, '1.02', '22.44'],
            [17, '1.03', '17.51'],
            [17, '1.04', '17.68'],
            [3, '33.33', '99.99'],
            [5, '20', '100.00'],
            [10, '10', '100.00'],
            [2, '25.5', '51.00'],
            [4, '12.5', '50.00'],
            [6, '16.67', '100.02'],
            [7, '14.29', '100.03'],
            [8, '12.5', '100.00'],
            [9, '11.11', '99.99'],
            [10, '10', '100.00'],
            [20, '10.50', '210.00'],
            [25, '8.80', '220.00'],
            [10, '20.20', '202.00'],
            [8, '25.25', '202.00'],
            [5, '40.40', '202.00'],
            [30, '7.33', '219.90'],
            [45, '4.88', '219.60'],
            [55, '3.95', '217.25'],
            [35, '8.57', '299.95'],
            [15, '20.13', '301.95'],
            [9, '25.28', '227.52'],
            [6, '40.41', '242.46'],
        ];
    }

    /**
     * @dataProvider openTasksByProjectDataProvider
     */
    public function testCalculateBilledAmountOfTask($numberOfInvoiceItems, $invoiceItemEuroAmount, $expected): void
    {
        $client = ClientFactory::createOne();
        $project = ProjectFactory::createOne(['client' => $client]);
        $task = TaskFactory::createOne(['project' => $project]);
        $invoice = InvoiceFactory::createOne(['client' => $client]);
        InvoiceItemFactory::createMany($numberOfInvoiceItems, ['invoice' => $invoice, 'task' => $task, 'euroAmount' => new Decimal((string) $invoiceItemEuroAmount)]);

        $billedTaskAmount = $this->calculator->calculateBilledAmountOfTask($task->getId());

        $this->assertSame($expected, $billedTaskAmount->getValue());
    }
}
