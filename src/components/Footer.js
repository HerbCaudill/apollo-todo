import React from 'react'

import { Filters } from './Filters'

const Footer = () => (
  <footer className="footer">
    {/* TODO - count */}
    <span className="todo-count">5</span>
    <Filters />
    {/* TODO - clear completed */}
    <button className="clear-completed">Clear completed</button>
  </footer>
)

export default Footer
