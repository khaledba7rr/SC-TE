<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use PDO;
use PDOStatement;

abstract class AbstractPDO
{
    protected PDO $pdo;

    public function __construct(PDO $pdo)
    {
        try {
            $this->pdo = $pdo;
        } catch (\Throwable $e) {
            throw new \RuntimeException('Failed to construct AbstractPDO: ' . $e->getMessage(), 0, $e);
        }
    }

    protected function bindParameters(PDOStatement $stmt, array $params): void
    {
        try {
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
        } catch (\Throwable $e) {
            throw new \RuntimeException('Failed to bind parameters: ' . $e->getMessage(), 0, $e);
        }
    }

    protected function execute(string $sql, array $params = []): PDOStatement
    {
        try {
            $stmt = $this->pdo->prepare($sql);
            if ($stmt === false) {
                throw new \RuntimeException('Failed to prepare statement.');
            }
            
            
            $this->bindParameters($stmt, $params);
            
            if (!$stmt->execute()) {
                $error = $stmt->errorInfo();
                throw new \RuntimeException('Statement execution failed: ' . ($error[2] ?? 'unknown error'));
            }
            
            return $stmt;
        } catch (\Throwable $e) {
            throw new \RuntimeException('Execute failed: ' . $e->getMessage(), 0, $e);
        }
    }

    protected function fetchAll(
        PDOStatement $stmt,
        int $fetchStyle = PDO::FETCH_ASSOC
    ): array {
        try {
            return $stmt->fetchAll($fetchStyle);
        } catch (\Throwable $e) {
            throw new \RuntimeException('Failed to fetch all: ' . $e->getMessage(), 0, $e);
        }
    }

    protected function fetch(
        PDOStatement $stmt,
        int $fetchStyle = PDO::FETCH_ASSOC
    ): mixed {
        try {
            return $stmt->fetch($fetchStyle);
        } catch (\Throwable $e) {
            throw new \RuntimeException('Failed to fetch: ' . $e->getMessage(), 0, $e);
        }
    }
}
