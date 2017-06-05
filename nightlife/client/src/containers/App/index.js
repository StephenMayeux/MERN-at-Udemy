import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  FormControl
} from 'react-bootstrap'

import './style.css';

class App extends Component {
  renderForm() {
    return (
      <Form className="form-inline form-container">
        <FormGroup className="search-bar">
          <FormControl type="text" placeholder="Austin, TX" />
        </FormGroup>
        <Button bsStyle="primary">Search</Button>
      </Form>
    )
  }

  render() {
    return (
      <div className="app">
        <div className="header">
          <h2>Welcome to Nightlife</h2>
          <p className="lead">Search for bars and tell your friends</p>
          <Button bsStyle="primary">
            Sign In with Twitter
          </Button>
        </div>
        <p className="intro">
          To get started, use the search form below.
          {this.renderForm()}
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ messages }) => {
  return { messages }
}

export default connect(mapStateToProps)(App);
