import React, { useRef } from 'react'
import { useMutation } from 'react-apollo-hooks'

import { ADD_TODO } from '../graphql'

const AddTodo = () => {
  // input.current will contain a reference to the new todo input field
  const input = useRef()

  // hook to graphql mutation
  const [addTodo] = useMutation(ADD_TODO)

  const save = e => {
    // don't post back
    e.preventDefault()
    const text = input.current.value.trim()
    // don't create empty todos
    if (text.length === 0) return
    // update state with new todo
    addTodo({ variables: { text } })
    // clear input
    input.current.value = ''
  }

  return (
    <div>
      <form onSubmit={save}>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus={true} ref={input} />
      </form>
    </div>
  )
}

export default AddTodo
