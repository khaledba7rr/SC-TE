import { gql } from '@apollo/client';

export const categoriesQuery = gql`
  query {
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

export const orderQuery = gql`
  mutation CreateOrder($input: OrderInput!) {
    CreateOrder(input: $input) {
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
