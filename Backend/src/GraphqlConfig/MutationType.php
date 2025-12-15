<?php

namespace Backend\GraphqlConfig;


use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class MutationType extends ObjectType
{
    public function __construct($orderInputType, $orderType, $resolvers)
    {
        parent::__construct([
            'name' => 'Mutation',
            'fields' => [
                'CreateOrder' => [
                    'type' => $orderType,
                    'args' => [
                        'input' => ['type' => Type::nonNull($orderInputType)],
                    ],
                    'resolve' => function ($root, array $args) use ($resolvers) {
                        // here GraphQL will provide: $args['input']
                        return $resolvers['orderResolver']->createOrder($args['input']);
                    },
                ],
            ],
        ]);
    }
}
