<?php

declare(strict_types=1);

namespace Backend\Model\Abstracts;

use PDO;
use RuntimeException;
use DateTime;
use Backend\Model\Abstracts\AbstractPDO;

abstract class AbstractOrder extends AbstractPDO
{
    public function __construct(PDO $pdo)
    {
        parent::__construct($pdo);
    }

    public function createOrder(array $input): array
    {
        if (empty($input['customerName'])) {
            throw new RuntimeException('Customer name is required');
        }

        if (empty($input['items']) || !is_array($input['items'])) {
            throw new RuntimeException('Order must contain items');
        }

        if (!isset($input['totalPrice'])) {
            throw new RuntimeException('Total price is required');
        }

        $this->pdo->beginTransaction();

        try {
            $this->execute(
                'INSERT INTO orders (customer_name, total_price) VALUES (:name, :price)',
                [
                    ':name'  => trim($input['customerName']),
                    ':price' => $input['totalPrice'],
                ]
            );

            $orderId = (int) $this->pdo->lastInsertId();
            $finalItems = [];

            foreach ($input['items'] as $item) {
                $this->execute(
                    'INSERT INTO order_items (order_id, product_id, quantity, unit_price)
                     VALUES (:orderId, :productId, :quantity, :unitPrice)',
                    [
                        ':orderId'   => $orderId,
                        ':productId' => $item['productId'],
                        ':quantity'  => $item['quantity'],
                        ':unitPrice' => $item['unitPrice'],
                    ]
                );

                $orderItemId = (int) $this->pdo->lastInsertId();
                $finalAttributes = [];

                foreach ($item['attributes'] ?? [] as $attr) {
                    $this->execute(
                        'INSERT INTO order_item_attributes (order_item_id, attribute_id, value_id)
                         VALUES (:orderItemId, :attributeId, :valueId)',
                        [
                            ':orderItemId' => $orderItemId,
                            ':attributeId' => $attr['attributeId'],
                            ':valueId'     => $attr['valueId'],
                        ]
                    );

                    $finalAttributes[] = [
                        'attributeId' => $attr['attributeId'],
                        'valueId'     => $attr['valueId'],
                    ];
                }

                $finalItems[] = [
                    'orderItemId' => $orderItemId,
                    'productId'   => $item['productId'],
                    'quantity'    => $item['quantity'],
                    'unitPrice'   => $item['unitPrice'],
                    'currency'    => $item['currency'] ?? 'USD',
                    'attributes'  => $finalAttributes,
                ];
            }

            $this->pdo->commit();

            return [
                'orderId'      => $orderId,
                'customerName' => $input['customerName'],
                'totalPrice'   => $input['totalPrice'],
                'status'       => 'pending',
                'createdAt'    => (new DateTime())->format('Y-m-d H:i:s'),
                'items'        => $finalItems,
            ];
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    public function getAllOrders(): array
    {
        $orders = [];

        $stmt = $this->execute(
            'SELECT * FROM orders ORDER BY created_at DESC'
        );

        $orderResults = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($orderResults as $order) {
            $itemStmt = $this->execute(
                'SELECT * FROM order_items WHERE order_id = :orderId',
                [':orderId' => $order['id']]
            );

            $items = [];

            foreach ($itemStmt->fetchAll(PDO::FETCH_ASSOC) as $item) {
                $attrStmt = $this->execute(
                    'SELECT * FROM order_item_attributes WHERE order_item_id = :itemId',
                    [':itemId' => $item['id']]
                );

                $attributes = [];

                foreach ($attrStmt->fetchAll(PDO::FETCH_ASSOC) as $attr) {
                    $attributes[] = [
                        'attributeId' => $attr['attribute_id'],
                        'valueId'     => $attr['value_id'],
                    ];
                }

                $items[] = [
                    'orderItemId' => $item['id'],
                    'productId'   => $item['product_id'],
                    'quantity'    => $item['quantity'],
                    'unitPrice'   => $item['unit_price'],
                    'currency'    => 'USD',
                    'attributes'  => $attributes,
                ];
            }

            $orders[] = [
                'orderId'      => $order['id'],
                'totalPrice'   => $order['total_price'],
                'customerName' => $order['customer_name'],
                'status'       => $order['status'] ?? 'pending',
                'createdAt'    => (new DateTime($order['created_at']))->format('Y-m-d H:i:s'),
                'items'        => $items,
            ];
        }

        return $orders;
    }
}
