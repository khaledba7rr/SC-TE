import { useState, useEffect, useCallback } from 'react';
import Header from './components/header/header.tsx';
import Product from './types/product.tsx';
import NotFound from './views/NotFound/not-found.tsx';
import ProductsListingPage from './views/ProductsListing/products-listing-page.tsx';
import ProductDetailsPage from './views/product-details/product-details-page.tsx';
import { Routes, Route, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Category from './types/category.tsx';
import ErrorComponent from './components/error/error.tsx';
import Loading from './components/loading/loading.tsx';
import { categoriesQuery } from './constants/graphql-queries.ts';

import ToasterNotifier from './components/toast-notifier/toast-notifier.tsx';

import {
  setAllProducts,
} from './store/cart-slice.ts';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/index.ts';

const dummmyProducts: Product[] = [];

const App = () => {
  const [currentCategory, setCutrentCategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>(dummmyProducts);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [showErrorNotifierMessage, setShowErrorNotifierMessage] =
    useState<boolean>(false);
  const [showSuccessNotifierMessage, setShowSuccessNotifierMessage] =
    useState<boolean>(false);

  const orderProcessFailed = useSelector(
    (state: RootState) => state.cart.orderProcessFailed,
  );
  const orderProcessSuccess = useSelector(
    (state: RootState) => state.cart.orderProcessSuccess,
  );

  const dispatch = useDispatch();

  const handleSetError = (value: boolean) => {
    setIsError(value);
  };

  const handleSetLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const handleChangeCategory = (selectedCategoryName: string) => {
    setCutrentCategory(selectedCategoryName);
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

  const { data, error, loading } = useQuery(categoriesQuery);

  useEffect(() => {
    setShowErrorNotifierMessage(orderProcessFailed);
    setShowSuccessNotifierMessage(orderProcessSuccess);

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
      setIsLoading(false);
    }
  }, [
    data,
    error,
    loading,
    currentCategory,
    handleSaveAllProductsInState,
    orderProcessFailed,
    orderProcessSuccess,
  ]);

  return (
    <>
      <Header
        onCategoryChange={handleChangeCategory}
        currentCategory={currentCategory}
        categories={data ? data.categories : []}
      />
      {isError && <ErrorComponent />}
      {isLoading && <Loading />}
      <Routes>
        <Route
          path="/"
          element={
            <ProductsListingPage
              products={products}
              categoryName={currentCategory}
              error={isError}
            />
          }
        />
        <Route
          path="/product/:id"
          element={<ProductDetailRoute products={products} />}
        />

        <Route path="*" element={<NotFound />} />
        <Route
          path="/:categoryName"
          element={
            <ProductsListingPage
              products={products}
              categoryName={currentCategory}
              error={isError}
            />
          }
        />
      </Routes>
      <div>
        {showErrorNotifierMessage && (
          <ToasterNotifier
            title="Couldn't create the order !"
            messageDetails="An error occurred while creating the order."
            isSuccess={false}
          />
        )}
        {showSuccessNotifierMessage && (
          <ToasterNotifier
            title="Order created successfully !"
            messageDetails="Your order has been created successfully."
            isSuccess={true}
          />
        )}
      </div>
    </>
  );
};

const ProductDetailRoute = ({ products }: { products: Product[] }) => {
  const { id } = useParams();

  const product = products.find(product => product.id === id);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return <ProductDetailsPage product={product} />;
};

export default App;
