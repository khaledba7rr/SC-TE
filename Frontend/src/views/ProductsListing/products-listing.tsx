import React from 'react';
import Product from '../../types/product';
import './products-listing.scss';
import ProductCard from '../../components/product-card/product-card.tsx';

interface ProductsListingProps {
    products: Product[];
    categoryName: string;
}

const ProductsListing: React.FC<ProductsListingProps> = ({ products, categoryName }) => {
    return (
        <div id='main-container' className="products-listing">
            <h1 className='category-title-plp mb-5'>{categoryName}</h1>
            <div className='products-container my-5 px-3 row row-cols-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-5'>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsListing;