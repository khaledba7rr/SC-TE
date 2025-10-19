import { useEffect, useState } from 'react';
import ProductDetail from '../../components/product-detail/product-detail';
import ErrorComponent from '../../components/error/error';
import Product from '../../types/product';
import { useQuery } from '@apollo/client';

import { singleProductQuery } from '../../constants/graphql-queries';

const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<Product>({} as Product);

  // safely read product id from the current path (guard against SSR)
  const pathProductId = typeof window !== 'undefined' ? window.location.pathname.split('/product/')[1] : '';

  // call hook at top level
  const { data, loading, error } = useQuery(singleProductQuery, {
    variables: { id: pathProductId }
  });

  // update local state when query result arrives
  useEffect(() =>
  {
    if (data?.product) {
      setProduct(data.product);
    }
  }, [data]);

  if (error) {
    return <ErrorComponent />;
  }

  if (loading || !product || Object.keys(product).length === 0) {
    return <div>Loading...</div>;
  }

  if (!product.id) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-details-container">
      <ProductDetail product={product} />
    </div>
  );
};

 export default ProductDetailsPage;
