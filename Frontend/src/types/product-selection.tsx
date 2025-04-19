
type ProductDataSelection = {
    productId: string;
    quantity: number;
    attributes: {
        attribute_id: number;
        value_id: number;
    }[],
    singleItemPrice: number;
}


export default ProductDataSelection;