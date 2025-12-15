<?php

namespace Backend\GraphqlConfig\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ImageType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Image',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'product_id' => Type::nonNull(Type::id()),
                'url' => Type::nonNull(Type::string()),
                'label' => Type::string(),
            ],
        ]);
    }
}
