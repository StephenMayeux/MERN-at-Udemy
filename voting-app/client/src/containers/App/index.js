// Because of stupid reasons:
// eslint-disable-next-line
import React, { Component } from 'react';
import './style.css';

class App extends Component {
  render() {
    return this.props.children;
  }
}

export default App;
