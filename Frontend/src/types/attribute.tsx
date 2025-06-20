import AttributeValue from './attribute-value';

type Attribute = {
  id: number;
  name: string;
  type: 'text' | 'swatch';
  values: AttributeValue[];
};

export default Attribute;
