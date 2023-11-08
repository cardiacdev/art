<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231108094148 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Relate tasks to projects';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE task ADD project_id INT NOT NULL');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_527EDB25166D1F9C ON task (project_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE task DROP CONSTRAINT FK_527EDB25166D1F9C');
        $this->addSql('DROP INDEX IDX_527EDB25166D1F9C');
        $this->addSql('ALTER TABLE task DROP project_id');
    }
}
