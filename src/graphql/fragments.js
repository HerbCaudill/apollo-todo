import gql from 'graphql-tag'

export const TODO_FRAGMENT = gql`
  fragment text on TodoItem {
    id
    text
    completed
  }
`
