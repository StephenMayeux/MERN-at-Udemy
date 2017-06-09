import {
  DISPLAY_AUTH_MODAL,
  HIDE_AUTH_MODAL,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE
} from '../actions'

const DEFAULT_STATE = {
  displayAuthModal: false,
  authErrorMessage: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type ) {
    case SIGN_IN_SUCCESS:
      return DEFAULT_STATE
    case DISPLAY_AUTH_MODAL:
      return { ...state, displayAuthModal: true }
    case HIDE_AUTH_MODAL:
      return { ...state, displayAuthModal: false }
    default:
      return state
  }
}
