import React from 'react';

import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from '../constants';
import { Filter } from './Filter';

export const Filters = () => (
  <ul className="filters">
    <Filter value={SHOW_ALL}>All</Filter>
    <Filter value={SHOW_ACTIVE}>Active</Filter>
    <Filter value={SHOW_COMPLETED}>Completed</Filter>
  </ul>
);
