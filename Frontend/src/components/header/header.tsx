import logo from '/sw-logo.png';
import './header.scss';
import Category from '../../types/category';
import { Link } from 'react-router-dom';
import MiniCart from '../mini-cart/mini-cart';

import { closeCart } from '../../store/cart-slice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import { useQuery } from '@apollo/client';

import { categoriesQuery } from '../../constants/graphql-queries';

type HeaderProps = {
  onCategoryChange: (value: Category) => void;
  currentCategory: Category;
};

const Header: React.FC<HeaderProps> = ({
  onCategoryChange,
  currentCategory,
}) => {
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const dispatch = useDispatch();

  const categories: Category[] =
    useQuery(categoriesQuery).data?.categories || [];

  return (
    <header className="header">
      <div id="main-container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse flex-grow-0"
              id="navbarSupportedContent"
            >
              {/* CATEGORIES  */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {categories.map((category) => (
                  <li key={category.id} className="nav-item fs-4">
                    <Link
                      data-testid={
                        category.name === currentCategory.name
                          ? 'active-category-link'
                          : 'category-link'
                      }
                      to={`/${category.name}`}
                      className={`nav-link pb-4 ${category.name === currentCategory.name && 'active'}`}
                      aria-current="page"
                      onClick={() => onCategoryChange(category)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LOGO */}
            <div className="header__logo d-flex justify-content-center align-items-center d-none d-md-flex">
              <Link
                to="/"
                className="navbar-brand d-flex justify-content-center align-items-center"
              >
                <img src={logo} className="rounded w-25" alt="..." />
              </Link>
            </div>

            <MiniCart />
          </div>
        </nav>
      </div>

      <div
        id="overlay"
        data-testid="cart-overlay"
        onClick={() => dispatch(closeCart())}
        className={`overlay ${isCartOpen ? 'd-block' : 'd-none'}`}
      ></div>
    </header>
  );
};

export default Header;
