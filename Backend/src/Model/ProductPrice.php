<?php

namespace Backend\Model;

use Backend\Model\Abstracts\AbstractProductPrice;

class ProductPrice extends AbstractProductPrice
{

    public function getPricesByProductId(string $id)
    {
        try {

            $query = "SELECT * FROM product_prices WHERE product_id = :id";
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
