import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import App from './containers/App';
import LandingPage from './components/LandingPage'

import reducers from './reducers';

const logger = createLogger({ collapsed: true })

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const { token, user } = localStorage
if (token && user) {
  store.dispatch({
    type: 'SIGN_IN_SUCCESS',
    payload: { token, user }
  })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
