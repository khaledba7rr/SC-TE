import Product from '../../types/product.tsx';
import './products-listing-page.scss';
import ProductCard from '../../components/product-card/product-card.tsx';
import Error from '../../components/error/error.tsx';
import { productsByCategoryQuery } from '../../constants/graphql-queries.ts';
import Category from '../../types/category.tsx';

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import Loading from '../../components/loading/loading.tsx';
import { useParams } from 'react-router-dom';
import { getCategoryObjectByName } from '../../constants/helpers.ts';

interface ProductsListingProps {
  currentCategory?: Category;
  setCurrentCategory?: (category: Category) => void;
}

const ProductsListingPage: React.FC<ProductsListingProps> = ({
  currentCategory , setCurrentCategory
}) => {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { categoryName } = useParams<{ categoryName : string }>();


  const handleSetError = (value: boolean) => {
    setIsError(value);
  };

  const handleSetLoading = (value: boolean) => {
    setIsLoading(value);
  };

    const handleProductsChange = (products: Product[]) => {
    setProducts(products);
  };

  const { data, error, loading } = useQuery(productsByCategoryQuery, {
    variables: { id: currentCategory?.id || 1 },
  });

  useEffect(() => {
    if (error) {
      handleSetError(true);
      handleSetLoading(false);
      return;
    }

    if (loading) {
      handleSetLoading(true);
      return;
    }
      
      const currentCategoryBasedOnPath = getCategoryObjectByName(categoryName || 'all');
    
      if (currentCategoryBasedOnPath.id !== currentCategory?.id)
      {
        setCurrentCategory?.(currentCategoryBasedOnPath);    
      }
      
      const allProducts: Product[] = data.productsByCategoryId || [];

      handleProductsChange(allProducts);
      
      handleSetLoading(false);
  }, [
    data,
    error,
    loading,
    currentCategory,
    products,
    handleProductsChange,
    setCurrentCategory]);

  if (isError) return <Error />;

  if (isLoading) return <Loading />;

  return (
      <div id="main-container" className="products-listing">
        <h1 className="category-title-plp mb-5">{currentCategory?.name}</h1>
        <div className="products-container my-5 px-3 row row-cols-1 row-cols-lg-4 row-cols-md-2 row-cols-sm-1 g-5">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
  );
};

export default ProductsListingPage;
