import { uuid } from '../utils'
import { GET_STATE, TODO_FRAGMENT } from './queries'

export const resolvers = {
  Mutation: {
    setFilter: (_, { filter }, { cache }) => {
      const newFilter = { filter, __typename: 'Filter' }
      cache.writeData({ data: newFilter })
    },

    addTodo: (_, { text }, { cache }) => {
      // get the prior list of todos
      const { todos: prevTodos } = cache.readQuery({ query: GET_STATE })
      // build a new todo
      const newTodo = {
        id: uuid(),
        text,
        completed: false,
        __typename: 'TodoItem',
      }
      // add it to the list
      const todos = prevTodos.concat([newTodo])
      // replace the whole array in our state
      cache.writeData({ data: { todos } })
      return newTodo
    },

    destroyTodo: (_, vars, { cache }) => {
      // get the prior list of todos
      const { todos: oldTodos } = cache.readQuery({ query: GET_STATE })
      // filter out the deleted todo
      const todos = oldTodos.filter(d => d.id !== vars.id)
      // replace the whole array in our state
      cache.writeData({ data: { todos } })
    },

    editTodo: (_, vars, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'TodoItem', id: vars.id })
      const oldTodo = cache.readFragment({ id, fragment: TODO_FRAGMENT })
      const todo = { ...oldTodo, text: vars.text }
      cache.writeFragment({ id, fragment: TODO_FRAGMENT, data: todo })
    },

    toggleTodo: (_, vars, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'TodoItem', id: vars.id })
      const oldTodo = cache.readFragment({ id, fragment: TODO_FRAGMENT })
      const data = { ...oldTodo, completed: !oldTodo.completed }
      cache.writeFragment({ id, fragment: TODO_FRAGMENT, data })
    },

    destroyCompleted: (_, vars, { cache }) => {
      const { todos: prevTodos } = cache.readQuery({ query: GET_STATE })
      const todos = prevTodos.filter(d => !d.completed)
      cache.writeData({ data: { todos } })
    },
  },
}
