<?php


namespace Backend\Model;


use Backend\Model\Abstracts\AbstractCategory;
use PDO;

class Category extends AbstractCategory
{
    public function __construct(PDO $pdo)
    {
        parent::__construct($pdo);
    }

    public function getAllCategories()
    {
        return parent::getAllCategories();
    }

    public function getCategoryById(int $id): ?array
    {
        return parent::getCategoryById($id);
    }
}
