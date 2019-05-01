import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { SHOW_ALL, SHOW_COMPLETED } from '../constants'
import { GET_STATE, defaults, resolvers, typeDefs } from '../graphql'

const { Mutation } = resolvers

const getState = () => {
  return cache.readQuery({ query: GET_STATE })
}

let cache
let context
let client
const _ = null

const createClient = async () => {
  cache.writeData({ data: defaults })
  return new ApolloClient({ cache, resolvers, typeDefs })
}

beforeEach(async () => {
  cache = new InMemoryCache()
  client = await createClient(cache)
  context = { cache }
})

const waitForNextTick = () => new Promise(resolve => setTimeout(resolve))

describe('Mutations', () => {
  describe('setFilter', () => {
    it('should change the filter', () => {
      expect(getState().filter).toEqual(SHOW_ALL)
      Mutation.setFilter(_, { filter: SHOW_COMPLETED }, context)
      expect(getState().filter).toEqual(SHOW_COMPLETED)
    })
  })
})
