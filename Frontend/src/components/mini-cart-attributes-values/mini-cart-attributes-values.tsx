import Attribute from '../../types/attribute';
import AttributeValue from '../../types/attribute-value';

interface MiniCartAttributesValuesProps {
  attribute: Attribute;
  selectedAttributeValueId: number | undefined;
  forOrders?: boolean;
}

const MiniCartAttributesValues: React.FC<MiniCartAttributesValuesProps> = ({
  attribute,
  selectedAttributeValueId,
  forOrders = false,
}) => {
  const getKebakAttributeName = (): string => {
    return attribute.name.toLowerCase().replace(/\s+/g, '-');
  };

  const getAttributeValues = (attributeType: string) => {
    if (attributeType === 'text') {
      return (
        <>
          <div className={`attribute-values-text d-flex`}>
            {attribute.values.map((value: AttributeValue, index) => (
              <div
                key={value.id ? value.id : `${value.displayValue}-${index}`}
                className={`attribute-text m-1 p-2 d-flex justify-content-center align-items-center  ${selectedAttributeValueId === value.id && 'selected'}`}
              >
                <div
                  data-testid={`cart-item-attribute-${getKebakAttributeName()}-${getKebakAttributeName() + (selectedAttributeValueId === value.id ? '-selected' : '')}`}
                >
                  {value.value}
                </div>
              </div>
            ))}
          </div>
        </>
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
                className={`attribute-swatch m-1 ${selectedAttributeValueId === value.id && 'selected'}`}
                style={{ backgroundColor: value.value }}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <div
        className={`product-attributes ${forOrders ? 'd-flex justify-content-around align-items-center mx-2 my-2' : ''}`}
      >
        <div
          className={`attribute-name ${forOrders ? 'mx-4' : ''}`}
          data-testid={`cart-item-attribute-${getKebakAttributeName()}`}
        >
          {' '}
          {attribute.name} :{' '}
        </div>
        <div className="attribute-values">
          {getAttributeValues(attribute.type)}
        </div>
      </div>
    </>
  );
};

export default MiniCartAttributesValues;
