<?php

namespace Factory;

use Model\ElectronicProduct;
use Model\ClothingProduct;
use Model\Product;

class ProductFactory
{
    public static function create(array $data): Product
    {
        return match ($data['type']) {
            'electronic' => new ElectronicProduct($data),
            'clothing' => new ClothingProduct($data),
            default => throw new \Exception("Unknown product type"),
        };
    }
}
