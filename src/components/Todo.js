import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-apollo-hooks';

import { ENTER_KEY, ESCAPE_KEY } from '../constants';
import { DESTROY_TODO, EDIT_TODO, TOGGLE_TODO } from '../graphql';

const Todo = ({ id, completed, text }) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const input = useRef();

  const selectAllOnEdit = () => {
    if (editing) input.current.select();
  };
  useEffect(selectAllOnEdit, [editing]);

  const [toggleTodo] = useMutation(TOGGLE_TODO, { variables: { id } });
  const [editTodo] = useMutation(EDIT_TODO, { variables: { id, text: editText } });
  const [destroyTodo] = useMutation(DESTROY_TODO, { variables: { id } });

  const submit = e => {
    setEditText(e.target.value);
    if (editText.length > 0) editTodo({ variables: { text: e.target.value, id } });
    else destroyTodo({ variables: { id } });
    setEditing(false);
  };

  const handleChange = e => {
    e.preventDefault();
    setEditText(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.keyCode === ESCAPE_KEY) {
      setEditText(text);
      setEditing(false);
    } else if (e.keyCode === ENTER_KEY) {
      submit(e);
    }
  };

  const handleDoubleClick = e => {
    setEditing(true);
  };

  return (
    <li className={cn({ completed, editing })}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={toggleTodo} />
        <label onDoubleClick={handleDoubleClick}>{text}</label>
        <button className="destroy" onClick={destroyTodo} />
      </div>
      <input
        ref={input}
        className="edit"
        value={editText}
        onBlur={submit}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
};

export default Todo;
