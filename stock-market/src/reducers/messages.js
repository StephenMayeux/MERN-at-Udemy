import {
  DISPLAY_MESSAGE,
  HIDE_MESSAGE
} from '../actions'

const INITIAL_STATE = {
  error: null
}

export default (state = INITIAL_STATE, action) => {
  const { type, msg } = action
  switch (type) {
    case DISPLAY_MESSAGE:
      return { error: msg }
    case HIDE_MESSAGE:
      return INITIAL_STATE
    default:
      return state
  }
}
