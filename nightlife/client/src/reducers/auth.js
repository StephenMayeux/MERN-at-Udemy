import {
  SIGN_IN_SUCCESS,
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
    case SIGN_IN_SUCCESS:
      return { ...DEFAULT_STATE, ...action.payload, isLoggedIn: true }
    case UPDATE_EMAIL_FORM:
      return { ...state, emailForm: action.payload }
    case UPDATE_PASSWORD_FORM:
      return { ...state, passwordForm: action.payload }
    default:
      return state
  }
}
