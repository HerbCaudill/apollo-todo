import React from 'react'

import Footer from './Footer'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

const App = () => (
  <div>
    <header className="header">
      <h1>todos</h1>
      <TodoForm />
    </header>
    <TodoList />
    <Footer />
  </div>
)
export default App
