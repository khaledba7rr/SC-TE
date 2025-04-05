<?php

namespace Controller;

use GraphQL\GraphQL;

class GraphQLController
{
    private $schema;
    private $rootValue;

    public function __construct($schema, $rootValue)
    {
        $this->schema = $schema;
        $this->rootValue = $rootValue;
    }

    public function handle(): string
    {
        try {
            $rawInput = file_get_contents('php://input');
            $input = json_decode($rawInput, true);
            $query = $input['query'] ?? '';
            $variables = $input['variables'] ?? null;
            $operationName = $input['operationName'] ?? null;

            $result = GraphQL::executeQuery(
                $this->schema,
                $query,
                $this->rootValue,
                [], // context (like db connection)
                $variables,
                $operationName,
                null, // type resolver
            )->toArray();

            http_response_code(200);
        } catch (\Throwable $e) {
            $result = [
                'errors' => [[
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ]],
            ];
            http_response_code(500);
        }

        header('Content-Type: application/json');
        return json_encode($result);
    }
}
