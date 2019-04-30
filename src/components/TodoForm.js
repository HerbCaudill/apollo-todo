import gql from 'graphql-tag'
import React from 'react'
import { Mutation } from 'react-apollo'

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) @client {
      id
    }
  }
`

const TodoForm = () => (
  <Mutation mutation={ADD_TODO}>
    {addTodo => {
      let input
      return (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault()
              if (!input.value.trim()) {
                return
              }
              addTodo({ variables: { text: input.value } })
              input.value = ''
            }}
          >
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus={true}
              ref={node => {
                input = node
              }}
            />
          </form>
        </div>
      )
    }}
  </Mutation>
)

export default TodoForm
