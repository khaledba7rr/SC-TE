<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use Backend\Model\Abstracts\AbstractPDO;
use Backend\Model\Constants;
use PDO;

abstract class AbstractAttributeValue extends AbstractPDO
{
    public function __construct(PDO $pdo)
    {
        parent::__construct($pdo);
    }

    protected function getAttributeValuesByAttributeId(int $attributeId, string $productId) : array
    {
        $query = Constants::getAttributeValuesByAttributeIdQuery();
        $stmt = $this->execute($query, [':id' => $attributeId, ':product_id' => $productId]);

        $attributeValues = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $attributeValues;
    }
}
