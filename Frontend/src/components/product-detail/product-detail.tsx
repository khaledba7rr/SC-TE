import React, { useState } from 'react';
import './product-detail.scss';
import Product from '../../types/product';
import Loading from '../loading/loading';
import parse from 'html-react-parser';

import AttributeValues from '../attribute-values/attribute-values';
import { useDispatch } from 'react-redux';
import { addItem, openCart } from '../../store/cart-slice.ts';
import ProductDataSelection from '../../types/product-selection.tsx';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) =>
{
  
  if (!product || Object.keys(product).length === 0) {
    return <div>Loading...</div>;
  }

  const { price, symbol } = product?.prices?.[0] ?? { price: 0, symbol: '' };
  const { name, description } = product ?? { name: '', description: '' };

  const handleSetShowErrorMessage = (value: boolean) => {
    setShowErrorMessage(value);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 6000);
  };

  const [currentImageUrl, setCurrentImageUrl] = useState<string>(
    product?.images?.[0]?.url ?? '',
  );
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [productSelection, setProductSelection] = useState<
    ProductDataSelection | undefined
  >();
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleAddToCart = (
    productToAddToCart: ProductDataSelection | undefined,
  ) => {
    if (product.attributes.length === 0) {
      productToAddToCart = {
        attributes: [],
        productId: product.id,
        quantity: 1,
        singleItemPrice: product.prices[0]?.price,
      };
    }

    if (productToAddToCart === undefined) {
      handleSetShowErrorMessage(true);
      return;
    }

    if (
      productToAddToCart.attributes.length < product.attributes.length ||
      productToAddToCart.attributes.some(
        attribute => attribute.value_id === undefined,
      ) ||
      product === null
    ) {
      handleSetShowErrorMessage(true);

      return;
    }

    dispatch(addItem(productToAddToCart));
    dispatch(openCart());
  };

  const handleProductSelection = (attributeId: number, valueId: number) => {
    if (!productSelection) {
      const newProductSelection: ProductDataSelection = {
        productId: product.id,
        quantity: 1,
        attributes: [{ attribute_id: attributeId, value_id: valueId }],
        singleItemPrice: price,
      };
      setProductSelection(newProductSelection);

      return;
    }

    const existingProductSelection = productSelection?.attributes.find(
      attribute => attribute.attribute_id === attributeId,
    );

    if (existingProductSelection) {
      const updatedProductSelection = {
        ...productSelection,
        attributes: productSelection.attributes.map(attribute =>
          attribute.attribute_id === attributeId
            ? { ...attribute, value_id: valueId }
            : attribute,
        ),
        productId: product.id,
        singleItemPrice: price,
        quantity: 1,
      };

      setProductSelection(updatedProductSelection);
    } else {
      const updatedProductSelection = {
        ...productSelection,
        attributes: [
          ...productSelection.attributes,
          { attribute_id: attributeId, value_id: valueId },
        ],
        productId: product.id,
        singleItemPrice: price,
        quantity: 1,
      };

      setProductSelection(updatedProductSelection);
    }
  };

  const handleCarouselClick = (direction: 'next' | 'previous') => {
    const currentImageIndex = product.images.findIndex(
      img => img.url === currentImageUrl,
    );

    if (direction === 'next') {
      if (currentImageIndex === product.images.length - 1) {
        setCurrentImageUrl(product.images[0].url);
        return;
      }

      setCurrentImageUrl(product.images[currentImageIndex + 1].url);
    }

    if (direction === 'previous') {
      if (currentImageIndex === 0) {
        setCurrentImageUrl(product.images[product.images.length - 1].url);
        return;
      }

      setCurrentImageUrl(product.images[currentImageIndex - 1].url);
    }
  };

  return (
    <>
      <div
        id="main-container"
        className="d-flex flex-column flex-md-row justify-between-md-around my-5"
      >
        <div className="product-detail-image-container d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center col-12 col-md-8">
          <div
            className="product-images-container p-3"
            data-testid="product-gallery"
          >
            <div className="thumbs-container d-flex flex-wrap flex-md-column justify-content-end align-items-center">
              { product.images && product.images.map(image => (
                <div
                  key={image.url}
                  className={`sinlge-thumb-container ${image.url === currentImageUrl && 'selected'} thumb-image m-1`}
                  onClick={() => setCurrentImageUrl(image.url)}
                >
                  {!isImageLoaded && <Loading />}
                  <img
                    src={image.url}
                    alt={product.name}
                    onLoad={() => setIsImageLoaded(true)}
                    className="image"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="main-image p-3 w-75 d-flex justify-content-center align-items-center">
            <div className="main-image-container d-flex justify-content-center align-items-center position-relative">
              <img
                src={currentImageUrl}
                alt={product.name}
                className="main-image"
              />

                          <div
              className={`carousel-container ${((product?.images?.length ?? 0) > 1) ? 'd-block' : 'd-none'} position-absolute`}
            >
              <div className="carousel-buttons-container d-flex justify-content-between px-5">
                <button
                  onClick={() => handleCarouselClick('previous')}
                  className="p-1 border border-0"
                >
                  <i className="bi bi-chevron-compact-left fs-4"></i>
                </button>

                <button
                  onClick={() => handleCarouselClick('next')}
                  className="p-1 border border-0"
                >
                  <i className="bi bi-chevron-compact-right fs-4"></i>
                </button>
              </div>
            </div>
              
            </div>


          </div>
        </div>

        <div className="product-detail-info-container d-flex flex-column justify-content-between justify-content-md-around align-items-center align-items-md-start col-12 col-md-2">
          <div className="product-name w-100 d-flex">
            <p>{name}</p>
          </div>

          <div className="product-attributes w-100 d-flex flex-column justify-content-md-between align-items-start align-items-md-start">
            { product.attributes && product?.attributes.map(attribute => (
              <div
                key={attribute.id}
                className="my-3"
                data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="attribute-name">{attribute.name}:</div>

                <div className="attribute-values d-flex flex-wrap">
                  {
                    <AttributeValues
                      type={attribute.type}
                      attributeValues={attribute.values}
                      selectProductAttributes={handleProductSelection}
                      attribute={attribute}
                    />
                  }
                </div>
              </div>
            ))}
          </div>

          <div className="product-price w-100 d-flex flex-column">
            <p className="product-price-title">Price:</p>
            <div className="actual-price">
              {symbol} {price}
            </div>
          </div>

          <div className="product-add-to-cart-btn w-100">
            <button
              data-testid="add-to-cart"
              disabled={
                !product.in_stock ||
                (productSelection?.attributes.length ?? 0) <
                  product.attributes.length
              }
              onClick={() => handleAddToCart(productSelection)}
              className="w-100 my-5"
            >
              {product.in_stock ? 'Add to cart' : 'Out of stock'}
            </button>
          </div>

          <div
            className="product-description w-100"
            data-testid="product-description"
          >
            {parse(typeof description === 'string' ? description : '')}
          </div>
        </div>
      </div>

      <div
        className={`error-popup-container ${showErrorMessage ? 'd-block' : 'd-none'}`}
      >
        <div className="toast-container d-block position-fixed bottom-0 end-0 p-4">
          <div
            id="liveToast"
            className="toast d-block"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header bg-danger ">
              <i className="bi bi-exclamation-octagon-fill px-2"></i>
              <strong className="me-auto">Cannot add product !</strong>
              <small>Error</small>
              <button
                type="button"
                className="btn-close"
                onClick={() => handleSetShowErrorMessage(false)}
              ></button>
            </div>
            <div className="toast-body">
              You must select all product attributes in order to add it to the
              cart.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
