type Order = {
    orderId : number,
    customerName: string,
    totalPrice: number,
    status: string,
    created_at: string,
        items: [
            {
                orderItemId: number,
                orderId: number,
                productId: string,
                quantity: 1,
                unitPrice: number,
                currency: string,
                attributes: [
                    {
                        attributeId: number,
                        valueId: number
                    },
                ]
            },
        ]
}   
    

export default Order;