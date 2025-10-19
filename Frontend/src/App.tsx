import { useState, useEffect } from 'react';
import Header from './components/header/header.tsx';
import NotFound from './views/NotFound/not-found.tsx';
import ProductsListingPage from './views/ProductsListing/products-listing-page.tsx';
import ProductDetailsPage from './views/product-details/product-details-page.tsx';
import { Routes, Route } from 'react-router-dom';

import ToasterNotifier from './components/toast-notifier/toast-notifier.tsx';

import { useSelector } from 'react-redux';
import { RootState } from './store/index.ts';

const App = () => {
  const [currentCategory, setCutrentCategory] = useState<string>('all');
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

  const handleChangeCategory = (selectedCategoryName: string) =>
  {
    setCutrentCategory(selectedCategoryName);
  };

  const handleCategorySelectionAfterPageReload = () => {
    const pathCategory = window.location.pathname.slice(1) || 'all';
    setCutrentCategory(pathCategory);
  };

  useEffect(() => {
    setShowErrorNotifierMessage(orderProcessFailed);
    setShowSuccessNotifierMessage(orderProcessSuccess);

    handleCategorySelectionAfterPageReload();
  }, [
    orderProcessFailed,
    orderProcessSuccess,
  ]);

  return (
    <>
      <Header
        onCategoryChange={handleChangeCategory}
        currentCategory={currentCategory}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProductsListingPage
              currentCategory={currentCategory}
            />
          }
        />
        <Route
          path="/product/:id"
          element={<ProductDetailsPage />}
        />

        <Route path="*" element={<NotFound />} />
        <Route
          path="/:categoryName"
          element={
            <ProductsListingPage
              currentCategory={currentCategory}
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

export default App;
