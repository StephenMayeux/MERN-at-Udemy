import { combineReducers } from 'redux';
import stocks from './stocks'
import messages from './messages'

const rootReducer = combineReducers({
  stocks,
  messages
});

export default rootReducer;
