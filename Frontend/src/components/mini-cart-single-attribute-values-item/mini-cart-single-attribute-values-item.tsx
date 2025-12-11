import React from 'react';

interface AttributeValue {
  id?: string;
  displayValue: string;
  value: string;
}

interface MiniCartSingleAttributeValuesItemProps {
  attributeType: string;
  attribute: {
    values: AttributeValue[];
  };
  selectedAttributeValueId: string;
  getKebakAttributeName: () => string;
}

const MiniCartSingleAttributeValuesItem: React.FC<
  MiniCartSingleAttributeValuesItemProps
> = ({
  attributeType,
  attribute,
  selectedAttributeValueId,
  getKebakAttributeName,
}) => {
  if (attributeType === 'text') {
    return (
      <div className="attribute-values-text d-flex">
        {attribute.values.map((value: AttributeValue, index) => (
          <div
            key={value.id ? value.id : `${value.displayValue}-${index}`}
            className={`attribute-text m-1 p-2 d-flex justify-content-center align-items-center ${
              selectedAttributeValueId === value.id && 'selected'
            }`}
          >
            <div
              key={value.id}
              data-testid={`cart-item-attribute-${getKebakAttributeName()}-${
                getKebakAttributeName() +
                (selectedAttributeValueId === value.id ? '-selected' : '')
              }`}
            >
              {value.value}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (attributeType === 'swatch') {
    return (
      <div className="attribute-values-swatch d-flex">
        {attribute.values.map((value: AttributeValue, index) => (
          <div
            key={value.id ? value.id : `${value.displayValue}-${index}`}
            className="swatch-container"
          >
            <div
              key={value.id}
              className={`attribute-swatch ${
                selectedAttributeValueId === value.id && 'selected'
              }`}
              style={{ backgroundColor: value.value }}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default MiniCartSingleAttributeValuesItem;
