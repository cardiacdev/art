<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Task;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Task>
 *
 * @method Task|null find($id, $lockMode = null, $lockVersion = null)
 * @method Task|null findOneBy(array $criteria, array $orderBy = null)
 * @method Task[]    findAll()
 * @method Task[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TaskRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Task::class);
    }

    public function getEuroAmountsByProject(int $projectId): array
    {
        $qb = $this->createQueryBuilder('t')->select('t.euroAmount');

        $query = $qb
            ->where('t.project = :projectId')
            ->andWhere('t.euroAmount IS NOT NULL')
            ->setParameter('projectId', $projectId)
            ->getQuery();

        return $query
            ->getArrayResult();
    }
}
