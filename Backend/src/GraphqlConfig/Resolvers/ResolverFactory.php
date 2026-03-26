<?php

namespace Backend\GraphqlConfig\Resolvers;

use Backend\Model\Attribute;
use Backend\Model\ProductImage;
use Backend\Model\ProductPrice;
use Backend\Model\Category;
use Backend\Model\Product;
use Backend\Model\Order;
use Backend\Model\AttributeValue;
use Backend\Database\DatabaseConnectionFactory;

class ResolverFactory
{
    public function createResolvers(): array
    {
        $pdo = DatabaseConnectionFactory::createConnection();

        $attributeValue = new AttributeValue($pdo);
        $attribute      = new Attribute($pdo, $attributeValue);

        $productImage = new ProductImage($pdo);
        $productPrice = new ProductPrice($pdo);
        $order        = new Order($pdo);
        $category     = new Category($pdo);

        $product = new Product(
            $attribute,
            $category,
            $productImage,
            $productPrice,
            $pdo
        );
        return [
            'productResolver'  => new ProductResolver($product, $category),
            'categoryResolver' => new CategoryResolver($category),
            'orderResolver'    => new OrderResolver($order),
        ];
    }
}
