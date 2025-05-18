import { useState, useEffect } from "react";
import './order-card.scss';
import Order from '../../types/order';
import { useQuery } from '@apollo/client';
import { ordersQuery } from '../../constants/graphql-queries';
import Loading from "../loading/loading";
import Error from "../error/error";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import MiniCartAttributesValues from "../mini-cart-attributes-values/mini-cart-attributes-values";

const OrderItems = () =>
{
    
    const [orders, setOrders] = useState<Order[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const allProducts = useSelector((state: RootState) => state.cart.allProducts);

    const { data, error, loading } = useQuery(ordersQuery);
    
    const HandleSetError = (value: boolean) => {
        setIsError(value);
    };

    const HandleSetOrders = (orders: Order[]) => setOrders(orders);

    const HandleSetLoading = (value: boolean) => {
        setIsLoading(value);
    };

    useEffect(() =>
    {
    
    if (error) {
      HandleSetError(true);
      HandleSetLoading(false);
      return;
    }

    if (loading) {
      HandleSetLoading(true);
      return;
    }

    if (data)
    {

      HandleSetOrders(data.orders);
      setIsLoading(false);
    }

  }, [data, error, loading]);

    return (

        <>
        {isError && <Error />} 
        {isLoading && <Loading />}
            <div className="order-card my-5">
                <div className="accordion" id="ordersAccordion">
                    {orders.map( order =>
                    {
                        return (
                            <div className="accordion-item mt-5">

                                <h2 className="accordion-header d-flex justify-content-between">

                                <button className="accordion-button" type="button" data-bs-toggle="collapse"  data-bs-target={`#order-${order.orderId}`} aria-expanded="true" aria-controls={`order-${order.orderId}`} >
                                    <div className='d-flex justify-content-between w-100'>
                                        <div className='px-2'> {order.orderId + ' - Order'}</div>
                                        <div className='px-2'> { order.created_at} </div>
                                    </div>
                                </button>
                                
                                
                                </h2>
                                <div id={`order-${order.orderId}`} className="accordion-collapse collapse" data-bs-parent="#orderBody">
                                <div className="accordion-body">
                                    
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Customer Name</th>
                                                <th scope="col">Total price </th>
                                                <th scope="col">Created at </th>
                                                <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{order.orderId}</th>
                                                    <th>{ order.customerName}</th>
                                                    <td>${order.totalPrice.toFixed(2) }</td>
                                                    <td>{order.created_at}</td>
                                                    <td> <div className="badge text-bg-warning"> {order.status} </div> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    
                                    <div className="accordion-item">

                                        <h2 className="accordion-header d-flex justify-content-between">

                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#order-items" aria-expanded="true" aria-controls="order-items">
                                            Order Items
                                        </button>
                                        
                                        
                                        </h2>
                                        <div id="order-items" className="accordion-collapse collapse" data-bs-parent="#orderItems">
                                        <div className="accordion-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th> Product </th>
                                                        <th> currency </th>
                                                        <th> Quantity </th>
                                                        <th> Unit price </th>
                                                        <th> Total price </th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.items.map(orderItem => {
                                                        const currentProduct = allProducts.find(product => product.id === orderItem.productId); 
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <th scope="row">{ currentProduct?.name ?? '-' }</th>
                                                                    <td>{orderItem.currency}</td>
                                                                    <th>{ orderItem.quantity}</th>
                                                                    <td>{orderItem.unitPrice}</td>
                                                                    <td>{ orderItem.unitPrice * orderItem.quantity}</td>
                                                                </tr>

                                                                <div className='d-flex flex-column justify-content-around align-items-start attr-parent'> 
                                                                    <div className='product-attributes d-flex g-3'>
                                                                        {currentProduct?.attributes.length ?
                                                                            currentProduct?.attributes.map((attribute) =>
                                                                            <MiniCartAttributesValues key={attribute.id} forOrders={true} attribute={attribute} selectedAttributeValueId={orderItem.attributes.find((attr) => attr.attributeId === attribute.id)?.valueId} />
                                                                            ) :
                                                                            <div> Product has no attributes </div>}

                                                                    </div>
                                                                </div>
                                                            </>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
                </div>
        </>
    );
};

export default OrderItems;