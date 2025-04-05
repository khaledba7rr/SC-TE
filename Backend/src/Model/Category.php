<?php


namespace Model;

use Database\DatabaseConnection;
use Model\Product;

class Category
{

    public function __construct() {}

    public function getAllCategories()
    {
        $db = new DatabaseConnection();
        $pdo = $db->getConnection();

        $query = "SELECT * FROM categories";
        $stmt = $pdo->prepare($query);
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
        $db = new DatabaseConnection();
        $pdo = $db->getConnection();

        $query = "SELECT * FROM categories WHERE id = :id";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}
