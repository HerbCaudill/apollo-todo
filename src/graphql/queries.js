import gql from 'graphql-tag';

export const GET_STATE = gql`
  {
    todos @client {
      id
      completed
      text
    }
    filter @client
  }
`;
