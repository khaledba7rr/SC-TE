import React from 'react';
import './empty-cart.scss';

import emptyCart from './empty-cart.svg';

const EmptyCart: React.FC = () => {
    return (
        <div className="empty-cart p-2">

            <div className="main-iamge empty-cart__content d-flex justify-content-around align-items-center flex-column">

                <h2 className="empty-cart__title">Your cart is empty</h2>

                <h6 className="empty-cart__title">Try to add some items </h6>

                <div className='main-image-container mt-5 p-3'>
                    <img src={emptyCart} alt="Empty Cart" className="img-thumbnail empty-cart-image border border-0" />
                </div>
                
            </div>
        </div>
    );
};

export default EmptyCart;