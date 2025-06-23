<?php

namespace Model;

class ClothingProduct extends Product
{
    public function getType(): string
    {
        return 'clothing';
    }
}
