type ProductDataSelection = {
  productId: string;
  quantity: number;
  price: number;
  attributes: {
    attribute_id: number;
    value_id: number;
  }[];
};

export default ProductDataSelection;
