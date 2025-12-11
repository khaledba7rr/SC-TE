import Attribute from '../../types/attribute';
import AttributeValue from '../../types/attribute-value';

import { useState } from 'react';

interface AttributeValuesProps {
  type: 'text' | 'swatch';
  attributeValues: AttributeValue[];
  attribute: Attribute;
  selectProductAttributes: (attributeId: number, valueId: number) => void;
}

type AttributeSelection = {
  attribute_id: number;
  value_id: number;
};

const AttributeValues: React.FC<AttributeValuesProps> = ({
  type,
  attributeValues,
  attribute,
  selectProductAttributes,
}) => {
  const [attributeSelection, setAttributeSelection] = useState<
    AttributeSelection[] | null
  >(null);

  const handleAttributeSelection = (attributeId: number, valueId: number) => {
    if (!attributeSelection) {
      const newAttributeSelection: AttributeSelection[] = [
        { attribute_id: attributeId, value_id: valueId },
      ];
      setAttributeSelection(newAttributeSelection);
    } else {
      const existingAttribute = attributeSelection.find(
        (attr) => attr.attribute_id === attributeId
      );
      if (existingAttribute) {
        existingAttribute.value_id = valueId;
      } else {
        setAttributeSelection([
          ...attributeSelection,
          { attribute_id: attributeId, value_id: valueId },
        ]);
      }
    }

    selectProductAttributes(attributeId, valueId);
  };

  const getSelectedAttribute = (attributeId: number) => {
    if (!attributeSelection) {
      return null;
    }

    const selectedAttribute = attributeSelection.find(
      (attr) => attr.attribute_id === attributeId
    );
    return selectedAttribute ? selectedAttribute.value_id : null;
  };

  return type === 'text' ? (
    <div className="attribute-values-text d-flex flex-wrap">
      {attributeValues.map((value: AttributeValue, index) => (
        <div
          key={value.id ? value.id : `${value.displayValue}-${index}`}
          className={`attribute-text m-1 p-3 d-flex justify-content-center align-items-center  ${getSelectedAttribute(attribute.id) === value.id && 'selected'}`}
          onClick={() => handleAttributeSelection(attribute.id, value.id)}
        >
          <div
            data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/\s+/g, '-')}-${value.displayValue}`}
          >
            {value.displayValue}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="attribute-values-swatch d-flex flex-wrap">
      {attributeValues.map((value: AttributeValue, index) => (
        <div
          key={value.id ? value.id : `${value.displayValue}-${index}`}
          className="swatch-container m-1"
        >
          <div
            className={`attribute-swatch ${getSelectedAttribute(attribute.id) === value.id && 'selected'}`}
            style={{ backgroundColor: value.value }}
            data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/\s+/g, '-')}-${value.displayValue}`}
            onClick={() => handleAttributeSelection(attribute.id, value.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default AttributeValues;
