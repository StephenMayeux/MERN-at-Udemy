import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';

import AuthService from './lib/AuthService'

import App from './containers/App';
import Home from './components/LandingPage'
import PollList from './components/PollList'
import PollItem from './components/PollItem'

import reducers from './reducers';

const auth = new AuthService('dcajj9RQ__rQAVVzbqp7hTALGeVv_FnZ', 'thebestjs.auth0.com')
// eslint-disable-next-line
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/' })
  }
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} auth={auth}>
        <IndexRoute component={Home} />
        <Route path="/vote" component={PollList} />
        <Route path="/vote/:id" component={PollItem} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
