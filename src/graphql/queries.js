import gql from 'graphql-tag'

export const GET_FILTER = gql`
  {
    filter @client
  }
`

export const GET_TODOS = gql`
  {
    todos @client {
      id
      completed
      text
    }
    filter @client
  }
`
