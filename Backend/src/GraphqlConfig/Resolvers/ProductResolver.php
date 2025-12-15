<?php

namespace Backend\GraphqlConfig\Resolvers;

use Backend\Model\Product;

class ProductResolver
{
    private $product;

    public function __construct()
    {
        $this->product = new Product();
    }

    public function getAllProducts()
    {
        return $this->product->getAllProducts();
    }

    public function getProductById($id)
    {
        return $this->product->getProductById($id);
    }

    public function getProductsByCategoryId($id)
    {
        return $this->product->getProductsByCategoryId($id);
    }
}
