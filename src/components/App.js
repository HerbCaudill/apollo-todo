import React from 'react'

import AddTodo from './AddTodo'
import { ClearCompleted } from './ClearCompleted'
import { Count } from './Count'
import { Filters } from './Filters'
import TodoList from './TodoList'

const App = () => (
  <div>
    <header className="header">
      <h1>todos</h1>
      <AddTodo />
    </header>
    <TodoList />
    <footer className="footer">
      <Count />
      <Filters />
      <ClearCompleted />
    </footer>
  </div>
)
export default App
