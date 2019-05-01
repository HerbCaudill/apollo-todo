import cn from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-apollo-hooks'

import { ENTER_KEY, ESCAPE_KEY } from '../constants'
import { DESTROY_TODO, EDIT_TODO, TOGGLE_TODO } from '../graphql'

const Todo = ({ id, completed, text }) => {
  // component state
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(text)

  // input.current will contain a reference to the editing input
  const input = useRef()

  // side effect: need to select all text in the input when going into editing mode
  // this will only fire when `editing` changes
  const selectAllOnEdit = () => {
    if (editing) input.current.select()
  }
  useEffect(selectAllOnEdit, [editing])

  // hooks to graphql mutations
  const [toggleTodo] = useMutation(TOGGLE_TODO, { variables: { id } })
  const [editTodo] = useMutation(EDIT_TODO, { variables: { id, text: editText } })
  const [destroyTodo] = useMutation(DESTROY_TODO, { variables: { id } })

  // we save when the user has either tabbed or clicked away, or hit Enter
  const save = e => {
    if (editText.length > 0) {
      // todo was changed - keep the edited text
      editTodo({ variables: { text: e.target.value, id } })
    } else {
      // user has removed all the text of the todo, so delete it
      destroyTodo({ variables: { id } })
    }
    leaveEditMode()
  }

  // listen for special keys
  const onKeyDown = e => {
    if (e.keyCode === ESCAPE_KEY) {
      // ESC: abort editing
      restoreText()
      leaveEditMode()
    } else if (e.keyCode === ENTER_KEY) {
      // ENTER: persist the edited text
      save(e)
    }
  }

  const enterEditMode = e => setEditing(true)
  const leaveEditMode = e => setEditing(false)

  const updateText = e => setEditText(e.target.value)
  const restoreText = e => setEditText(text)

  return (
    <li className={cn({ completed, editing })}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={toggleTodo} />
        <label onDoubleClick={enterEditMode}>{text}</label>
        <button className="destroy" onClick={destroyTodo} />
      </div>
      <input className="edit" ref={input} value={editText} onBlur={save} onChange={updateText} onKeyDown={onKeyDown} />
    </li>
  )
}

export default Todo
