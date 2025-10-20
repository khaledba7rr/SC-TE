<?php

namespace GraphqlConfig;

use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use GraphqlConfig\Types\ProductType;
use GraphqlConfig\Types\CategoryType;
use GraphqlConfig\Types\ImageType;
use GraphqlConfig\Types\ProductPriceType;
use GraphqlConfig\Types\AttributeType;
use GraphqlConfig\Types\AttributeValueType;
use GraphqlConfig\Types\OrderType;
use GraphqlConfig\Types\OrderItemType;
use GraphqlConfig\Types\OrderItemAttributeType;
use GraphqlConfig\Types\OrderItemInputType;
use GraphqlConfig\Types\OrderItemAttributeInputType;
use GraphqlConfig\Types\OrderInputType;
use GraphqlConfig\MutationType;
use GraphqlConfig\QueryType;
use GraphqlConfig\Resolvers\ResolverFactory;

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
