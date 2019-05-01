import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import { SHOW_ACTIVE } from '../constants'
import { GET_STATE } from '../graphql'
import { applyFilter, pluralize } from '../utils'

export function Count() {
  const { data } = useQuery(GET_STATE)
  const { todos } = data
  const activeCount = applyFilter(todos, SHOW_ACTIVE).length
  return (
    <span className="todo-count">
      {activeCount} {pluralize(activeCount, 'item')} left
    </span>
  )
}
