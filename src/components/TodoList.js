import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import { GET_STATE } from '../graphql'
import { applyFilter } from '../lib'
import Todo from './Todo'

const TodoList = () => {
  const { data } = useQuery(GET_STATE)
  const { todos, filter } = data
  const filteredTodos = applyFilter(todos, filter)

  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <Todo key={todo.id} {...todo} />
      ))}
    </ul>
  )
}

export default TodoList
