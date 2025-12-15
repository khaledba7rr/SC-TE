<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use Backend\Database\DatabaseConnectionFactory;
use PDO;

/**
 * Base class representing a value for a product image.
 */
abstract class AbstractProductImage
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = DatabaseConnectionFactory::createConnection();
    }

    public abstract function getImagesByProductId(string $productId): array;
}
