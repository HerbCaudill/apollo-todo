import cn from 'classnames'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import { GET_STATE } from '../graphql'
import AddTodo from './AddTodo'
import { ClearCompleted } from './ClearCompleted'
import { Count } from './Count'
import { Filters } from './Filters'
import TodoList from './TodoList'

const App = () => {
  const { data } = useQuery(GET_STATE)
  const isEmpty = data.todos.length === 0
  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <section className={cn({ main: true, hidden: isEmpty })}>
        <TodoList />
      </section>
      <footer className={cn({ footer: true, hidden: isEmpty })}>
        <Count />
        <Filters />
        <ClearCompleted />
      </footer>
    </div>
  )
}

export default App
