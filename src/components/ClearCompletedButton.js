import React from 'react'
import { useMutation, useQuery } from 'react-apollo-hooks'

import { SHOW_COMPLETED } from '../constants'
import { DESTROY_COMPLETED, GET_STATE } from '../graphql'
import { applyFilter } from '../utils'

export function ClearCompletedButton() {
  const { data } = useQuery(GET_STATE)
  const { todos } = data

  // hook to graphql mutation
  const [destroyCompleted] = useMutation(DESTROY_COMPLETED, { variables: {} })

  // don't render this button if there are no completed todos
  const completedCount = applyFilter(todos, SHOW_COMPLETED).length
  if (completedCount === 0) return null

  return (
    <button className="clear-completed" onClick={destroyCompleted}>
      Clear completed
    </button>
  )
}
