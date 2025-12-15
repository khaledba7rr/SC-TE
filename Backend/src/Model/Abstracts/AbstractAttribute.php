<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use Backend\Database\DatabaseConnectionFactory;
use PDO;

/**
 * Abstract representation of an Attribute.
 */
abstract class AbstractAttribute
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = DatabaseConnectionFactory::createConnection();
    }

    public abstract function getAttributesByProductId(string $id);
}
