import React from 'react';

import './mini-cart.scss';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import { toggleCart } from '../../store/cart-slice';
import CartItems from '../cart-items/cat-items';

const MiniCart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const dispatch = useDispatch();

  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="header__logo">
      <div className="cart-container">
        <a
          data-testid="cart-btn"
          className="cart-toggle"
          onClick={() => dispatch(toggleCart())}
        >
          <i className="bi bi-cart3 fs-2">
            {itemsCount > 0 && (
              <span className="count-icon position-absolute translate-middle bg-dark rounded-circle">
                {itemsCount}
              </span>
            )}
          </i>
        </a>

        <div
          className={`cart-items px-4 py-3 mt-4 ${isCartOpen ? 'd-block' : 'd-none'}`}
        >
          {<CartItems itemsLength={itemsCount} />}
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
