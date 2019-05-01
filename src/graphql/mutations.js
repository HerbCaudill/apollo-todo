import gql from 'graphql-tag'

export const SET_FILTER = gql`
  mutation setFilter($filter: Filter!) {
    setFilter(filter: $filter) @client
  }
`
export const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) @client {
      id
    }
  }
`

export const DESTROY_TODO = gql`
  mutation DestroyTodo($id: Int!) {
    destroyTodo(id: $id) @client
  }
`

export const EDIT_TODO = gql`
  mutation EditTodo($id: Int!, $text: String!) {
    editTodo(id: $id, text: $text) @client
  }
`
export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`
