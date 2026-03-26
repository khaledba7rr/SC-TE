<?php

namespace Backend\Model;

use Backend\Model\Abstracts\AbstractAttribute;

class Attribute extends AbstractAttribute
{

    public function __construct(\PDO $pdo, AttributeValue $attributeValue)
    {
        parent::__construct($pdo, $attributeValue);
    }

    public function getAttributesByProductId($id)
    {
        return parent::getAttributesByProductId($id);
    }
}
