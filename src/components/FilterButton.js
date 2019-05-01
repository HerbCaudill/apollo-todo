import cn from 'classnames'
import React from 'react'
import { useMutation, useQuery } from 'react-apollo-hooks'

import { GET_STATE, SET_FILTER } from '../graphql'

export const FilterButton = ({ value, children }) => {
  const { data } = useQuery(GET_STATE)

  // hook to graphql mutation
  const [setFilter] = useMutation(SET_FILTER)

  // if this is the currently selected filter, it is styled differently
  const selected = data.filter === value

  const onClick = e => {
    // don't navigate
    e.preventDefault()
    // update state
    setFilter({ variables: { filter: value } })
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
