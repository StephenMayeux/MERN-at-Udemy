import {
  SIGN_UP_FAILURE,
  SIGN_IN_FAILURE,
  CLEAR_MESSAGES
} from '../actions'

const DEFAULT_STATE = {
  signUpFailure: null,
  signInFailure: null
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_FAILURE:
      return { ...state, signInFailure: action.payload }
    case SIGN_UP_FAILURE:
      return { ...state, signUpFailure: action.payload}
    case CLEAR_MESSAGES:
      return DEFAULT_STATE
    default:
      return state
  }
}
