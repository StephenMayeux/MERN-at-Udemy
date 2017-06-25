import _ from 'lodash'
import {
  BAR_SEARCH_RESULTS,
  TOGGLE_CHECK_IN
} from '../actions'

export default (state = [], action) => {
  switch (action.type) {
    case TOGGLE_CHECK_IN:
      const bars = _.cloneDeep(state)
      const index = _.findIndex(bars, (bar) => bar.id === action.payload.yelp_id)
      bars[index].visitors = action.payload.visitors
      return bars
    case BAR_SEARCH_RESULTS:
      return action.payload
    default:
      return state
  }
}
