<?php

namespace Database;

use Database\DatabaseConnection;
use PDO;

class DatabaseConnectionFactory
{
    public static function createConnection(): PDO
    {
        $db = new DatabaseConnection();
        $pdo = $db->getConnection();

        return $pdo;
    }
}
