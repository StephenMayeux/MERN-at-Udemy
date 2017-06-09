import { combineReducers } from 'redux';
import search from './search'
import bars from './bars'
import auth from './auth'
import uiState from './uiState'

const rootReducer = combineReducers({
  search,
  bars,
  auth,
  uiState
});

export default rootReducer;
