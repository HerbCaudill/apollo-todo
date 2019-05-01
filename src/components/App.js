import cn from 'classnames'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import { GET_STATE } from '../graphql'
import AddTodo from './AddTodo'
import { ClearCompletedButton } from './ClearCompletedButton'
import { Filters as FilterButtons } from './FilterButtons'
import { IncompleteCount } from './IncompleteCount'
import TodoList from './TodoList'

const App = () => {
  const { data } = useQuery(GET_STATE)

  // don't render `main` or `footer` if there are no todos
  const hidden = data.todos.length === 0

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <section className={cn({ main: true, hidden })}>
        <TodoList />
      </section>
      <footer className={cn({ footer: true, hidden })}>
        <IncompleteCount />
        <FilterButtons />
        <ClearCompletedButton />
      </footer>
    </div>
  )
}

export default App
