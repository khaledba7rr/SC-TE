import React from 'react';
import './product-card.scss';
import Product from '../../types/product';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cart-slice.ts';
import ProductDataSelection from '../../types/product-selection';

import Loading from '../loading/loading.tsx';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { price, symbol } = product.prices[0];

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleQuickAddToCart = () => {
    const attributesWithFirstAttributeValue: {
      attribute_id: number;
      value_id: number;
    }[] = product.attributes.map(attr => ({
      attribute_id: attr.id,
      value_id: attr.values[0].id,
    }));

    let productToAddToCart: ProductDataSelection = {
      productId: product.id,
      quantity: 1,
      singleItemPrice: product.prices[0].price,
      attributes: attributesWithFirstAttributeValue,
    };

    if (product.attributes.length === 0) {
      productToAddToCart = {
        attributes: [],
        productId: product.id,
        quantity: 1,
        singleItemPrice: product.prices[0]?.price,
      };
    }

    dispatch(addItem(productToAddToCart));
  };

  return (
    <div>
      <div
        data-testid={`product-${product.name.toLowerCase().replace(/\s+/g, '-')}`}
        className={`card col p-3 ${!product.in_stock && 'out-of-stock'}`}
      >
        <Link to={`/product/${product.id}`} className="card-link">
          <div className="prod-img-container position-relative">
            {!isImageLoaded && (
              <div className="card-img-top product-card-image-loader">
                {' '}
                <Loading />{' '}
              </div>
            )}
            <img
              onLoad={() => setIsImageLoaded(true)}
              src={product.images[0].url}
              className="card-img-top"
              alt={product.name}
            />
            <div
              className={`out-of-stock-label-conatainer position-absolute ${product.in_stock ? 'd-none' : 'd-block'}`}
            >
              <p> out of stock </p>
            </div>
          </div>

          <div className="card-body position-relative">
            <h5 className="card-product-name">{product.name}</h5>
            <p className="card-product-price">
              {' '}
              <span> {symbol} </span> {price}
            </p>
            {product.in_stock && (
              <div
                className="add-to-cart-container position-absolute"
                onClick={e => {
                  e.preventDefault();
                  handleQuickAddToCart();
                }}
              >
                <button className="add-to-cart-btn">
                  <i className="bi bi-cart3 fs-3"> </i>
                </button>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
