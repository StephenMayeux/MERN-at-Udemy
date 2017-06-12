import {
  UPDATE_SEARCH_TERM,
  BAR_SEARCH_RESULTS
} from '../actions'

export default (state = '', action) => {
  switch (action.type) {
    case BAR_SEARCH_RESULTS:
      return ''
    case UPDATE_SEARCH_TERM:
      return action.payload
    default:
      return state
  }
}
