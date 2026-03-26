<?php

namespace Backend\Model;


use Backend\Model\Abstracts\AbstractProduct;
use PDO;

class Product extends AbstractProduct
{


    public function __construct(Attribute $attribute, Category $category, ProductImage $images, ProductPrice $prices, PDO $pdo)
    {
        parent::__construct($attribute,$category, $images, $prices, $pdo);
    }

    public function getAllProducts(): array
    {
        return parent::getAllProducts();
    }

    public function getProductById(string $id): mixed
    {
        return parent::getProductById($id);
    }
}
