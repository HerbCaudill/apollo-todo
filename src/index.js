import 'todomvc-app-css/index.css'
import 'todomvc-common/base.css'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloClient } from 'apollo-client'
import React from 'react'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { render } from 'react-dom'

import App from './components/App'
import { defaults, resolvers, typeDefs } from './graphql'

async function setDefaults(cache) {
  cache.writeData({ data: defaults })
}

async function start() {
  const cache = new InMemoryCache()

  await persistCache({
    cache,
    storage: window.localStorage,
  })

  const cacheIsEmpty = !cache.data || !cache.data.data || Object.keys(cache.data.data).length === 0
  if (cacheIsEmpty) await setDefaults(cache)

  const client = new ApolloClient({ cache, resolvers, typeDefs })

  render(
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>,
    document.getElementById('root')
  )
}
start()
