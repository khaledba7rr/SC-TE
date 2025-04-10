import AttributeValue from "../../types/attribute-value";


interface HeaderProps {
  type: 'text' | 'swatch';
  attributeValues: AttributeValue[];
}

const AttributeValues: React.FC<HeaderProps> = ({ type, attributeValues }) =>
{
  return type === 'text' ? (
    <div className="attribute-values-text d-flex flex-wrap">
      {attributeValues.map((value: AttributeValue, index) => (
        <div
          key={value.id ? value.id : `${value.displayValue}-${index}`}
          className={`attribute-text m-1 p-3 d-flex justify-content-center align-items-center  ${index === 0 && 'selected'}`}
        >
          <div>{value.displayValue}</div>
        </div>
      ))}
    </div>
  ) : (
    <div className="attribute-values-swatch d-flex flex-wrap">
      {attributeValues.map((value: AttributeValue, index) => (
        <div
          key={value.id ? value.id : `${value.displayValue}-${index}`}
          className="swatch-container"
        >
          <div
            className={`attribute-swatch m-1 ${index === 0 && 'selected'}`}
            style={{ backgroundColor: value.value }}
          />
        </div>
      ))}
    </div>
  );
};

export default AttributeValues;