import { JSX } from "react";
import AttributeValue from "../types/attribute-value";


export const getAttributeValues = (type: 'text' | 'swatch', attributeValues: AttributeValue[]): JSX.Element =>
{ 
  
  if (type === 'text') {
    return (
      <div className="attribute-values-text d-flex flex-wrap">
        {attributeValues.map((value: AttributeValue , index) => (
          <div key={value.id} className={`attribute-text m-1 p-3 d-flex justify-content-center align-items-center  ${index == 0 && 'selected' } `}>
            <div>{value.displayValue}</div>
          </div>
        ))}
      </div>
    );
  }
  else
  {
    // swatch
    return (
      <div className="attribute-values-swatch d-flex flex-wrap">
        {attributeValues.map((value: AttributeValue, index) => (
          <div
            key={value.id}
            className={`attribute-swatch m-1 ${index == 0 && 'selected'}`}
            style={{
              backgroundColor: value.value,

            }}
          />
        ))}
      </div>
    );
  }
};
