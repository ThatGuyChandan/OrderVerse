import { gql } from '@apollo/client';

export const GET_RESTAURANTS_QUERY = gql`
  query GetRestaurants {
    restaurants {
      id
      name
      address
    }
  }
`;

export const GET_RESTAURANT_MENU_QUERY = gql`
  query GetRestaurantMenu($restaurantId: Int!) {
    restaurant(id: $restaurantId) {
      id
      name
      menu {
        id
        name
        price
        description
      }
    }
  }
`;

export const GET_ORDERS_QUERY = gql`
  query GetOrders {
    orders {
      id
      status
      total
      createdAt
      orderItems {
        id
        quantity
        menuItem {
          name
          price
        }
      }
    }
  }
`;

export const GET_PAYMENT_METHODS_QUERY = gql`
  query GetPaymentMethods {
    paymentMethods {
      id
      name
      enabled
    }
  }
`;
