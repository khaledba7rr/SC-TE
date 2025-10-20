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

use GraphqlConfig\SchemaFactory;
use Controller\GraphQL;

$schema = SchemaFactory::build();

$dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) {
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
        $controller = new GraphQL($schema);
        echo $controller::handle();
        break;
}
