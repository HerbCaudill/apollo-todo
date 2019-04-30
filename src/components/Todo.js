import gql from 'graphql-tag'
import React from 'react'
import { Mutation } from 'react-apollo'

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

function handleClick(e) {
  e.preventDefault()
  console.log('The link was clicked.')
}

const Todo = ({ id, completed, text }) => (
  <li className={completed ? 'completed' : ''}>
    <div className="view">
      <Mutation mutation={TOGGLE_TODO} variables={{ id }}>
        {toggleTodo => <input className="toggle" type="checkbox" checked={completed} onChange={toggleTodo} />}
      </Mutation>
      <Mutation mutation={EDIT_TODO} variables={{ id, text }}>
        {editTodo => <label>{text}</label>}
      </Mutation>
      <Mutation mutation={DESTROY_TODO} variables={{ id }}>
        {destroyTodo => <button className="destroy" onClick={destroyTodo} />}
      </Mutation>
    </div>
  </li>
)

export default Todo
