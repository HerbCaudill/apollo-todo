import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import { SHOW_COMPLETED } from '../constants'
import { GET_STATE } from '../graphql'
import { applyFilter } from '../utils'

export function ClearCompleted() {
  const { data } = useQuery(GET_STATE)
  const { todos } = data
  const completedCount = applyFilter(todos, SHOW_COMPLETED).length

  if (completedCount === 0) return null

  const onClick = e => {}

  return (
    <button className="clear-completed" onClick={onClick}>
      Clear completed
    </button>
  )
}
