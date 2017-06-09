import {
  HANDLE_SIGN_IN
} from '../actions'

const DEFAULT_STATE = {
  isLoggedIn: false
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case HANDLE_SIGN_IN:
      console.log('you are logged in!', action.payload)
      return {...action.payload, isLoggedIn: true }
    default:
      return state
  }
}
