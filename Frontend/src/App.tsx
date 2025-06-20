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

import {
  setAllProducts,
  setOrderProccessFailed,
  setOrderProccessSuccess,
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

  const HandleSetError = (value: boolean) => {
    setIsError(value);
  };

  const HandleSetLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const HandleChangeCategory = (selectedCategoryName: string) => {
    setCutrentCategory(selectedCategoryName);
  };

  const HandleProductsChange = (products: Product[]) => {
    setProducts(products);
  };

  const HandleSaveAllProductsInState = useCallback(
    (products: Product[]) => {
      dispatch(setAllProducts(products));
    },
    [dispatch],
  );

  const { data, error, loading } = useQuery(categoriesQuery);

  type ToasterNotifierArguments = {
    title: string;
    messageDetails: string;
    isSuccess: boolean;
  };

  const ToasterNotifier: React.FC<ToasterNotifierArguments> = ({
    title,
    messageDetails,
    isSuccess,
  }) => {
    setTimeout(() => {
      HandleRemoveNotifiers();
    }, 5000);
    return (
      <div className="error-popup-container d-block">
        <div className="toast-container d-block position-fixed bottom-0 end-0 p-4">
          <div id="liveToast" className="toast d-block">
            <div
              className={`toast-header ${!isSuccess ? 'bg-danger' : 'bg-success'}`}
            >
              <i className="bi bi-exclamation-octagon-fill px-2"></i>
              <strong className="me-auto">{title}</strong>
              <small>{!isSuccess ? 'Error' : 'Success'}</small>
              <button
                type="button"
                className="btn-close"
                onClick={HandleRemoveNotifiers}
              ></button>
            </div>
            <div className="toast-body">{messageDetails}</div>
          </div>
        </div>
      </div>
    );
  };

  const HandleRemoveNotifiers = () => {
    dispatch(setOrderProccessFailed(false));
    dispatch(setOrderProccessSuccess(false));
  };

  useEffect(() => {
    setShowErrorNotifierMessage(orderProcessFailed);
    setShowSuccessNotifierMessage(orderProcessSuccess);

    if (error) {
      HandleSetError(true);
      HandleSetLoading(false);
      return;
    }

    if (loading) {
      HandleSetLoading(true);
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
        HandleSaveAllProductsInState(allCategory.products);
      }

      if (selectedCategory) {
        HandleProductsChange(selectedCategory.products);
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
    HandleSaveAllProductsInState,
    orderProcessFailed,
    orderProcessSuccess,
  ]);

  return (
    <>
      <Header
        onCategoryChange={HandleChangeCategory}
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
  const { id } = useParams(); // Get the id from the URL

  // Find the product matching the id from the URL
  const product = products.find(product => product.id === id);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return <ProductDetailsPage product={product} />;
};

export default App;
