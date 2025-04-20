import React from 'react';
import './product-card.scss';
import Product from '../../types/product';
import { Link } from 'react-router-dom';


import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cart-slice.ts';
import ProductDataSelection from '../../types/product-selection';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) =>
{
    const price = product.prices[0].price;
    const symbol = product.prices[0].symbol;


    const dispatch = useDispatch();

    const HandleQuickAddToCart = () =>
    {

        const attributesWithFirstAttributeValue: {
        attribute_id: number;
        value_id: number;
        }[] = product.attributes.map((attr) => ({ attribute_id: attr.id, value_id: attr.values[0].id }))

        console.log(attributesWithFirstAttributeValue);

        let productToAddToCart: ProductDataSelection = {
            productId: product.id,
            quantity: 1,
            singleItemPrice: product.prices[0].price,
            attributes: attributesWithFirstAttributeValue
        };

        if (product.attributes.length === 0)
        {
            productToAddToCart = {
                attributes: [],
                productId: product.id,
                quantity: 1,
                singleItemPrice : product.prices[0]?.price
            }
        }

        dispatch(addItem(productToAddToCart));
    }

    return (
        <div>
            <div data-testid={`product-${product.name.toLowerCase().replace(/\s+/g, "-")}`} className={`card col p-3 ${!product.in_stock && 'out-of-stock' }`} >
                <Link to={`/product/${product.id}`} className="card-link">
                    
                    <div className='prod-img-container position-relative'>
                        <img src={product.images[0].url} className="card-img-top" alt={product.name} />
                        <div className={`out-of-stock-label-conatainer position-absolute ${product.in_stock ? 'd-none' : 'd-block'}`}>
                            <p> out of stock  </p>
                        </div>
                    </div>

                    <div className="card-body position-relative">
                        <h5 className="card-product-name">{ product.name}</h5>
                        <p className="card-product-price"> <span> {symbol} </span> {price}</p>
                        {product.in_stock && 
                            <div className='add-to-cart-container position-absolute' onClick={(e) => { e.preventDefault(); HandleQuickAddToCart() }}>
                            <button className='add-to-cart-btn'>
                                <i className="bi bi-cart3 fs-3"> </i>
                            </button>
                        </div>
                        }
                    </div>

                </Link>
            </div>
        </div>

    );
};

export default ProductCard;