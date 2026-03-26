<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use Backend\Model\Abstracts\AbstractPDO;
use Backend\Model\Constants;
use PDO;
use Backend\Model\AttributeValue;

/**
 * Abstract representation of an Attribute.
 */
abstract class AbstractAttribute extends AbstractPDO
{

    private AttributeValue $attributeValue;

    public function __construct(PDO $pdo, AttributeValue $attributeValue)
    {
        parent::__construct($pdo);
        $this->attributeValue = $attributeValue;
    }

    protected function getAttributesByProductId(string $id)
    {
        $stmt= $this->execute(Constants::getAttributesQuery(), [':id' => $id]);

        $attributesData = $this->fetchAll($stmt);

        foreach ($attributesData as &$attribute) {
            $attribute['values'] = $this->attributeValue->getAttributeValuesByAttributeId($attribute['id'], $id);
        }

        return $attributesData;
    }
}
