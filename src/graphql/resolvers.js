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
      // filter out the deleted todo into a new array
      const todos = oldTodos.filter(d => d.id !== vars.id)
      // replace the whole array in our state
      cache.writeData({ data: { todos } })
    },

    editTodo: (_, { id, text }, context) => {
      // look up the todo
      const oldTodo = getTodo(id, context)
      // make a new todo with the new text
      const todo = { ...oldTodo, text }
      // write it back to the cache
      setTodo(todo, context)
    },

    toggleTodo: (_, { id }, context) => {
      // look up the todo
      const oldTodo = getTodo(id, context)
      // make a new todo with the opposite completed state
      const todo = { ...oldTodo, completed: !oldTodo.completed }
      // write it back to the cache
      setTodo(todo, context)
    },

    destroyCompleted: (_, vars, { cache }) => {
      // get the prior list of todos
      const { todos: prevTodos } = cache.readQuery({ query: GET_STATE })
      // make a new array without the completed items
      const todos = prevTodos.filter(d => !d.completed)
      // replace the whole array in state
      cache.writeData({ data: { todos } })
    },
  },
}

const getTodo = (id, { getCacheKey, cache }) => {
  // readFragment takes an id in the form 'TodoItem:123'
  const key = getCacheKey({ __typename: 'TodoItem', id })
  return cache.readFragment({ id: key, fragment: TODO_FRAGMENT })
}

const setTodo = (todo, { getCacheKey, cache }) => {
  const key = getCacheKey({ __typename: 'TodoItem', id: todo.id })
  cache.writeFragment({ id: key, fragment: TODO_FRAGMENT, data: todo })
}
