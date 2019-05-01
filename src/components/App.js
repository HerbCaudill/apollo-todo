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
  const { todos } = data
  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      {todos.length > 0 && (
        <>
          <section className="main">
            <TodoList />
          </section>
          <footer className="footer">
            <Count />
            <Filters />
            <ClearCompleted />
          </footer>
        </>
      )}
    </div>
  )
}
export default App
