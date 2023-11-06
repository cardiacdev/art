<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231106134906 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Migrate to new amount type';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE invoice_item ALTER euro_amount TYPE NUMERIC(14, 2)');
        $this->addSql('COMMENT ON COLUMN invoice_item.euro_amount IS \'(DC2Type:amount)\'');
        $this->addSql('ALTER TABLE project ALTER hourly_rate TYPE NUMERIC(14, 2)');
        $this->addSql('COMMENT ON COLUMN project.hourly_rate IS \'(DC2Type:amount)\'');
        $this->addSql('ALTER TABLE task ALTER euro_amount TYPE NUMERIC(14, 2)');
        $this->addSql('ALTER TABLE task ALTER external_hours TYPE NUMERIC(14, 2)');
        $this->addSql('COMMENT ON COLUMN task.euro_amount IS \'(DC2Type:amount)\'');
        $this->addSql('COMMENT ON COLUMN task.external_hours IS \'(DC2Type:amount)\'');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE invoice_item ALTER euro_amount TYPE NUMERIC(10, 2)');
        $this->addSql('COMMENT ON COLUMN invoice_item.euro_amount IS NULL');
        $this->addSql('ALTER TABLE task ALTER euro_amount TYPE NUMERIC(10, 2)');
        $this->addSql('ALTER TABLE task ALTER external_hours TYPE NUMERIC(10, 2)');
        $this->addSql('COMMENT ON COLUMN task.euro_amount IS NULL');
        $this->addSql('COMMENT ON COLUMN task.external_hours IS NULL');
        $this->addSql('ALTER TABLE project ALTER hourly_rate TYPE NUMERIC(10, 2)');
        $this->addSql('COMMENT ON COLUMN project.hourly_rate IS NULL');
    }
}
