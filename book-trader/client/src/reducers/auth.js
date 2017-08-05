import {
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS
} from '../actions'

const DEFAULT_STATE = {
  user: null,
  token: null,
  isLoggedIn: false
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      const { token, user } = action.payload
      return { user, token, isLoggedIn: true }
    default:
      return state
  }
}
