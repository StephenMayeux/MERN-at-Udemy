import {
  BAR_SEARCH_RESULTS
} from '../actions'

export default (state = [], action) => {
  switch (action.type) {
    case BAR_SEARCH_RESULTS:
      return action.payload
    default:
      return state
  }
}
