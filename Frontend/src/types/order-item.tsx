
export type OrderItem = {
    productId: string;
    quantity: number;
    attributes: [{
        id: number;
        value_id: number;
    }]
    itemPrice: number;
}