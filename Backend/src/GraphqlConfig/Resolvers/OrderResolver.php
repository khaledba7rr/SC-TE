<?php

namespace Backend\GraphqlConfig\Resolvers;

use Backend\Model\Order;

class OrderResolver
{
    private $order;

    public function __construct()
    {
        $this->order = new Order();
    }

    public function getAllOrders()
    {
        return $this->order->getAllOrders();
    }

    public function createOrder($input)
    {
        return $this->order->createOrder($input);
    }
}
