import AttributeValue from "./attribute-value";

type Attribute = {
    id: number;
    name: string;
    type: string;
    values: AttributeValue[];
}

export default Attribute;