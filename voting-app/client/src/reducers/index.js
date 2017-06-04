import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  state: (state = 'root reducer') => state
});

export default rootReducer;
