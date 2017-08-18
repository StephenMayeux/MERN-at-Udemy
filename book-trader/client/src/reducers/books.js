import {
  FETCH_USER_BOOKS,
  SEARCH_BOOKS
} from '../actions'

const DEFAULT_STATE = {
  userBooks: [],
  searchBooks: []
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SEARCH_BOOKS:
      return {...state, searchBooks: action.payload}
    case FETCH_USER_BOOKS:
      return {...state, userBooks: action.payload}
    default:
      return state
  }
}
