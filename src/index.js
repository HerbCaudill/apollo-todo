import 'todomvc-app-css/index.css'
import 'todomvc-common/base.css'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloClient } from 'apollo-client'
import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import { render } from 'react-dom'

import App from './components/App'
import { defaults, resolvers, typeDefs } from './graphql'

async function start() {
  // We're using Apollo GraphQL without a server.
  // All changes are made in memory and persisted to localStorage
  const cache = new InMemoryCache()
  const storage = window.localStorage // could also choose localForage, cookies, etc.

  // Wire up the in-memory cache to persistent storage
  await persistCache({ cache, storage })

  // Check to see if there's anything in the cache - if not, populate with default values
  const cacheIsEmpty = !cache.data || !cache.data.data || Object.keys(cache.data.data).length === 0
  if (cacheIsEmpty) cache.writeData({ data: defaults })

  const client = new ApolloClient({ cache, resolvers, typeDefs })

  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  )
}

start()
