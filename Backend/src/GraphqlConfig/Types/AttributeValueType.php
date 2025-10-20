<?php

namespace GraphqlConfig\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeValueType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeValue',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'displayValue' => Type::string(),
                'value' => Type::string(),
                'type' => Type::string(),
            ],
        ]);
    }
}
