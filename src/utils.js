import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from './constants'

export const applyFilter = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

export const uuid = () => {
  /*jshint bitwise:false */
  var i, random
  var uuid = ''
  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16)
  }
  return uuid
}

export const pluralize = (count, word) => {
  return count === 1 ? word + 's' : word
}
