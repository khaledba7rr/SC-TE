<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use PDO;
use Backend\Model\Abstracts\AbstractPDO;
use Backend\Model\Constants;

abstract class AbstractCategory extends AbstractPDO
{

    public function __construct(PDO $pdo)
    {
        parent::__construct($pdo);
    }

    public function getAllCategories()
    {
        $query = Constants::getAllCategoriesQuery();
        $stmt = $this->execute($query);
        $categoreis = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $categoreis;
    }

    public function getCategoryById(int $id): ?array
    {
        $query = Constants::getCategoryByIdQuery();

        try {
            $stmt = $this->execute($query, [':id' => $id]);

            $category = $stmt->fetch(\PDO::FETCH_ASSOC);

            return $category;
        } catch (\PDOException $e) {
            return null;
        }
    }

}
