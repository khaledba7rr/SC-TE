<?php

header("Access-Control-Allow-Origin: *"); // Allow all domains (for development, change '*' to specific domain for production)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle OPTIONS request before anything else
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

require_once __DIR__ . '/../vendor/autoload.php';

use Model\Product;
use Model\Attribute;
use Model\Category;
use Model\Order;
use Graphql\SchemaFactory;
use Controller\GraphQL;

$productObject = new Product(['id' => $args['id'], 'name' => $args['name'], 'description' => $args['description']]);
$attributeObject = new Attribute();
$categoryObject = new Category();
$orderObject = new Order();

$schema = SchemaFactory::create();

$rootValue = [
    'products' => fn() => $productObject->getAllProducts(),
    'product' => fn($root, $args) => $productObject->getProductById($args['id']),
    'attributes' => fn($root, $args) => $attributeObject->getAttributesByProductId($args['product_id']),
    'categories' => fn() => $categoryObject->getAllCategories(),
    'CreateOrder' => fn($root, $args) => $orderObject->createOrder($args['input']),
    'orders' => fn($root, $args) => $orderObject->getAllOrders(),
];

// Set up FastRoute
$dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) {
    // Make sure to use the correct HTTP method (POST)
    $r->addRoute('POST', '/graphql', [GraphQL::class, 'handle']);
});

// Dispatch the request
$routeInfo = $dispatcher->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);


switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        // Handle 404
        header("HTTP/1.1 404 Not Found");
        echo json_encode(['error' => 'Route not found']);
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        // Handle 405
        header("HTTP/1.1 405 Method Not Allowed");
        echo json_encode(['error' => 'Method not allowed']);
        break;
    case FastRoute\Dispatcher::FOUND:
        // Instantiate controller and call the handle method
        $controller = new GraphQL($schema, $rootValue);
        echo $controller->handle();
        break;
}
