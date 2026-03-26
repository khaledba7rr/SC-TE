<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use PDO;
use Backend\Model\Abstracts\AbstractPDO;
use Backend\Model\Constants;

abstract class AbstractProductPrice extends AbstractPDO
{
    public function __construct(PDO $pdo)
    {
        parent::__construct($pdo);
    }

    public function getPricesByProductId(string $productId)
    {
        try {

            $query = Constants::getProductPricesByProductIdQuery();
            $stmt = $this->execute($query, [':id' => $productId]);

            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\Throwable $e) {
            echo "Error: " . $e->getMessage();
            return [];
        }
    }
}
