    <?php

    require_once __DIR__ . '/../vendor/autoload.php';

    use Database\DatabaseConnection;
    use GraphQL\GraphQL;
    use Model\Product;
    use Model\Attribute;
    use Model\Category;
    use GraphQL\Utils\BuildSchema;

    $db = new DatabaseConnection();
    $pdo = $db->getConnection();

    $productObject = new Product();
    $attributeObject = new Attribute();
    $categoryObject = new Category();

    $schema = BuildSchema::build(file_get_contents(__DIR__ . '/Graphql/schema.graphql'));

    $rootValue = [
        'products' => fn() => $productObject->getAllProducts(),
        'product' => fn($root, $args) => $productObject->getProductById($args['id']),
        'attributes' => fn($root, $args) => $attributeObject->getAttributesByProductId($args['product_id']),
        'categories' => fn() => $categoryObject->getAllCategories(),
    ];

    header('Content-Type: application/json');

    try {
        $rawInput = file_get_contents('php://input');
        $input = json_decode($rawInput, true);
        $query = $input['query'] ?? '';
        $variables = $input['variables'] ?? null;
        $operationName = $input['operationName'] ?? null;

        $result = GraphQL::executeQuery(
            $schema,
            $query,
            $rootValue,
            ['db' => $pdo],
            $variables,
            $operationName
        )->toArray();
    } catch (\Throwable $e) {
        $result = [
            'errors' => [
                [
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]
            ]
        ];
    }

    echo json_encode($result);
