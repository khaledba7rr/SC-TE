<?php

namespace Model;

use Database\DatabaseConnection;

class AttributeValue
{
    public function __construct() {}

    public function getAttributeValuesByAttributeId($id)
    {

        try {
            $db = new DatabaseConnection();
            $pdo = $db->getConnection();

            $query = "SELECT id, value, display_value as displayValue FROM attribute_values WHERE attribute_id = :id";

            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':id', $id);
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
