<?php

namespace Controller;

use GraphQL\GraphQL as GraphQLBase;
use GraphqlConfig\SchemaFactory;
use RuntimeException;
use Throwable;

class GraphQL
{
    static public function handle()
    {
        try {
            // Build full schema from your SchemaFactory
            $schema = SchemaFactory::build();

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            $query = $input['query'] ?? null;
            $variableValues = $input['variables'] ?? null;

            if (!$query) {
                throw new RuntimeException('No query provided');
            }

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            $output = [
                'errors' => [
                    ['message' => $e->getMessage()],
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}
