import cn from 'classnames'
import React from 'react'
import { useMutation, useQuery } from 'react-apollo-hooks'

import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from '../constants'
import { GET_FILTER, SET_FILTER } from '../graphql'

const FilterOption = ({ filter, children }) => {
  const [setFilter] = useMutation(SET_FILTER)
  const { data } = useQuery(GET_FILTER)
  const selected = data.filter === filter
  const onClick = e => {
    e.preventDefault()
    setFilter({ variables: { filter } })
  }
  return (
    <li>
      {/* linter doesn't like not having an href */}
      {/* eslint-disable-next-line */}
      <a className={cn({ selected })} onClick={onClick}>
        {children}
      </a>
    </li>
  )
}

const Footer = () => (
  <footer className="footer">
    {/* TODO - count */}
    <span className="todo-count">5</span>
    <ul className="filters">
      <FilterOption filter={SHOW_ALL}>All</FilterOption>
      <FilterOption filter={SHOW_ACTIVE}>Active</FilterOption>
      <FilterOption filter={SHOW_COMPLETED}>Completed</FilterOption>
    </ul>
    {/* TODO - clear completed */}
    <button className="clear-completed">Clear completed</button>
  </footer>
)

export default Footer
