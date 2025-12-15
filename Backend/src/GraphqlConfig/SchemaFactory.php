<?php

namespace Backend\GraphqlConfig;

use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use Backend\GraphqlConfig\Types\ProductType;
use Backend\GraphqlConfig\Types\CategoryType;
use Backend\GraphqlConfig\Types\ImageType;
use Backend\GraphqlConfig\Types\ProductPriceType;
use Backend\GraphqlConfig\Types\AttributeType;
use Backend\GraphqlConfig\Types\AttributeValueType;
use Backend\GraphqlConfig\Types\OrderType;
use Backend\GraphqlConfig\Types\OrderItemType;
use Backend\GraphqlConfig\Types\OrderItemAttributeType;
use Backend\GraphqlConfig\Types\OrderItemInputType;
use Backend\GraphqlConfig\Types\OrderItemAttributeInputType;
use Backend\GraphqlConfig\Types\OrderInputType;
use Backend\GraphqlConfig\MutationType;
use Backend\GraphqlConfig\QueryType;
use Backend\GraphqlConfig\Resolvers\ResolverFactory;

class SchemaFactory
{
    public static function build(): Schema
    {
        $resolverFactory = new ResolverFactory();
        $resolvers = $resolverFactory->createResolvers();

        // Core simple types
        $attributeValueType = new AttributeValueType();
        $attributeType      = new AttributeType($attributeValueType);
        $imageType          = new ImageType();
        $productPriceType   = new ProductPriceType();

        // Lazy references for circular Product <-> Category
        $productType  = null;
        $categoryType = null;

        $getProductType = function () use (&$productType) {
            if ($productType === null) {
                throw new \RuntimeException("ProductType requested before initialization");
            }
            return $productType;
        };

        $getCategoryType = function () use (&$categoryType) {
            if ($categoryType === null) {
                throw new \RuntimeException("CategoryType requested before initialization");
            }
            return $categoryType;
        };

        // Build types
        $categoryType = new CategoryType($getProductType);
        $productType  = new ProductType($getCategoryType, $attributeType, $imageType, $productPriceType);

        // Order types
        $orderItemAttributeType  = new OrderItemAttributeType();
        $orderItemType           = new OrderItemType($orderItemAttributeType);
        $orderType               = new OrderType($orderItemType);
        $orderItemAttributeInput = new OrderItemAttributeInputType();
        $orderItemInput          = new OrderItemInputType($orderItemAttributeInput);
        $orderInputType          = new OrderInputType($orderItemInput);

        // Root Query + Mutation
        $queryType    = new QueryType($productType, $categoryType, $orderType, $resolvers);
        $mutationType = new MutationType($orderInputType, $orderType, $resolvers);

        return new Schema(
            (new SchemaConfig())
                ->setQuery($queryType)
                ->setMutation($mutationType)
                ->setTypes([
                    $productType,
                    $categoryType,
                    $attributeType,
                    $attributeValueType,
                    $imageType,
                    $productPriceType,
                    $orderType,
                    $orderItemType,
                    $orderItemAttributeType,
                    $orderInputType,
                    $orderItemInput,
                    $orderItemAttributeInput,
                ])
        );
    }
}
