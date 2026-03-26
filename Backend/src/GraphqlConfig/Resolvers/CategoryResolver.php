<?php

namespace Backend\GraphqlConfig\Resolvers;

use Backend\Model\Category;

class CategoryResolver
{
    private Category $category;

    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    public function getAllCategories()
    {
        return $this->category->getAllCategories();
    }
    
    public function getCategoryById(int $id): ?array
    {
        return $this->category->getCategoryById($id);
    }
}
