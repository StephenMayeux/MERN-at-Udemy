import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {
  Grid,
  Row,
  Button,
  Form,
  FormGroup,
  FormControl
} from 'react-bootstrap'
import _ from 'lodash'

import BarCard from '../../components/BarCard'
import AuthModal from '../../components/AuthModal'

import { actionCreators } from '../../actions'
import './style.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.displayAuthModal = this.displayAuthModal.bind(this)
    this.hideAuthModal = this.hideAuthModal.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
  }

  handleChange(e) {
    this.props.actions.updateSearchTerm(e.target.value)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.barSeachResults(this.props.search)
  }

  displayAuthModal() {
    this.props.actions.displayAuthModal()
  }

  hideAuthModal() {
    this.props.actions.hideAuthModal()
  }

  handleEmailChange(e) {
    this.props.actions.updateEmailForm(e.target.value)
  }

  handlePasswordChange(e) {
    this.props.actions.updatePasswordForm(e.target.value)
  }

  handleSignIn(e) {
    e.preventDefault()
    const { emailForm, passwordForm } = this.props.auth
    this.props.actions.handleSignIn({ emailForm, passwordForm })
  }

  renderForm() {
    return (
      <Form onSubmit={this.handleSubmit} className="form-inline form-container">
        <FormGroup className="search-bar">
          <FormControl
            type="text"
            placeholder="Austin, TX"
            onChange={this.handleChange}
            value={this.props.search}
          />
        </FormGroup>
        <Button bsStyle="primary">Search</Button>
      </Form>
    )
  }

  renderBars() {
    const { bars, actions } = this.props
    if (_.isEmpty(bars)) return null
    return _.map(bars, (bar, i) => <BarCard key={bar.id} {...bar} actions={actions} />)
  }

  render() {
    return (
      <div className="app">
        <div className="header">
          <h2>Welcome to Nightlife</h2>
          <p className="lead">Search for bars and tell your friends</p>
          <Button bsStyle="primary" onClick={this.displayAuthModal}>
            Sign In or Sign Up
          </Button>
        </div>
        <p className="intro">
          To get started, use the search form below.
          {this.renderForm()}
        </p>
        <Grid>
          <Row>
            {this.renderBars()}
          </Row>
        </Grid>
        { this.props.uiState.displayAuthModal
            ? <AuthModal
                onHide={this.hideAuthModal}
                onSubmit={this.handleSignIn}
                handleEmailChange={this.handleEmailChange}
                handlePasswordChange={this.handlePasswordChange}
                auth={this.props.auth}
              />
            : null
        }
      </div>
    );
  }
}

const mapStateToProps = ({ search, bars, auth, uiState }) => {
  return { search, bars, auth, uiState }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
