import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import { SHOW_ACTIVE } from '../constants'
import { GET_STATE } from '../graphql'
import { applyFilter, pluralize } from '../utils'

export function IncompleteCount() {
  const { data } = useQuery(GET_STATE)
  const { todos } = data

  // we only count incomplete todos
  const count = applyFilter(todos, SHOW_ACTIVE).length

  return (
    <span className="todo-count">
      <strong>{count}</strong> {pluralize(count, 'item')} left
    </span>
  )
}
