import { combineReducers } from 'redux'

import auth from './auth'
import uiState from './uiState'
import books from './books'

const rootReducer = combineReducers({
  auth,
  uiState,
  books
})

export default rootReducer
