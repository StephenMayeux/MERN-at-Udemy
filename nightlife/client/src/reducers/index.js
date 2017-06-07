import { combineReducers } from 'redux';
import search from './search'
import bars from './bars'

const rootReducer = combineReducers({
  search,
  bars
});

export default rootReducer;
