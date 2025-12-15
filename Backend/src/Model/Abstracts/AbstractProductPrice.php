<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use Backend\Database\DatabaseConnectionFactory;
use PDO;

/**
 * Base class representing a value for a Product Price.
 */
abstract class AbstractProductPrice
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = DatabaseConnectionFactory::createConnection();
    }

    public abstract function getPricesByProductId(string $productId);
}
