<?php

declare(strict_types=1);

namespace App\Service;

use App\Model\Decimal;
use App\Repository\InvoiceItemRepository;
use App\Repository\TaskRepository;

class Calculator
{
    public function __construct(
        private InvoiceItemRepository $invoiceItemRepository,
        private TaskRepository $taskRepository,
    ) {
    }

    public function calculateBilledAmountOfTask(int $taskId): Decimal
    {
        $invoiceItemEuroAmounts = array_column($this->invoiceItemRepository->getInvoiceItemEuroAmountsByTask($taskId), 'euroAmount');

        $sumOfInvoiceItemEuroAmounts = Decimal::sum($invoiceItemEuroAmounts);

        return $sumOfInvoiceItemEuroAmounts;
    }

    public function calculateBilledAmountOfProject(int $projectId): Decimal
    {
        $invoiceItemEuroAmounts = array_column($this->invoiceItemRepository->getInvoiceItemEuroAmountsByProject($projectId), 'euroAmount');
        $sumOfInvoiceItemEuroAmounts = Decimal::sum($invoiceItemEuroAmounts);

        return $sumOfInvoiceItemEuroAmounts;
    }

    public function calculateTaskEuroAmountOfProject(int $projectId): Decimal
    {
        $taskEuroAmounts = array_column($this->taskRepository->getEuroAmountsByProject($projectId), 'euroAmount');

        $sumOfTaskEuroAmounts = Decimal::sum($taskEuroAmounts);

        return $sumOfTaskEuroAmounts;
    }

    public function calculateNotBilledAmountOfProject(int $projectId): Decimal
    {
        $taskEuroAmountOfProject = $this->calculateTaskEuroAmountOfProject($projectId);
        $billedAmountOfProject = $this->calculateBilledAmountOfProject($projectId);

        $notBilledAmountOfProject = Decimal::sub($taskEuroAmountOfProject, $billedAmountOfProject);

        return $notBilledAmountOfProject;
    }
}
