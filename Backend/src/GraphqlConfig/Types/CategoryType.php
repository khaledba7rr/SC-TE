<?php

namespace Backend\GraphqlConfig\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CategoryType extends ObjectType
{
    public function __construct(callable $getProductType)
    {
        parent::__construct([
            'name' => 'Category',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'name' => Type::nonNull(Type::string()),
                'products' => fn() => Type::listOf($getProductType()),
            ],
        ]);
    }
}
