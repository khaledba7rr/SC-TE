import Attribute from '../../types/attribute';
import MiniCartSingleAttributeValuesItem from '../mini-cart-single-attribute-values-item/mini-cart-single-attribute-values-item';

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
          {
            <MiniCartSingleAttributeValuesItem
              attributeType={attribute.type}
              attribute={{
                ...attribute,
                values: attribute.values.map(v => ({
                  ...v,
                  id: String(v.id),
                })),
              }}
              selectedAttributeValueId={
                selectedAttributeValueId !== undefined
                  ? String(selectedAttributeValueId)
                  : ''
              }
              getKebakAttributeName={getKebakAttributeName}
            />
          }
        </div>
      </div>
    </>
  );
};

export default MiniCartAttributesValues;
