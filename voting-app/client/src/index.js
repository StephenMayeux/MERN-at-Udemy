import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AuthService from './lib/AuthService'

import App from './components/App';
import Home from './components/LandingPage'
import PollList from './components/PollList'
import PollItem from './components/PollItem'
import CreatePollItem from './components/CreatePollItem'
import MyPolls from './components/MyPolls'

const auth = new AuthService('dcajj9RQ__rQAVVzbqp7hTALGeVv_FnZ', 'thebestjs.auth0.com')
// eslint-disable-next-line
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/' })
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} auth={auth}>
      <IndexRoute component={Home} />
      <Route path="/vote" component={PollList} />
      <Route path="/vote/:id" component={PollItem} auth={auth} />
      <Route path="/create" component={CreatePollItem} onEnter={requireAuth} auth={auth} />
      <Route path="/mypolls" component={MyPolls} onEnter={requireAuth} auth={auth} />
    </Route>
  </Router>
  , document.getElementById('root'));
