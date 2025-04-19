import Attribute from "../../types/attribute";
import AttributeValue from "../../types/attribute-value";

interface MiniCartAttributesValuesProps {
    attribute: Attribute;
    selectedAttributeValueId: number | undefined;
}


const MiniCartAttributesValues: React.FC<MiniCartAttributesValuesProps> = ({
    attribute,
    selectedAttributeValueId,
}) =>
{

    const GetKebakAttributeName = () : string =>
    {
        return attribute.name.toLowerCase().replace(' ', '-');
    }
    
    const GetAttributeValues = (attributeType: string) =>
    {
        
        if (attributeType === "text")
        {
            return <> 
                    <div className="attribute-values-text d-flex">
                        {attribute.values.map((value: AttributeValue, index) => (
                            <div key={value.id ? value.id : `${value.displayValue}-${index}`} className={`attribute-text m-1 p-2 d-flex justify-content-center align-items-center  ${selectedAttributeValueId === value.id && 'selected'}`} >
                                <div data-testid={`cart-item-attribute-${GetKebakAttributeName()}-${GetKebakAttributeName() + (selectedAttributeValueId === value.id ? '-selected' : '') }`} >{value.displayValue}</div>
                            </div>
                            ))}
                    </div>
                    </>
        }

        if (attributeType === "swatch")
        {
            return (
                    <div className="attribute-values-swatch d-flex">
                        {attribute.values.map((value: AttributeValue, index) => (
                                    
                            <div key={value.id ? value.id : `${value.displayValue}-${index}`} className="swatch-container" >

                            <div className={`attribute-swatch m-1 ${selectedAttributeValueId === value.id && 'selected'}`} style={{ backgroundColor: value.value }} />
                            </div>
                        ))}
                    </div>
                    );
        }
    }

    return (<>
        
        <div className="product-attributes">
            <div className='attribute-name' data-testid={`cart-item-attribute-${GetKebakAttributeName}`}> { attribute.name } : </div>
            <div className='attribute-values'>
                { GetAttributeValues(attribute.type) }
            </div>
        </div>
        
    </>);

}

export default MiniCartAttributesValues;