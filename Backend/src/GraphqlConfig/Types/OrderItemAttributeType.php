<?php

namespace GraphqlConfig\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemAttributeType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderItemAttribute',
            'fields' => [
                'valueId' => Type::id(),
                'attributeId' => Type::nonNull(Type::id()),
            ],
        ]);
    }
}
