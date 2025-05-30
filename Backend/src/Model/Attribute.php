<?php

namespace Model;

use Database\DatabaseConnection;

class Attribute
{
    public function __construct() {}

    public function getAttributesByProductId($id)
    {

        try {
            $db = new DatabaseConnection();
            $pdo = $db->getConnection();

            $query = "SELECT a.id, a.type, a.name, pa.product_id  , COUNT(*) AS attribute_count
              FROM attributes a 
              INNER JOIN product_attributes pa 
              ON a.id = pa.attribute_id 
              WHERE pa.product_id = :id
              GROUP BY pa.attribute_id";

            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            $attributesData = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            $attributeValueObject = new AttributeValue();

            foreach ($attributesData as &$attribute) {
                // Nested resolution for attribute values
                $attribute['values'] = $attributeValueObject->getAttributeValuesByAttributeId($attribute['id'], $id);
            }

            return $attributesData;
        } catch (\Exception $e) {
            return [
                'error' => 'Failed to fetch attributes: ' . $e->getMessage()
            ];
        }
    }
}
