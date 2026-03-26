<?php

namespace Backend\Database;

require __DIR__ . '/../../vendor/autoload.php';

\Dotenv\Dotenv::createImmutable(__DIR__ . '/../..')->load();

class DatabaseConnection
{
    private \PDO $pdo;

    public function __construct()
    {
        $servername = $_ENV['DB_HOST'];
        $username   = $_ENV['DB_USERNAME'];
        $password   = $_ENV['DB_PASSWORD'];
        $dbname     = $_ENV['DB_NAME'];

        try {
            $this->pdo = new \PDO(
                "mysql:host=$servername;dbname=$dbname;charset=utf8mb4",
                $username,
                $password
            );
            $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $e) {
            throw new \RuntimeException('DB Connection failed: ' . $e->getMessage());
        }
    }

    public function getConnection(): \PDO
    {
        return $this->pdo;
    }
}