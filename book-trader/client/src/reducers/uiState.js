import {
  SIGN_UP_FAILURE
} from '../actions'

const DEFAULT_STATE = {
  signUpFailure: null
}

export default (state = DEFAULT_STATE, action) {
  switch (action.type) {
    SIGN_UP_FAILURE:
      return {...state, signUpFailure: action.payload}
    default:
      return state
  }
}
