import { useState, useEffect } from "react";
import Header from "./components/header/header.tsx"
import Product from "./types/product.tsx"
import NotFound from "./views/NotFound/not-found.tsx";
import ProductsListingPage from "./views/ProductsListing/products-listing-page.tsx"
import ProductDetailsPage from "./views/product-details/product-details-page.tsx"
import { Routes, Route, useParams } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";
import Category from "./types/category.tsx";
import ErrorComponent from "./components/error/error.tsx";
import Loading from "./components/loading/loading.tsx";

const dummmyProducts: Product[] = [
];

const App = () =>{
  
  const query = gql`
    query {
      categories{
          id
          name
          products {
              id
              name
              description
              prices {
                  currency
                  price
                  symbol
                  id
              }
              images {
                id
                url
            }
            attributes {
                id
                name
                type
                values {
                    id
                    displayValue
                    value
                }
            }
          }
      }
  }`;

  const [currentCategory, setCutrentCategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>(dummmyProducts);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const { data, error, loading } = useQuery(query);

  useEffect(() =>
  {
    
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
        (category: Category) => category.name === currentCategory
      );

      if (selectedCategory) {
        HandleProductsChange(selectedCategory.products);
      } else {
        setProducts([]); // fallback if category not found
      }
      setIsLoading(false);
    }
  }, [data, error, loading, currentCategory]);

  return (
    <>
      <Header onCategoryChange={HandleChangeCategory} currentCategory={currentCategory} categories={data ? data.categories : []} />
      {isError && <ErrorComponent />} 
      {isLoading && <Loading />}
      <div id="overlayz">
        <Routes>
          <Route path="/" element={<ProductsListingPage products={products} categoryName={currentCategory} error={isError} />} />
          <Route path="/product/:id" element={<ProductDetailRoute products={products} /> } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};


const ProductDetailRoute = ({ products }: { products: Product[] }) => {
    const { id } = useParams();  // Get the id from the URL

    // Find the product matching the id from the URL
    const product = products.find(product => product.id === id);

    if (!product) {
        return <div>Product not found!</div>;
    }

    return <ProductDetailsPage product={product} />;
};

export default App;
