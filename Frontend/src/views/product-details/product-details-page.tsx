import React from 'react';
import './product-details-page.scss';
import Product from '../../types/product';
import ProductDetail from '../../components/product-detail/product-detail';

interface ProductDetailsProps {
    product: Product;
}

const ProductDetailsPage: React.FC<ProductDetailsProps> = ({ product }) => {
    return (
        <div className="product-details-container">
            <ProductDetail product={product} />
        </div>
    );
};

export default ProductDetailsPage;