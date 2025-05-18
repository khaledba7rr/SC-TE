import React from 'react';
import './empty-cart.scss';
import { useDispatch } from 'react-redux';

import emptyCart from './empty-cart.svg';
import { Link } from 'react-router-dom';
import { closeCart } from '../../store/cart-slice';


const EmptyCart: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <div className="empty-cart p-2">

            <div className="main-iamge empty-cart__content d-flex justify-content-around align-items-center flex-column">

                <h2 className="empty-cart__title">Your cart is empty</h2>

                <h6 className="empty-cart__title">Try to add some items </h6>

                <div className='main-image-container mt-5 p-3'>
                    <img src={emptyCart} alt="Empty Cart" className="img-thumbnail empty-cart-image border border-0" />
                </div>

                <Link to={`/orders`}  onClick={() => dispatch(closeCart())} className='checkout-section card-link d-flex mt-3'>
                    <button className='checkout-btn w-100'> View orders </button>
                </Link>
            </div>
        </div>
    );
};

export default EmptyCart;