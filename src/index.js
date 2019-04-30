import 'todomvc-app-css/index.css'
import 'todomvc-common/base.css'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { withClientState } from 'apollo-link-state'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { render } from 'react-dom'

import App from './components/App'
import { defaults, resolvers } from './resolvers'

const cache = new InMemoryCache()

const typeDefs = `
  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }

  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: Int!): Todo
  }

  type Query {
    visibilityFilter: String
    todos: [Todo]
  }
`

const client = new ApolloClient({
  cache,
  link: withClientState({ resolvers, defaults, cache, typeDefs }),
})

render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
