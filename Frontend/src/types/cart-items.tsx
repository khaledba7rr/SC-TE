type CartItem = {
  productId: string;
  quantity: number;
  attributes: {
    attribute_id: number;
    value_id: number;
  }[];
};

export default CartItem;
