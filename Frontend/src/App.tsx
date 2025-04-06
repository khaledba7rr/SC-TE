import Header from "./components/header/header.tsx"
import Product from "./types/product.tsx"
import NotFound from "./views/NotFound/not-found.tsx";
import ProductsListingPage from "./views/ProductsListing/products-listing-page.tsx"
import ProductDetailsPage from "./views/product-details/product-details-page.tsx"
import {Routes, Route } from 'react-router-dom';

function App() {

  const currentCategory = "Wat"

  const products : Product[] = [
    {
      id: "PROD01",
      brand : "Brand 1",
      name: "Product 1",
      in_stock : true,
      prices: [{
        id: 1,
        price: 10.99,
        currency: "USD",
        symbol : "$",
      }],
      description: "Description for Product 1",
      images: [
        {
          id: 1,
          imageUrl: "https://picsum.photos/200/300",
        },
        {
          id: 2,
          imageUrl: "https://picsum.photos/100/200",
        },
        {
          id: 3,
          imageUrl: "https://picsum.photos/300/400",
        }
      ],
      categoryId: 1,
      attributes: [
        {
          id: 1,
          name: "Attribute 1",
          type : "text",
          values: [
            {
              id: 1,
              value: "Value 1",
              displayValue : "Display1",
            },
            {
              id: 2,
              value: "Value 2",
              displayValue : "Display1",
            }
          ],
        },
        {
          id: 2,
          name: "Color",
          type : "swatch",
          values: [
            {
              id: 1,
              value: "#FF0000",
              displayValue : "Red",
            },
            {
              id: 2,
              value: "#00FF00",
              displayValue : "Col",
            }
          ],
        },
      ],
      category: {
        id: 1,
        name: "Category 1",
      }
    },
    {
      id: "PROD02",
      brand : "Brand 2",
      name: "Product 2",
      in_stock : true,
      prices: [{
        id: 1,
        price: 10.99,
        currency: "USD",
        symbol : "$",
      }],
      description: "Description for Product 1",
      images: [
        {
          id: 1,
          imageUrl: "https://picsum.photos/200/300",
        },
        {
          id: 2,
          imageUrl: "https://picsum.photos/200/300",
        },
        {
          id: 3,
          imageUrl: "https://picsum.photos/200/300",
        }
      ],
      categoryId: 1,
      attributes: [
        {
          id: 1,
          name: "Attribute 1",
          type : "text",
          values: [
            {
              id: 1,
              value: "Value 1",
              displayValue : "Display Value 1",
            },
            {
              id: 2,
              value: "Value 2",
              displayValue : "Display Value 2",
            }
          ],
        },
      ],
      category: {
        id: 1,
        name: "Category 1",
      }
    },
        {
      id: "PROD03",
      brand : "Brand 1",
      name: "Product 1",
      in_stock : true,
      prices: [{
        id: 1,
        price: 10.99,
        currency: "USD",
        symbol : "$",
      }],
      description: "Description for Product 1",
      images: [
        {
          id: 1,
          imageUrl: "https://picsum.photos/200/300",
        },
        {
          id: 2,
          imageUrl: "https://picsum.photos/200/300",
        },
        {
          id: 3,
          imageUrl: "https://picsum.photos/200/300",
        }
      ],
      categoryId: 1,
      attributes: [
        {
          id: 1,
          name: "Attribute 1",
          type : "text",
          values: [
            {
              id: 1,
              value: "Value 1",
              displayValue : "Display Value 1",
            },
            {
              id: 2,
              value: "Value 2",
              displayValue : "Display Value 2",
            }
          ],
        },
      ],
      category: {
        id: 1,
        name: "Category 1",
      }
    },
    {
      id: "PROD02",
      brand : "Brand 6",
      name: "Product 6",
      in_stock : true,
      prices: [{
        id: 1,
        price: 10.99,
        currency: "USD",
        symbol : "$",
      }],
      description: "Description for Product 1",
      images: [
        {
          id: 1,
          imageUrl: "https://picsum.photos/200/300",
        },
        {
          id: 2,
          imageUrl: "https://picsum.photos/200/300",
        },
        {
          id: 3,
          imageUrl: "https://picsum.photos/200/300",
        }
      ],
      categoryId: 1,
      attributes: [
        {
          id: 1,
          name: "Attribute 1",
          type : "text",
          values: [
            {
              id: 1,
              value: "Value 1",
              displayValue : "Display Value 1",
            },
            {
              id: 2,
              value: "Value 2",
              displayValue : "Display Value 2",
            }
          ],
        },
      ],
      category: {
        id: 1,
        name: "Category 1",
      }
    },
        {
      id: "PROD04",
      brand : "Brand 3",
      name: "Product 3",
      in_stock : false,
      prices: [{
        id: 1,
        price: 10.99,
        currency: "USD",
        symbol : "$",
      }],
      description: "Description for Product 1",
      images: [
        {
          id: 1,
          imageUrl: "https://picsum.photos/200/300",
        },
        {
          id: 2,
          imageUrl: "https://picsum.photos/200/300",
        },
        {
          id: 3,
          imageUrl: "https://picsum.photos/200/300",
        }
      ],
      categoryId: 1,
      attributes: [
        {
          id: 1,
          name: "Attribute 1",
          type : "text",
          values: [
            {
              id: 1,
              value: "Value 1",
              displayValue : "Display Value 1",
            },
            {
              id: 2,
              value: "Value 2",
              displayValue : "Display Value 2",
            }
          ],
        },
      ],
      category: {
        id: 1,
        name: "Category 1",
      }
    },
    {
      id: "PROD05",
      brand : "Brand 5",
      name: "Product 5",
      in_stock : true,
      prices: [{
        id: 1,
        price: 10.99,
        currency: "USD",
        symbol : "$",
      }],
      description: "Description for Product 1",
      images: [
        {
          id: 1,
          imageUrl: "https://picsum.photos/200/300",
        },
        {
          id: 2,
          imageUrl: "https://picsum.photos/200/300",
        },
        {
          id: 3,
          imageUrl: "https://picsum.photos/200/300",
        }
      ],
      categoryId: 1,
      attributes: [
        {
          id: 1,
          name: "Attribute 1",
          type : "text",
          values: [
            {
              id: 1,
              value: "Value 1",
              displayValue : "Display Value 1",
            },
            {
              id: 2,
              value: "Value 2",
              displayValue : "Display Value 2",
            }
          ],
        },
      ],
      category: {
        id: 1,
        name: "Category 1",
      }
    },
    // Add more products as needed
  ]

  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<ProductsListingPage products={products} categoryName={currentCategory} />} />
            <Route path="/product/:id" element={<ProductDetailsPage product={products[0]} />} />
            <Route path="*" element={<NotFound />} />
        
        </Routes>
    </>
  )
}

export default App;
