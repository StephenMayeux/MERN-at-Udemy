import {
  FETCH_USER_BOOKS
} from '../actions'

const DEFAULT_STATE = []

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_BOOKS:
      return action.payload
    default:
      return state
  }
}
