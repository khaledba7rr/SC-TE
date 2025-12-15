<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use Backend\Database\DatabaseConnectionFactory;
use PDO;

/**
 * AbstractCategory
 *
 * Base class representing a value for a Category.
 */
abstract class AbstractCategory
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = DatabaseConnectionFactory::createConnection();
    }

    public abstract function getAllCategories();
    public abstract function getCategoryById(string $id);
}
