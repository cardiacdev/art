<?php

declare(strict_types=1);

namespace App\Service;

use App\Model\Decimal;
use App\Repository\InvoiceItemRepository;

class Calculator
{
    public function __construct(
        private InvoiceItemRepository $invoiceItemRepository,
    ) {
    }

    public function calculateBilledAmountOfTask(int $taskId): Decimal
    {
        $invoiceItemEuroAmounts = array_column($this->invoiceItemRepository->getInvoiceItemEuroAmountsByTask($taskId), 'euroAmount');

        $sumOfInvoiceItemEuroAmounts = Decimal::sum($invoiceItemEuroAmounts);

        return $sumOfInvoiceItemEuroAmounts;
    }
}
