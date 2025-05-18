import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { increaseQuantity, decreaseQuantity } from '../../store/cart-slice';
import MiniCartAttributesValues from '../mini-cart-attributes-values/mini-cart-attributes-values';
import { useMutation } from '@apollo/client';

import './cart-items.scss';
import CartItem from '../../types/cart-items';
import { orderQuery } from '../../constants/graphql-queries';
import Loading from '../loading/loading';

import { setOrderProccessFailed, setOrderProccessSuccess , clearCart } from '../../store/cart-slice';

const CartItems: React.FC = () =>
{

    const dispatch = useDispatch();
    
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const allProducts = useSelector((state: RootState) => state.cart.allProducts);
    const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const itemsTotal = cartItems.reduce((acc, item) => acc + (item.quantity * (allProducts.find(product => product.id === item.productId)?.prices[0].price ?? 0)), 0);

    const [createOrder, {loading }] = useMutation(orderQuery);

    const HandleCreateOrder = (cartItems : CartItem[]) =>
    {
        const orderItems = cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: allProducts.find(product => product.id === item.productId)?.prices[0].price,
            currency: allProducts.find(product => product.id === item.productId)?.prices[0].currency,
            attributes: item.attributes.map(attr => ({
                attributeId: Number(attr.attribute_id),
                valueId: Number(attr.value_id)
            }))
        }));

        createOrder({
            variables: {
                input: {
                    customerName: 'Khaled Bahr',
                    currency: 'USD',
                    totalPrice: itemsTotal,
                    items: orderItems
                },
            },
        })
        .then(response => {
            if (response.data.CreateOrder)
            {
                dispatch(setOrderProccessSuccess(true));
                dispatch(clearCart());
            }
            else
            {
                dispatch(setOrderProccessFailed(true));
            }
        }
        )
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch(_ => dispatch(setOrderProccessFailed(true)) );
        
    }

    return <>
        
        {loading && <Loading />}
        <div className='d-flex bag-title'>
            <p> <span className='my-bag'> My Bag, </span> <span className='items-count'> { itemsCount } {itemsCount === 1 ? ' Item' : ' Items' }  </span> </p>
        </div>

        <div className='cart-items-list'>

            <div className='cart-item py-1'> 

                {cartItems.map((item , index) => 
                {
                    const product = allProducts.find((product) => product.id === item.productId);

                    return (
                        <>
                        <div key={`${item.productId} ${index}`} className='d-flex mb-2 mt-2 row align-items-stretch'>

                            <div className='col-5'>

                                <div className='d-flex flex-column justify-content-around align-items-start'> 
                                    <div className='product-name'> { product?.name} </div>
                                    <div className='product-price'> {product?.prices[0].symbol} {product?.prices[0].price} </div>
                                    <div className='product-attributes'> 
                                        {product?.attributes.map((attribute) =>
                                            <MiniCartAttributesValues key={attribute.id} attribute={attribute} selectedAttributeValueId={item.attributes.find((attr) => attr.attribute_id === attribute.id)?.value_id} />
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className='col-2 d-flex flex-column justify-content-between align-items-center'>
                                <div> <button data-testid='cart-item-amount-increase' className='quantity-button' onClick={()=> dispatch( increaseQuantity(item))}> + </button></div>
                                <div data-testid='cart-item-amount'> { item.quantity } </div>
                                <div> <button data-testid='cart-item-amount-decrease' className='quantity-button' onClick={()=> dispatch( decreaseQuantity(item))}> - </button></div>
                            </div>

                            <div className='col-5 product-main-image d-flex'>
                                <img className='' alt='product' src={product?.images[0].url} />
                            </div>
                        </div>

                        <hr></hr>
                        </>
                    );
                })}
                
            </div>

        </div>

        <div className='total-section d-flex justify-content-between mt-2'>
            <p className='total'> Total </p>
            <p data-testid='cart-total' className='total-price'> $ { itemsTotal.toFixed(2) } </p>
        </div>

        <div className='checkout-section d-flex'>
            <button className='checkout-btn w-100' onClick={() => HandleCreateOrder(cartItems)}> place order </button>
        </div>

    </>;
};

export default CartItems;