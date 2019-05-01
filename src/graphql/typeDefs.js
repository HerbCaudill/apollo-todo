import gql from 'graphql-tag'

export const typeDefs = gql`
  enum Filter {
    SHOW_ALL
    SHOW_ACTIVE
    SHOW_COMPLETED
  }

  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }
`
