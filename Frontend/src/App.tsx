import { useState, useEffect } from 'react';
import Header from './components/header/header';
import NotFound from './views/NotFound/not-found';
import ProductsListingPage from './views/ProductsListing/products-listing-page';
import ProductDetailsPage from './views/product-details/product-details-page';
import { Routes, Route } from 'react-router-dom';

import ToasterNotifier from './components/toast-notifier/toast-notifier';

import { useSelector } from 'react-redux';
import { RootState } from './store/index';
import Category from './types/category';
import { defaultCategory } from './constants/helpers';

const App = () => {
  const [currentCategory, setCutrentCategory] =
    useState<Category>(defaultCategory);
  const [showErrorNotifierMessage, setShowErrorNotifierMessage] =
    useState<boolean>(false);
  const [showSuccessNotifierMessage, setShowSuccessNotifierMessage] =
    useState<boolean>(false);

  const orderProcessFailed = useSelector(
    (state: RootState) => state.cart.orderProcessFailed
  );
  const orderProcessSuccess = useSelector(
    (state: RootState) => state.cart.orderProcessSuccess
  );

  const handleChangeCategory = (selectedCategory: Category) => {
    setCutrentCategory(selectedCategory);
  };

  useEffect(() => {
    setShowErrorNotifierMessage(orderProcessFailed);
    setShowSuccessNotifierMessage(orderProcessSuccess);
  }, [orderProcessFailed, orderProcessSuccess, setCutrentCategory]);

  return (
    <>
      <Header
        onCategoryChange={(category: Category) =>
          handleChangeCategory(category)
        }
        currentCategory={currentCategory}
      />
      <Routes>
        <Route
          path="/"
          element={<ProductsListingPage currentCategory={currentCategory} />}
        />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />

        <Route path="*" element={<NotFound />} />
        <Route
          path="/:categoryName"
          element={
            <ProductsListingPage
              currentCategory={currentCategory}
              setCurrentCategory={handleChangeCategory}
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
