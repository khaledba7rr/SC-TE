<?php

namespace Model;

use Database\DatabaseConnectionFactory;

class AttributeValue
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = DatabaseConnectionFactory::createConnection();
    }


    public function getAttributeValuesByAttributeId(int $attributeId, string $productId)
    {

        try {
            $query = "SELECT av.id, av.value, av.display_value as displayValue 
                      FROM attribute_values av
                      INNER JOIN product_attributes pav ON av.id = pav.attribute_value_id
                      WHERE av.attribute_id = :id AND pav.product_id = :product_id";

            $stmt = $this->pdo->prepare($query);
            $stmt->bindParam(':id', $attributeId);
            $stmt->bindParam(':product_id', $productId);
            $stmt->execute();

            $attributeValues = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            return $attributeValues;
        } catch (\Exception $e) {
            return [
                'error' => 'Failed to fetch attributes: ' . $e->getMessage()
            ];
        }
    }
}
