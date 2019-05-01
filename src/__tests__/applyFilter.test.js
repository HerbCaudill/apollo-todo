import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from '../constants'
import { applyFilter } from '../lib'

let todos

beforeEach(() => {
  todos = require('../__mocks__/todos').todos
})

describe('applyFilter', () => {
  it('all', () => {
    expect(applyFilter(todos, SHOW_ALL)).toHaveLength(3)
  })

  it('active', () => {
    expect(applyFilter(todos, SHOW_ACTIVE)).toHaveLength(2)
  })

  it('completed', () => {
    expect(applyFilter(todos, SHOW_COMPLETED)).toHaveLength(1)
  })
})
