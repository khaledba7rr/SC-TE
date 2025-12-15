<?php

namespace Backend\GraphqlConfig\Resolvers;

use Backend\Model\Category;

class CategoryResolver
{
    private $categoy;

    public function __construct()
    {
        $this->categoy = new Category();
    }

    public function getAllCategories()
    {
        return $this->categoy->getAllCategories();
    }
}
