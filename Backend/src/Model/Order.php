<?php


namespace Backend\Model;

use Backend\Model\Abstracts\AbstractOrder;
use PDO;

class Order extends AbstractOrder
{

    public function __construct(PDO $pdo)
    {
        parent::__construct($pdo);
    }

    public function createOrder(array $input): array
    {
        return parent::createOrder($input);
    }

    public function getAllOrders(): array
    {
        return parent::getAllOrders();
    }
}
