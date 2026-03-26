<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use PDO;
use Backend\Model\Abstracts\AbstractPDO;
use Backend\Model\Constants;

abstract class AbstractProductImage extends AbstractPDO
{
    public function __construct(PDO $pdo)
    {
        parent::__construct($pdo);
    }

    public function getImagesByProductId(string $productId): array
    {
        try {
            $query = Constants::getProductImagesByProductIdQuery();
            $stmt = $this->execute($query, [':id' => $productId]);

            if (!$stmt) {
                error_log("Failed to execute query for product ID: $productId");
                return [];
            }

            $images = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            return $images ?: [];
        } catch (\Throwable $e) {
            error_log("Error fetching images for product ID $productId: " . $e->getMessage());
            return [];
        }
    }
}
