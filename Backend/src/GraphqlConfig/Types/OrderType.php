<?php

namespace GraphqlConfig\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderType extends ObjectType
{
    public function __construct($orderItemType)
    {
        parent::__construct([
            'name' => 'Order',
            'fields' => [
                'orderId' => Type::nonNull(Type::id()),
                'customerName' => Type::nonNull(Type::string()),
                'totalPrice' => Type::nonNull(Type::float()),
                'status' => Type::nonNull(Type::string()),
                'created_at' => Type::nonNull(Type::string()),
                'items' => Type::listOf($orderItemType),
            ],
        ]);
    }
}
