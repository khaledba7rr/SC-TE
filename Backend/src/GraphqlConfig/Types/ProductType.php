<?php

namespace Backend\GraphqlConfig\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductType extends ObjectType
{
    public function __construct(callable $getCategoryType, AttributeType $attributeType, ImageType $imageType, ProductPriceType $productPriceType)
    {
        parent::__construct([
            'name' => 'Product',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'name' => Type::nonNull(Type::string()),
                'description' => Type::string(),
                'in_stock' => Type::nonNull(Type::boolean()),
                'category_id' => Type::id(),
                'brand' => Type::string(),
                'category' => fn() => $getCategoryType(),
                'attributes' => Type::listOf($attributeType),
                'images' => Type::listOf($imageType),
                'prices' => Type::listOf($productPriceType),
                'type' => Type::string(),
            ],
        ]);
    }
}
