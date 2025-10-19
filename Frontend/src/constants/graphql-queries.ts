import { gql } from '@apollo/client';

export const productsQuery = gql`
  query ProductsList {
    categories {
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
  }
`;

export const categoriesQuery = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

export const singleProductQuery = gql`
  query CurrentProduct($id: String!) {
    product(id: $id) {
        id
        name
        description
        in_stock
        category_id
        brand
        prices {
            currency
            id
            price
            product_id
            symbol
        }
        images {
            id
            product_id
            url
        }
        attributes {
            id
            name
            type
            values {
                displayValue
                id
                value
            }
        }
    }
  }
`;

export const ordersQuery = gql`
  query Orders {
    orders {
      orderId
      customerName
      totalPrice
      status
      created_at
      items {
        orderItemId
        orderId
        productId
        quantity
        unitPrice
        currency
        attributes {
          attributeId
          valueId
        }
      }
    }
  }
`;

export const createOrderMutation = gql`
  mutation CreateOrder($input: OrderInput!) {
    CreateOrder(input: $input){
      orderId
      totalPrice
      status
      created_at
      items {
        orderItemId
        orderId
        productId
        quantity
        unitPrice
        currency
        attributes {
          attributeId
          valueId
        }
      }
    }
  }
`;
