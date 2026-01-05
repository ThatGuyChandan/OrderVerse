import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($name: String!) {
    login(loginInput: { name: $name }) {
      access_token
    }
  }
`;
