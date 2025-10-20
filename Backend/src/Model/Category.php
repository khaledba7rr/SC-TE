<?php


namespace Model;

use Database\DatabaseConnectionFactory;
use Model\Product;

class Category
{

    private $pdo;

    public function __construct()
    {
        $this->pdo = DatabaseConnectionFactory::createConnection();
    }


    public function getAllCategories()
    {

        $query = "SELECT * FROM categories";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();

        $categoreis = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $productObject = new Product();

        foreach ($categoreis as &$category) {
            // Nested resolution for products
            $category['products'] = $productObject->getProductsByCategoryId($category['id']);
        }

        return $categoreis;
    }
    public function getCategoryById(string $id)
    {
        $query = "SELECT * FROM categories WHERE id = :id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}
