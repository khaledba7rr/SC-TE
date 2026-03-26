<?php

namespace Backend\GraphqlConfig\Resolvers;

use Backend\Model\Order;

class OrderResolver
{
    private Order $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
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
