<?php

declare(strict_types=1);

namespace App\Entity;

use App\Model\Decimal;
use App\Repository\TaskRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TaskRepository::class)]
class Task
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reference = null;

    #[ORM\Column(nullable: true, type: 'amount', precision: 10, scale: 2)]
    private ?Decimal $euroAmount = null;

    #[ORM\Column(nullable: true, type: 'amount', precision: 10, scale: 2)]
    private ?Decimal $externalHours = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $remarks = null;

    #[ORM\Column(nullable: true)]
    private ?DateTimeImmutable $plannedCompletionDate = null;

    #[ORM\Column(nullable: true)]
    private ?DateTimeImmutable $firstSandboxDeploymentDate = null;

    #[ORM\Column(nullable: true)]
    private ?DateTimeImmutable $firstLiveDeploymentDate = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $orderNumber = null;

    #[ORM\Column(nullable: true)]
    private ?DateTimeImmutable $orderConfirmationDate = null;

    #[ORM\OneToMany(mappedBy: 'task', targetEntity: InvoiceItem::class)]
    private Collection $invoiceItems;

    #[ORM\ManyToOne(inversedBy: 'tasks')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Project $project = null;

    public function __construct()
    {
        $this->invoiceItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(?string $reference): static
    {
        $this->reference = $reference;

        return $this;
    }

    public function getEuroAmount(): ?Decimal
    {
        return $this->euroAmount;
    }

    public function setEuroAmount(?Decimal $euroAmount): static
    {
        $this->euroAmount = $euroAmount;

        return $this;
    }

    public function getExternalHours(): ?Decimal
    {
        return $this->externalHours;
    }

    public function setExternalHours(?Decimal $externalHours): static
    {
        $this->externalHours = $externalHours;

        return $this;
    }

    public function getRemarks(): ?string
    {
        return $this->remarks;
    }

    public function setRemarks(?string $remarks): static
    {
        $this->remarks = $remarks;

        return $this;
    }

    public function getPlannedCompletionDate(): ?DateTimeImmutable
    {
        return $this->plannedCompletionDate;
    }

    public function setPlannedCompletionDate(?DateTimeImmutable $plannedCompletionDate): static
    {
        $this->plannedCompletionDate = $plannedCompletionDate;

        return $this;
    }

    public function getFirstSandboxDeploymentDate(): ?DateTimeImmutable
    {
        return $this->firstSandboxDeploymentDate;
    }

    public function setFirstSandboxDeploymentDate(?DateTimeImmutable $firstSandboxDeploymentDate): static
    {
        $this->firstSandboxDeploymentDate = $firstSandboxDeploymentDate;

        return $this;
    }

    public function getFirstLiveDeploymentDate(): ?DateTimeImmutable
    {
        return $this->firstLiveDeploymentDate;
    }

    public function setFirstLiveDeploymentDate(?DateTimeImmutable $firstLiveDeploymentDate): static
    {
        $this->firstLiveDeploymentDate = $firstLiveDeploymentDate;

        return $this;
    }

    public function getOrderNumber(): ?string
    {
        return $this->orderNumber;
    }

    public function setOrderNumber(?string $orderNumber): static
    {
        $this->orderNumber = $orderNumber;

        return $this;
    }

    public function getOrderConfirmationDate(): ?DateTimeImmutable
    {
        return $this->orderConfirmationDate;
    }

    public function setOrderConfirmationDate(?DateTimeImmutable $orderConfirmationDate): static
    {
        $this->orderConfirmationDate = $orderConfirmationDate;

        return $this;
    }

    /**
     * @return Collection<int, InvoiceItem>
     */
    public function getInvoiceItems(): Collection
    {
        return $this->invoiceItems;
    }

    public function addInvoiceItem(InvoiceItem $invoiceItem): static
    {
        if (!$this->invoiceItems->contains($invoiceItem)) {
            $this->invoiceItems->add($invoiceItem);
            $invoiceItem->setTask($this);
        }

        return $this;
    }

    public function removeInvoiceItem(InvoiceItem $invoiceItem): static
    {
        if ($this->invoiceItems->removeElement($invoiceItem)) {
            // set the owning side to null (unless already changed)
            if ($invoiceItem->getTask() === $this) {
                $invoiceItem->setTask(null);
            }
        }

        return $this;
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(?Project $project): static
    {
        $this->project = $project;

        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->project?->getClient();
    }
}
