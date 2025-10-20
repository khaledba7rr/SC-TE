<?php

namespace GraphqlConfig\Resolvers;

use Model\Product;

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
}
