import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import { GET_TODOS } from '../graphql'
import Todo from './Todo'

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
  const { data } = useQuery(GET_TODOS)
  const { todos, filter } = data
  return (
    <section className="main">
      <ul className="todo-list">
        {getVisibleTodos(todos, filter).map(todo => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </section>
  )
}

export default TodoList
