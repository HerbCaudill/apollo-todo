export const typeDefs = `
  enum Filter {
    SHOW_ALL
    SHOW_ACTIVE
    SHOW_COMPLETED
  }

  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }

  type Mutation {
    setFilter(filter: Filter!)
    addTodo(text: String!): Todo
    toggleTodo(id: Int!): Todo
  }

  type Query {
    filter: Filter 
    todos: [Todo]
  }
`
