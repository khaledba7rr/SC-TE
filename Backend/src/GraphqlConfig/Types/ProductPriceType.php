<?php

namespace Backend\GraphqlConfig\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductPriceType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'ProductPrice',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'price' => Type::nonNull(Type::float()),
                'product_id' => Type::nonNull(Type::id()),
                'symbol' => Type::nonNull(Type::string()),
                'currency' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}
