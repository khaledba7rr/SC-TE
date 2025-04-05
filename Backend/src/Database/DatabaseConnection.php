<?php

namespace Database;

require __DIR__ . '/../../vendor/autoload.php';

\Dotenv\Dotenv::createImmutable(__DIR__ . '/../..')->load();

class DatabaseConnection
{
    private $servername;
    private $username;
    private $password;
    private $dbname;
    private $pdo;

    public function __construct()
    {
        $this->servername = $_ENV['DB_HOST'];
        $this->username = $_ENV['DB_USERNAME'];
        $this->password = $_ENV['DB_PASSWORD'];
        $this->dbname = $_ENV['DB_NAME'];

        try {
            // Create a PDO instance
            $this->pdo = new \PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);

            $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $e) {
            echo "DB Connection failed: " . $e->getMessage();
        }
    }

    public function getConnection()
    {
        return $this->pdo;
    }
}
