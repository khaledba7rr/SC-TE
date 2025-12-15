<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use Backend\Database\DatabaseConnectionFactory;
use PDO;

abstract class AbstractProduct
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = DatabaseConnectionFactory::createConnection();
    }
    abstract public function getAllProducts(): array;

    abstract public function getProductById(string $id): mixed;

    abstract public function getProductsByCategoryId(string $id);

    abstract protected function getNestedFieldsForProducts(array $rows);

    abstract protected function getNestedFieldsForSingleProduct($productData);
}
