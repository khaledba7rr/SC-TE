import { gql } from "@apollo/client";


  export const categoriesQuery = gql`
    query {
      categories{
          id
          name
          products {
              id
              name
              description
              in_stock
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