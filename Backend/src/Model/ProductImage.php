<?php

namespace Model;

use Database\DatabaseConnectionFactory;

class ProductImage
{

    private $pdo;

    public function __construct()
    {
        $this->pdo = DatabaseConnectionFactory::createConnection();
    }

    public function getImagesByProductId(string $id)
    {
        try {
            $query = "SELECT image_url as url, id, product_id FROM product_images WHERE product_id = :id";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\Throwable $e) {
            echo "Error: " . $e->getMessage();
            return [];
        }
    }
}
