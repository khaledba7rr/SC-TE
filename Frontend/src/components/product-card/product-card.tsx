import React from 'react';
import './product-card.scss';
import Product from '../../types/product';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) =>
{
    const price = product.prices[0].price;
    const symbol = product.prices[0].symbol;

    return (
        <div>
            <div className="card col p-3" >
                <img src={ product.images[0].imageUrl} className="card-img-top img-thumbnail" alt={product.name} />
                <div className="card-body">
                    <h5 className="card-product-name">{ product.name}</h5>
                    <p className="card-product-price"> <span> {symbol} </span> { price }</p>
                </div>
            </div>
        </div>

    );
};

export default ProductCard;