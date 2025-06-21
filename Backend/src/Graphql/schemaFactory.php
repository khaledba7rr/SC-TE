<?php

namespace Graphql;

use GraphQL\Type\Schema;
use GraphQL\Utils\BuildSchema;

class SchemaFactory
{
    public static function create(): Schema
    {
        $schemaDefinition = file_get_contents(__DIR__ . '/schema.graphql');

        return BuildSchema::build($schemaDefinition);
    }
}
