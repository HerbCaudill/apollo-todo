import cn from 'classnames';
import React from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';

import { GET_STATE, SET_FILTER } from '../graphql';

export const Filter = ({ value, children }) => {
  const [setFilter] = useMutation(SET_FILTER);
  const { data } = useQuery(GET_STATE);
  const selected = data.filter === value;
  const onClick = e => {
    e.preventDefault();
    setFilter({ variables: { filter: value } });
  };
  return (
    <li>
      {/* linter doesn't like not having an href */}
      {/* eslint-disable-next-line */}
      <a className={cn({ selected })} onClick={onClick}>
        {children}
      </a>
    </li>
  );
};
