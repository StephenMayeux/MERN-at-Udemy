import {
  HANDLE_SIGN_IN,
  UPDATE_EMAIL_FORM,
  UPDATE_PASSWORD_FORM
} from '../actions'

const DEFAULT_STATE = {
  isLoggedIn: false,
  emailForm: '',
  passwordForm: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case HANDLE_SIGN_IN:
      return { ...state, ...action.payload, isLoggedIn: true }
    case UPDATE_EMAIL_FORM:
      return { ...state, emailForm: action.payload }
    case UPDATE_PASSWORD_FORM:
      return { ...state, passwordForm: action.payload }
    default:
      return state
  }
}
