import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';

import App from './containers/App';
import Home from './components/LandingPage'
import PollList from './components/PollList'
import PollItem from './components/PollItem'

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/vote" component={PollList} />
        <Route path="/vote/:id" component={PollItem} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
