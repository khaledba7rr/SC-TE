<?php

namespace Backend\Model;


use Backend\Model\Abstracts\AbstractProductImage;
use PDO;

class ProductImage extends AbstractProductImage
{

    public function __construct(PDO $pdo)
    {
        parent::__construct($pdo);
    }

    public function getImagesByProductId(string $id): array
    {
        return parent::getImagesByProductId($id);
    }
}
