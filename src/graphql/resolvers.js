import { GET_STATE, TODO_FRAGMENT } from '.'

let nextTodoId = 100

export const resolvers = {
  Mutation: {
    setFilter: (_, { filter }, { cache }) => {
      const newFilter = { filter, __typename: 'Filter' }
      cache.writeData({ data: newFilter })
    },

    addTodo: (_, { text }, { cache }) => {
      const { todos: prevTodos } = cache.readQuery({ query: GET_STATE })
      const newTodo = {
        id: nextTodoId++,
        text,
        completed: false,
        __typename: 'TodoItem',
      }
      const todos = prevTodos.concat([newTodo])
      cache.writeData({ data: { todos } })
      return newTodo
    },

    destroyTodo: (_, variables, { cache }) => {
      const { todos: prevTodos } = cache.readQuery({ query: GET_STATE })
      const todos = prevTodos.filter(d => d.id !== variables.id)
      cache.writeData({ data: { todos } })
    },
    editTodo: (_, variables, { cache }) => {
      const id = `TodoItem:${variables.id}`
      const oldTodo = cache.readFragment({ fragment: TODO_FRAGMENT, id })
      const todo = { ...oldTodo, text: variables.text }
      cache.writeFragment({ id, fragment: TODO_FRAGMENT, data: todo })
    },

    toggleTodo: (_, variables, { cache }) => {
      const id = `TodoItem:${variables.id}`
      const oldTodo = cache.readFragment({ fragment: TODO_FRAGMENT, id })
      const data = { ...oldTodo, completed: !oldTodo.completed }
      cache.writeFragment({ id, fragment: TODO_FRAGMENT, data })
    },

    destroyCompleted: (_, variables, { cache }) => {
      const { todos: prevTodos } = cache.readQuery({ query: GET_STATE })
      const todos = prevTodos.filter(d => !d.completed)
      cache.writeData({ data: { todos } })
    },
  },
}
