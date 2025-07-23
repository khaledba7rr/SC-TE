import React from 'react';
import Product from '../../types/product.tsx';
import './products-listing-page.scss';
import ProductCard from '../../components/product-card/product-card.tsx';
import Error from '../../components/error/error.tsx';

import image from '../../../public/khaled-ba7r-profile.jpg';

interface ProductsListingProps {
  products: Product[];
  categoryName: string;
  error: boolean;
}

const ProductsListingPage: React.FC<ProductsListingProps> = ({
  products,
  categoryName,
  error,
}) => {
  {
    if (error) return <Error />;
  }
  return (
    <>
      <div id="main-container" className="products-listing">
        <h1 className="category-title-plp mb-5">{categoryName}</h1>
        <div className="products-container my-5 px-3 row row-cols-1 row-cols-lg-4 row-cols-md-2 row-cols-sm-1 g-5">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className='hero-image'>
        <img src={image} alt='khaledba7r'/>
        <caption className='hero-image-caption'>Khaled Ba7r</caption>
        <div className='caption'>
          <h2>Egyptian entrepeneur</h2>
          <p>deep cinematic portrait khaled ba7r</p>
        </div>
      </div>
    </>
    
  );
};

export default ProductsListingPage;
