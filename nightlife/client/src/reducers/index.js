import { combineReducers } from 'redux';
import search from './search'
import bars from './bars'
import auth from './auth'

const rootReducer = combineReducers({
  search,
  bars,
  auth
});

export default rootReducer;
