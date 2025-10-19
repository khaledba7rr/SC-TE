import Product from '../../types/product.tsx';
import './products-listing-page.scss';
import ProductCard from '../../components/product-card/product-card.tsx';
import Error from '../../components/error/error.tsx';
import { productsQuery } from '../../constants/graphql-queries.ts';
import Category from '../../types/category.tsx';

import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';

import {
  setAllProducts,
} from '../../store/cart-slice.ts';
import Loading from '../../components/loading/loading.tsx';

interface ProductsListingProps {
  onFetchingCategories?: (categories: Category[]) => void;
  currentCategory?: string;
}

const dummmyProducts: Product[] = [];

const ProductsListingPage: React.FC<ProductsListingProps> = ({
  onFetchingCategories,
  currentCategory
}) => {
  
  const [products, setProducts] = useState<Product[]>(dummmyProducts);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const handleSetError = (value: boolean) => {
    setIsError(value);
  };

  const handleSetLoading = (value: boolean) => {
    setIsLoading(value);
  };

    const handleProductsChange = (products: Product[]) => {
    setProducts(products);
  };

  const handleSaveAllProductsInState = useCallback(
    (products: Product[]) => {
      dispatch(setAllProducts(products));
    },
    [dispatch],
  );

  

  const { data, error, loading } = useQuery(productsQuery);

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

    if (data) {
      const selectedCategory = data.categories.find(
        (category: Category) => category.name === currentCategory,
      );

      const allCategory = data.categories.find(
        (category: Category) => category.name === 'all',
      );

      if (allCategory) {
        handleSaveAllProductsInState(allCategory.products);
      }

      if (selectedCategory) {
        handleProductsChange(selectedCategory.products);
      } else {
        setProducts([]); // fallback if category not found
      }
      onFetchingCategories && onFetchingCategories(data.categories);
      setIsLoading(false);
    }
  }, [
    data,
    error,
    loading,
    currentCategory,
    handleSaveAllProductsInState,
  ]);

  if (isError) return <Error />;

  if (isLoading) return <Loading />;

  return (
      <div id="main-container" className="products-listing">
        <h1 className="category-title-plp mb-5">{currentCategory}</h1>
        <div className="products-container my-5 px-3 row row-cols-1 row-cols-lg-4 row-cols-md-2 row-cols-sm-1 g-5">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
  );
};

export default ProductsListingPage;
