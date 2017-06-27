import {
  DISPLAY_MESSAGE
} from '../actions'

const INITIAL_STATE = {
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case DISPLAY_MESSAGE:
      return { error: payload }
    default:
      return state
  }
}
