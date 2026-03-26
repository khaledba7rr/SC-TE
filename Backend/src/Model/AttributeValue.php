<?php

namespace Backend\Model;

use Backend\Model\Abstracts\AbstractAttributeValue;
use PDO;

class AttributeValue extends AbstractAttributeValue
{
    public function __construct(PDO $pdo)
    {
        parent::__construct($pdo);
    }

    public function getAttributeValuesByAttributeId(int $attributeId, string $productId) : array
    {
        return parent::getAttributeValuesByAttributeId($attributeId, $productId);
    }
}
