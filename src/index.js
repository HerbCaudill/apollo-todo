import 'todomvc-app-css/index.css'
import 'todomvc-common/base.css'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { render } from 'react-dom'

import App from './components/App'
import { defaults, resolvers, typeDefs } from './graphql'

const cache = new InMemoryCache()

cache.writeData({ data: defaults })

const client = new ApolloClient({ cache, resolvers, typeDefs })

render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
