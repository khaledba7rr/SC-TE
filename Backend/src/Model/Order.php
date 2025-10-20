<?php


namespace Model;

use Database\DatabaseConnectionFactory;
use DateTime;
use Exception;

class Order
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = DatabaseConnectionFactory::createConnection();
    }

    public function createOrder(array $input): array
    {
        $this->pdo->beginTransaction();

        try {

            if (!isset($input['customerName']) || trim($input['customerName']) === '') {
                throw new Exception('Customer name is required');
            }

            $stmt = $this->pdo->prepare("INSERT INTO orders (customer_name, total_price) VALUES (?, ?)");
            $stmt->execute([trim($input['customerName']), $input['totalPrice']]);
            $orderId = $this->pdo->lastInsertId();

            $finalItems = [];

            foreach ($input['items'] as $item) {
                $stmt = $this->pdo->prepare("INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)");
                $stmt->execute([$orderId, $item['productId'], $item['quantity'], $item['unitPrice']]);
                $orderItemId = $this->pdo->lastInsertId();

                $finalAttributes = [];

                foreach ($item['attributes'] as $attr) {
                    $stmt = $this->pdo->prepare("INSERT INTO order_item_attributes (order_item_id, attribute_id, value_id) VALUES (?, ?, ?)");
                    $stmt->execute([$orderItemId, $attr['attributeId'], $attr['valueId']]);

                    $finalAttributes[] = [
                        'attributeId' => $attr['attributeId'],
                        'valueId' => $attr['valueId'],
                    ];
                }

                $finalItems[] = [
                    'orderItemId' => $orderItemId,
                    'orderId' => $orderId,
                    'productId' => $item['productId'],
                    'quantity' => $item['quantity'],
                    'unitPrice' => $item['unitPrice'],
                    'currency' => $item['currency'] ?? 'USD',
                    'attributes' => $finalAttributes,
                ];
            }

            $this->pdo->commit();

            return [
                'orderId' => $orderId,
                'totalPrice' => $input['totalPrice'],
                'customerName' => $input['customerName'],
                'status' => 'pending',
                'created_at' => (new DateTime())->format('d/m/Y - H:i'),
                'items' => $finalItems,
            ];
        } catch (\Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    public function getAllOrders(): array
    {
        try {
            $orders = [];
            $stmt = $this->pdo->query("SELECT * FROM orders ORDER BY created_at DESC");
            $orderResults = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            foreach ($orderResults as $order) {
                $itemStmt = $this->pdo->prepare("SELECT * FROM order_items WHERE order_id = ?");
                $itemStmt->execute([$order['id']]);
                $items = [];

                while ($item = $itemStmt->fetch(\PDO::FETCH_ASSOC)) {
                    $attrStmt = $this->pdo->prepare("SELECT * FROM order_item_attributes WHERE order_item_id = ?");
                    $attrStmt->execute([$item['id']]);
                    $attributes = [];

                    while ($attr = $attrStmt->fetch(\PDO::FETCH_ASSOC)) {
                        $attributes[] = [
                            'attributeId' => $attr['attribute_id'],
                            'valueId' => $attr['value_id']
                        ];
                    }

                    $items[] = [
                        'orderItemId' => $item['id'],
                        'orderId' => $item['order_id'],
                        'productId' => $item['product_id'],
                        'quantity' => $item['quantity'],
                        'unitPrice' => $item['unit_price'],
                        'currency' => 'USD',
                        'attributes' => $attributes
                    ];
                }

                $orders[] = [
                    'orderId' => $order['id'],
                    'totalPrice' => $order['total_price'],
                    'customerName' => $order['customer_name'],
                    'status' => $order['status'] ?? 'pending',
                    'created_at' => (new DateTime($order['created_at']))->format('d/m/Y - H:i'),
                    'items' => $items
                ];
            }

            return $orders;
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
