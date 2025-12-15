<?php

namespace Backend\GraphqlConfig\Resolvers;

class ResolverFactory
{
    public function createResolvers(): array
    {
        return [
            'productResolver' => new ProductResolver(),
            'categoryResolver' => new CategoryResolver(),
            'orderResolver' => new OrderResolver(),
        ];
    }
}
