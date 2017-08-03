import {
  SIGN_UP_FAILURE,
  CLEAR_MESSAGES
} from '../actions'

const DEFAULT_STATE = {
  signUpFailure: null
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_FAILURE:
      return { ...state, signUpFailure: action.payload}
    case CLEAR_MESSAGES:
      return DEFAULT_STATE
    default:
      return state
  }
}
