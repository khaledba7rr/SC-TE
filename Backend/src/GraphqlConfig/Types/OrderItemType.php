<?php

namespace GraphqlConfig\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemType extends ObjectType
{
    public function __construct($orderItemAttributeType)
    {
        parent::__construct([
            'name' => 'OrderItem',
            'fields' => [
                'orderItemId' => Type::nonNull(Type::id()),
                'orderId' => Type::nonNull(Type::id()),
                'productId' => Type::nonNull(Type::id()),
                'quantity' => Type::nonNull(Type::int()),
                'unitPrice' => Type::nonNull(Type::float()),
                'currency' => Type::nonNull(Type::string()),
                'attributes' => Type::listOf($orderItemAttributeType),
            ],
        ]);
    }
}
