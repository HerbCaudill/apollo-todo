import gql from 'graphql-tag'
import React, { useRef } from 'react'
import { useMutation } from 'react-apollo-hooks'

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) @client {
      id
    }
  }
`

const TodoForm = () => {
  const input = useRef(null)

  const onSubmit = e => {
    e.preventDefault()
    if (input.current.value.trim().length === 0) return
    addTodo({ variables: { text: input.current.value } })
    input.current.value = ''
  }

  const [addTodo] = useMutation(ADD_TODO)
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus={true} ref={input} />
      </form>
    </div>
  )
}

export default TodoForm
