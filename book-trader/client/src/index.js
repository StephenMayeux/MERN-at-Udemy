import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import App from './containers/App';
import LandingPage from './components/LandingPage'
import MyBooks from './components/MyBooks'

import reducers from './reducers';

const logger = createLogger({ collapsed: true })

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const { token, user } = localStorage
if (token && user) {
  store.dispatch({
    type: 'SIGN_IN_SUCCESS',
    payload: { token, user: JSON.parse(user) }
  })
}

const handleAuth = (nextState, replace) => {
  const { isLoggedIn } = store.getState().auth
  if (!isLoggedIn) {
    replace({ pathname: '/' })
  }
}

const handleRedirect = (nextState, replace) => {
  const { isLoggedIn } = store.getState().auth
  if (isLoggedIn && nextState.location.pathname === '/') {
    replace({ pathname: '/mybooks' })
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingPage} onEnter={handleRedirect} />
        <Route path="/mybooks" component={MyBooks} onEnter={handleAuth} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
