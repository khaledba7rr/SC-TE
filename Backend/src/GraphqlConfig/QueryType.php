<?php

namespace GraphqlConfig;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class QueryType extends ObjectType
{
    public function __construct($productType, $categoryType, $orderType, $resolvers)
    {
        parent::__construct([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf($productType),
                    'resolve' => fn() => $resolvers['productResolver']->getAllProducts(),
                ],
                'categories' => [
                    'type' => Type::listOf($categoryType),
                    'resolve' => fn() => $resolvers['categoryResolver']->getAllCategories(),
                ],
                'product' => [
                    'type' => $productType,
                    'args' => [
                        'id' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => fn($root, $args) => $resolvers['productResolver']->getProductById($args['id']),
                ],
                'productsByCategoryId' => [
                    'type' => Type::listOf($productType),
                    'args' => [
                        'id' => Type::nonNull(Type::id()),
                    ],
                    'resolve' => fn($root, $args) => $resolvers['productResolver']->getProductsByCategoryId($args['id']),
                ],
                'orders' => [
                    'type' => Type::listOf($orderType),
                    'resolve' => fn() => $resolvers['orderResolver']->getAllOrders(),
                ],

            ],
        ]);
    }
}
