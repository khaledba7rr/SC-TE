<?php

namespace GraphqlConfig\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemInputType extends InputObjectType
{
    public function __construct($orderItemAttributeInputType)
    {
        parent::__construct([
            'name' => 'OrderItemInput',
            'fields' => [
                'productId' => Type::nonNull(Type::id()),
                'quantity' => Type::nonNull(Type::int()),
                'unitPrice' => Type::nonNull(Type::float()),
                'currency' => Type::nonNull(Type::string()),
                'attributes' => Type::listOf($orderItemAttributeInputType),
            ],
        ]);
    }
}
