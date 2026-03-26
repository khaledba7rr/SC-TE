<?php
declare(strict_types=1);

namespace Backend\Model;


class Constants
{
    private const GET_ATTRIBUTE_BY_PRODUCT_ID_QUERY = "SELECT a.id, a.type, a.name, pa.product_id  , COUNT(*) AS attribute_count
              FROM attributes a 
              INNER JOIN product_attributes pa 
              ON a.id = pa.attribute_id 
              WHERE pa.product_id = :id
              GROUP BY pa.attribute_id";

    private const GET_PRODUCTS_BY_CATEGORY_ID_QUERY = "SELECT * FROM products WHERE category_id = :id";

    private const GET_CATEGORY_BY_ID_QUERY = "SELECT * FROM categories WHERE id = :id";

    private const GET_ALL_PRODUCTS_QUERY = "SELECT * FROM products";

    private const GET_PRODUCT_BY_ID_QUERY = "SELECT * FROM products WHERE id = :id";

    private const GET_ATTRIBUTE_VALUES_BY_PRODUCT_ID_QUERY = "SELECT av.id, av.value, av.display_value as displayValue 
                      FROM attribute_values av
                      INNER JOIN product_attributes pav ON av.id = pav.attribute_value_id
                      WHERE av.attribute_id = :id AND pav.product_id = :product_id";

    private const GET_ALL_CATEGORIES_QUERY = "SELECT * FROM categories";

    private const GET_PRODUCT_IMAGES_BY_PRODUCT_ID_QUERY = "SELECT * FROM product_images WHERE product_id = :id";
    
    private const GET_PRODUCT_PRICES_BY_PRODUCT_ID_QUERY = "SELECT * FROM product_prices WHERE product_id = :id";

    public static function getAttributesQuery(): string
    {
        return self::GET_ATTRIBUTE_BY_PRODUCT_ID_QUERY;
    }

    public static function getProductsByCategoryIdQuery(): string
    {
        return self::GET_PRODUCTS_BY_CATEGORY_ID_QUERY;
    }

    public static function getAllProductsQuery(): string
    {
        return self::GET_ALL_PRODUCTS_QUERY;
    }

    public static function getProductByIdQuery(): string
    {
        return self::GET_PRODUCT_BY_ID_QUERY;
    }

    public static function getAttributeValuesByAttributeIdQuery(): string
    {
        return self::GET_ATTRIBUTE_VALUES_BY_PRODUCT_ID_QUERY;
    }
    public static function getAllCategoriesQuery(): string
    {
        return self::GET_ALL_CATEGORIES_QUERY;
    }
    public static function getCategoryByIdQuery(): string
    {
        return self::GET_CATEGORY_BY_ID_QUERY;
    }

    public static function getProductImagesByProductIdQuery(): string
    {
        return self::GET_PRODUCT_IMAGES_BY_PRODUCT_ID_QUERY;
    }

    public static function getProductPricesByProductIdQuery(): string
    {
        return self::GET_PRODUCT_PRICES_BY_PRODUCT_ID_QUERY;
    }
}
