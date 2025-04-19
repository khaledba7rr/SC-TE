
import logo from '/sw-logo.png'
import './header.scss'
import Category from '../../types/category';
import { Link } from 'react-router-dom';
import MiniCart from '../mini-cart/mini-cart';

import { closeCart } from '../../store/cart-slice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';

type HeaderProps = {
  onCategoryChange: (value: string) => void;
  currentCategory: string;
  categories: Category[];
};

const Header: React.FC<HeaderProps> = ({ onCategoryChange , currentCategory, categories}) =>
{
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const dispatch = useDispatch();

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

                {categories.map(category => (
                    <li key={category.id} className="nav-item fs-4">
                    <Link data-testid={category.name === currentCategory ? 'active-category-link' : 'category-link'} to="/" className={`nav-link ${category.name === currentCategory && 'active'}`} aria-current="page" onClick={() => onCategoryChange(category.name)} >
                        {category.name }
                      </Link>
                    </li>
                ))}
              </ul>
            </div>
            
            {/* LOGO */}
            <div className="header__logo d-flex justify-content-center align-items-center d-none d-md-flex">
              <Link to="/" className="navbar-brand d-flex justify-content-center align-items-center">
                <img src={logo} className="rounded w-25" alt="..." />
              </Link>
            </div>
            
            <MiniCart />
                      
          </div>
        </nav>
      </div>


      <div id='overlay' onClick={() => dispatch(closeCart())} className={`overlay ${isCartOpen ? 'd-block' : 'd-none'}`} >

      </div>

    </header>
  )
}

export default Header
