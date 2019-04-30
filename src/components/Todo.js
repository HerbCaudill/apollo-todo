import gql from 'graphql-tag'
import React, { useState, useRef, useEffect } from 'react'
import { Mutation } from 'react-apollo'

import { ENTER_KEY, ESCAPE_KEY } from './constants'

var classNames = require('classnames')

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`

const EDIT_TODO = gql`
  mutation EditTodo($id: Int!, $text: String!) {
    editTodo(id: $id, text: $text) @client
  }
`
const DESTROY_TODO = gql`
  mutation DestroyTodo($id: Int!) {
    destroyTodo(id: $id) @client
  }
`

const Todo = ({ id, completed, text }) => {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(text)

  const input = useRef()

  useEffect(() => {
    if (editing) input.current.select()
  }, [editing])

  return (
    <Mutation mutation={EDIT_TODO} variables={{ id, text }}>
      {editTodo => (
        <Mutation mutation={TOGGLE_TODO} variables={{ id }}>
          {toggleTodo => (
            <Mutation mutation={DESTROY_TODO} variables={{ id }}>
              {destroyTodo => {
                const submit = e => {
                  setEditText(e.target.value)

                  if (editText.length > 0) {
                    editTodo({ variables: { text: e.target.value, id } })
                  } else {
                    destroyTodo({ variables: { id } })
                  }
                  setEditing(false)
                }

                const handleChange = e => {
                  e.preventDefault()
                  setEditText(e.target.value)
                }

                const handleKeyDown = e => {
                  if (e.keyCode === ESCAPE_KEY) {
                    setEditText(text)
                    setEditing(false)
                  } else if (e.keyCode === ENTER_KEY) {
                    submit(e)
                  }
                }

                const handleDoubleClick = e => {
                  setEditing(true)
                }

                return (
                  <li className={classNames({ completed, editing })}>
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
                )
              }}
            </Mutation>
          )}
        </Mutation>
      )}
    </Mutation>
  )
}

export default Todo
