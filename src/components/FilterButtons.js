import React from 'react'

import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from '../constants'
import { FilterButton } from './FilterButton'

export const Filters = () => (
  <ul className="filters">
    <FilterButton value={SHOW_ALL}>All</FilterButton>
    <FilterButton value={SHOW_ACTIVE}>Active</FilterButton>
    <FilterButton value={SHOW_COMPLETED}>Completed</FilterButton>
  </ul>
)
