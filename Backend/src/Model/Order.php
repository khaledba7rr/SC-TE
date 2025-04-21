<?php


namespace Model;

use Database\DatabaseConnection;
use DateTime;
use Exception;

class Order
{

    public function createOrder(array $input): array
    {
        $db = new DatabaseConnection();
        $pdo = $db->getConnection();

        $pdo->beginTransaction();

        try {

            if (!isset($input['customerName']) || trim($input['customerName']) === '') {
                throw new Exception('Customer name is required');
            }

            $stmt = $pdo->prepare("INSERT INTO orders (customer_name, total_price) VALUES (?, ?)");
            $stmt->execute([trim($input['customerName']), $input['totalPrice']]);
            $orderId = $pdo->lastInsertId();

            $finalItems = [];

            foreach ($input['items'] as $item) {
                $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)");
                $stmt->execute([$orderId, $item['productId'], $item['quantity'], $item['unitPrice']]);
                $orderItemId = $pdo->lastInsertId();

                $finalAttributes = [];

                foreach ($item['attributes'] as $attr) {
                    $stmt = $pdo->prepare("INSERT INTO order_item_attributes (order_item_id, attribute_id, value_id) VALUES (?, ?, ?)");
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

            $pdo->commit();

            return [
                'orderId' => $orderId,
                'totalPrice' => $input['totalPrice'],
                'customerName' => $input['customerName'],
                'status' => 'pending',
                'created_at' => (new DateTime())->format('d/m/Y - H:i'),
                'items' => $finalItems,
            ];
        } catch (\Exception $e) {
            $pdo->rollBack();
            throw $e;
        }
    }
}
