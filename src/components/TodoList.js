import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import { GET_STATE } from '../graphql'
import { applyFilter } from '../utils'
import Todo from './Todo'

const TodoList = () => {
  const { data } = useQuery(GET_STATE)
  const { todos, filter } = data
  return (
    <section className="main">
      <ul className="todo-list">
        {applyFilter(todos, filter).map(todo => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </section>
  )
}

export default TodoList
