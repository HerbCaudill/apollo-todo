import gql from 'graphql-tag'
import React from 'react'
import { Query } from 'react-apollo'

import Link from './Link'

const GET_VISIBILITY_FILTER = gql`
  {
    visibilityFilter @client
  }
`

const FilterLink = ({ filter, children }) => (
  <Query query={GET_VISIBILITY_FILTER}>
    {({ data, client }) => (
      <li>
        <Link
          onClick={() => client.writeData({ data: { visibilityFilter: filter } })}
          active={data.visibilityFilter === filter}
        >
          {children}
        </Link>
      </li>
    )}
  </Query>
)

const Footer = () => (
  <footer className="footer">
    {/* TODO - count */}
    <span className="todo-count">5</span>
    <ul className="filters">
      <FilterLink filter="SHOW_ALL">All</FilterLink>
      <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
      <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
    </ul>
    {/* TODO - clear completed */}
    <button className="clear-completed">Clear completed</button>
  </footer>
)

export default Footer
