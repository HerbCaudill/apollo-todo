import gql from 'graphql-tag'

// These are the GraphQL requests available to code that needs to read or write state.
// Note the `@client` keyword everywhere, indicating that all of these operate on local state.

// Mutations

// Each of these has a corresponding mutation in `resolvers.js`

export const SET_FILTER = gql`
  mutation($filter: Filter!) {
    setFilter(filter: $filter) @client
  }
`

export const ADD_TODO = gql`
  mutation($text: String!) {
    addTodo(text: $text) @client {
      id # return value
    }
  }
`

export const DESTROY_TODO = gql`
  mutation($id: Int!) {
    destroyTodo(id: $id) @client
  }
`

export const EDIT_TODO = gql`
  mutation($id: Int!, $text: String!) {
    editTodo(id: $id, text: $text) @client
  }
`

export const TOGGLE_TODO = gql`
  mutation($id: Int!) {
    toggleTodo(id: $id) @client
  }
`

export const DESTROY_COMPLETED = gql`
  mutation {
    destroyCompleted @client
  }
`

// Queries

// Doesn't need a resolver because magic
export const GET_STATE = gql`
  query getState {
    todos @client {
      id
      completed
      text
    }
    filter @client
  }
`

// Fragments

// Just the one - used by editTodo and toggleTodo
export const TODO_FRAGMENT = gql`
  fragment todoItem on TodoItem {
    text
    completed
  }
`
