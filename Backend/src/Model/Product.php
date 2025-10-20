<?php

namespace Model;

use Database\DatabaseConnectionFactory;

class Product
{

    private $pdo;

    public function __construct()
    {
        $this->pdo = DatabaseConnectionFactory::createConnection();
    }

    public function getAllProducts(): array
    {
        $query = "SELECT * FROM products";

        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $products = $this->getNestedFieldsForProducts($rows);

        return $products;
    }

    public function getProductById(string $id)
    {

        $query = "SELECT * FROM products WHERE id = :id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $productsData = $stmt->fetch(\PDO::FETCH_ASSOC);

        $productsData = $this->getNestedFieldsForSingleProduct($productsData);

        return $productsData;
    }

    public function getProductsByCategoryId(string $id)
    {
        $categoryQuery = "SELECT * FROM categories WHERE id = :id";
        $stmt = $this->pdo->prepare($categoryQuery);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $category = $stmt->fetch(\PDO::FETCH_ASSOC);

        if ($category['name'] === 'all') {
            return $this->getAllProducts();
        }

        $query = "SELECT * FROM products WHERE category_id = :id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $products = $this->getNestedFieldsForProducts($products);

        return $products;
    }

    private function getNestedFieldsForProducts($products)
    {
        $attributeObject = new Attribute();
        $categoryObject = new Category();
        $imagesObject = new ProductImage();
        $pricesObject = new ProductPrice();

        foreach ($products as &$product) {
            // Nested resolution for attributes
            $product['attributes'] = $attributeObject->getAttributesByProductId($product['id']);
            // Nested resolution for categories
            $product['category'] = $categoryObject->getCategoryById($product['category_id']);
            // Nested resolution for images
            $product['images'] = $imagesObject->getImagesByProductId($product['id']);
            // Nested resolution for prices
            $product['prices'] = $pricesObject->getPricesByProductId($product['id']);
        }

        return $products;
    }

    private function getNestedFieldsForSingleProduct($product)
    {
        $attributeObject = new Attribute();
        $categoryObject = new Category();
        $imagesObject = new ProductImage();
        $pricesObject = new ProductPrice();

        // Nested resolution for attributes
        $product['attributes'] = $attributeObject->getAttributesByProductId($product['id']);
        // Nested resolution for categories
        $product['category'] = $categoryObject->getCategoryById($product['category_id']);
        // Nested resolution for images
        $product['images'] = $imagesObject->getImagesByProductId($product['id']);
        // Nested resolution for prices
        $product['prices'] = $pricesObject->getPricesByProductId($product['id']);

        return $product;
    }
}
