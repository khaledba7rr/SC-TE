<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use Backend\Database\DatabaseConnectionFactory;
use PDO;

/**
 * Base class representing a value for an Order.
 */
abstract class AbstractOrder
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = DatabaseConnectionFactory::createConnection();
    }

    public abstract function createOrder(array $input): array;
    public abstract function getAllOrders(): array;
}
