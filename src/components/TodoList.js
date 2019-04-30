import gql from 'graphql-tag'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import Todo from './Todo'

const GET_TODOS = gql`
  {
    todos @client {
      id
      completed
      text
    }
    visibilityFilter @client
  }
`

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const TodoList = () => {
  const { data, error, loading } = useQuery(GET_TODOS)
  const { todos, visibilityFilter } = data
  if (loading) {
  }
  if (error) {
  }
  return (
    <section className="main">
      <ul className="todo-list">
        {getVisibleTodos(todos, visibilityFilter).map(todo => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </section>
  )
}

export default TodoList
