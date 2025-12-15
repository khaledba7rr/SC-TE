<?php

namespace Backend\GraphqlConfig\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderInputType extends InputObjectType
{
    public function __construct($orderItemInputType)
    {
        parent::__construct([
            'name' => 'OrderInput',
            'fields' => [
                'customerName' => Type::nonNull(Type::string()),
                'currency' => Type::nonNull(Type::string()),
                'totalPrice' => Type::nonNull(Type::float()),
                'items' => Type::listOf($orderItemInputType),
            ],
        ]);
    }
}
