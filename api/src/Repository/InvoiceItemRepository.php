<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\InvoiceItem;
use App\Model\Decimal;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<InvoiceItem>
 *
 * @method InvoiceItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method InvoiceItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method InvoiceItem[]    findAll()
 * @method InvoiceItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InvoiceItemRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, InvoiceItem::class);
    }

    /**
     * @return array<int, Decimal>
     */
    public function getInvoiceItemEuroAmountsByProject(int $projectId): array
    {
        $entityManager = $this->getEntityManager();

        // get all task ids for a given project
        $subQuery = $entityManager->createQueryBuilder()
            ->select('t.id')
            ->from('App\Entity\Task', 't')
            ->where('t.project = :projectId')
            ->getDQL();

        // get all invoice_item euroAmounts for a given project
        $qb = $this->createQueryBuilder('ii')->select('ii.euroAmount');

        $query = $qb
            ->where($qb->expr()->in('ii.task', $subQuery))
            ->andWhere('ii.euroAmount IS NOT NULL')
            ->setParameter('projectId', $projectId)
            ->getQuery();

        return $query
            ->getArrayResult();
    }

    public function getInvoiceItemEuroAmountsByTask(int $taskId): array
    {
        $qb = $this->createQueryBuilder('ii')->select('ii.euroAmount');

        $query = $qb
            ->where('ii.task = :taskId')
            ->andWhere('ii.euroAmount IS NOT NULL')
            ->setParameter('taskId', $taskId)
            ->getQuery();

        return $query
            ->getArrayResult();
    }
}
