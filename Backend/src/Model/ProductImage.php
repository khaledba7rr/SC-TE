<?php

namespace Model;

use Database\DatabaseConnection;

class ProductImage
{

    public function __construct() {}

    public function getImagesByProductId(string $id)
    {
        try {
            $db = new DatabaseConnection();
            $pdo = $db->getConnection();

            $query = "SELECT image_url as url, id, product_id FROM product_images WHERE product_id = :id";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            echo $stmt->errorInfo()[2];

            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\Throwable $e) {
            echo "Error: " . $e->getMessage();
            return [];
        }
    }
}
