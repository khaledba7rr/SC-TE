<?php

namespace Model;

class ElectronicProduct extends Product
{
    public function getType(): string
    {
        return 'tech';
    }
}
