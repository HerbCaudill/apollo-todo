import gql from 'graphql-tag'

import { GET_TODOS } from '.'

export const defaults = {
  todos: [
    { id: 1, text: 'one', completed: false, __typename: 'TodoItem' },
    { id: 2, text: 'two', completed: true, __typename: 'TodoItem' },
    { id: 3, text: 'three', completed: false, __typename: 'TodoItem' },
  ],
  filter: 'SHOW_ALL',
}

let nextTodoId = 100

export const resolvers = {
  Mutation: {
    setFilter: (_, { filter }, { cache }) => {
      const newFilter = { filter, __typename: 'Filter' }
      cache.writeData({ data: newFilter })
      return newFilter
    },

    addTodo: (_, { text }, { cache }) => {
      const previous = cache.readQuery({ query: GET_TODOS })
      const newTodo = {
        id: nextTodoId++,
        text,
        completed: false,
        __typename: 'TodoItem',
      }
      const todos = previous.todos.concat([newTodo])
      cache.writeData({ data: { todos } })
      return newTodo
    },

    toggleTodo: (_, variables, { cache }) => {
      const id = `TodoItem:${variables.id}`
      const fragment = gql`
        fragment completeTodo on TodoItem {
          completed
        }
      `
      const todo = cache.readFragment({ fragment, id })
      const data = { ...todo, completed: !todo.completed }
      cache.writeData({ id, data })
      return null
    },

    destroyTodo: (_, variables, { cache }) => {
      const previous = cache.readQuery({ query: GET_TODOS })
      const data = { todos: previous.todos.filter(d => d.id !== variables.id) }
      cache.writeData({ data })
      return null
    },

    editTodo: (_, variables, { cache }) => {
      const id = `TodoItem:${variables.id}`
      const fragment = gql`
        fragment todoText on TodoItem {
          text
        }
      `
      const todo = cache.readFragment({ fragment, id })
      const data = { ...todo, text: variables.text }
      cache.writeData({ id, data })
      return null
    },
  },
}