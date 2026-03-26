<?php

namespace Backend\Model;

use Backend\Model\Abstracts\AbstractProductPrice;

class ProductPrice extends AbstractProductPrice
{

    public function getPricesByProductId(string $id)
    {
        return parent::getPricesByProductId($id);
    }
}
