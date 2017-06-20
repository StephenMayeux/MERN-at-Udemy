import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  messages: (state = 'root reducer') => state
});

export default rootReducer;
