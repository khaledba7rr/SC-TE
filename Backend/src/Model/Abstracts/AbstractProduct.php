<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use Backend\Model\Abstracts\AbstractPDO;
use Backend\Model\Constants;
use Backend\Model\Product;
use Backend\Model\Attribute;
use Backend\Model\Category;
use Backend\Model\ProductImage;
use Backend\Model\ProductPrice;
use PDO;

abstract class AbstractProduct extends AbstractPDO
{
    private Attribute $attribute;
    private Category $category;
    private ProductImage $images;
    private ProductPrice $prices;

    public function __construct(Attribute $attribute, Category $category, ProductImage $images, ProductPrice $prices, PDO $pdo)
    {
        $this->attribute = $attribute;
        $this->category = $category;
        $this->images = $images;
        $this->prices = $prices;
        parent::__construct($pdo);
    }

    public function getAllProducts(): array
    {
        $statement = $this->execute(Constants::getAllProductsQuery());

        $rows = $this->fetchAll($statement, \PDO::FETCH_ASSOC);

        $products = $this->getNestedFieldsForProducts($rows);

        return $products;
    }

    public function getProductsByCategoryId(int $categoryId): array
    {
        $category = $this->category->getCategoryById($categoryId);

        $query = $category['name'] === 'all' ? Constants::getAllProductsQuery() : Constants::getProductsByCategoryIdQuery();

        if ($category['name'] === 'all') {
            $stmt = $this->execute($query);
        } else {
            $stmt = $this->execute($query, [':id' => $categoryId]);
        }

        $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $products = $this->getNestedFieldsForProducts($products);

        return $products;
    }

    public function getProductById(string $id): mixed
    {
        $statement = $this->execute(Constants::getProductByIdQuery(), [':id' => $id]);

        $productData = $this->fetch($statement, PDO::FETCH_ASSOC);

        $product = $this->getNestedFieldsForSingleProduct($productData);

        return $product;
    }

    protected function getNestedFieldsForProducts(array $products): array
    {

        foreach ($products as &$product) {
            $product = $this->hydrateProduct($product);
        }

        return $products;
    }

    protected function getNestedFieldsForSingleProduct(array $product): array
    {
        $product = $this->hydrateProduct($product);

        return $product;
    }

    private function hydrateProduct(array $product): array
    {
        $product['attributes'] = $this->attribute->getAttributesByProductId($product['id']);
        $product['category'] = $this->category->getCategoryById($product['category_id']);
        $product['images'] = $this->images->getImagesByProductId($product['id']);
        $product['prices'] = $this->prices->getPricesByProductId($product['id']);

        return $product;
    }
}
