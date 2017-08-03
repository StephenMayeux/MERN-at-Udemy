import { combineReducers } from 'redux'

import auth from './auth'
import uiState from './uiState'

const rootReducer = combineReducers({
  auth,
  uiState
})

export default rootReducer
