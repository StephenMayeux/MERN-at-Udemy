import _ from 'lodash'
import {
  FETCH_USER_BOOKS,
  SEARCH_BOOKS,
  ADD_BOOK
} from '../actions'

const DEFAULT_STATE = {
  userBooks: [],
  userBooksLoaded: false,
  searchBooks: []
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SEARCH_BOOKS:
      return {...state, searchBooks: action.payload}
    case FETCH_USER_BOOKS:
      return {...state, userBooks: action.payload, userBooksLoaded: true}
    case ADD_BOOK:
      let searchResults = _.cloneDeep(state.searchBooks)
      const index = _.findIndex(searchResults, { _id: action._id })
      searchResults[index].added = true
      return {...state, userBooks: action.payload, searchBooks: searchResults}
    default:
      return state
  }
}
