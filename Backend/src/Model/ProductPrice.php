<?php

namespace Model;

use Database\DatabaseConnection;

class ProductPrice
{

    public function __construct() {}

    public function getPricesByProductId(string $id)
    {
        try {
            $db = new DatabaseConnection();
            $pdo = $db->getConnection();

            $query = "SELECT * FROM product_prices WHERE product_id = :id";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\Throwable $e) {
            echo "Error: " . $e->getMessage();
            return [];
        }
    }
}
