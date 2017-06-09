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

    this.state = {
      displayAuthModal: false,
      emailForm: '',
      passwordForm: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.displayAuthModal = this.displayAuthModal.bind(this)
    this.hideAuthModal = this.hideAuthModal.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.barSeachResults(this.props.search)
  }

  handleSignIn(e) {
    e.preventDefault()
    const { emailForm, passwordForm } = this.state
    this.props.actions.handleSignIn({ emailForm, passwordForm })
  }

  handleChange(e) {
    this.props.actions.updateSearchTerm(e.target.value)
  }

  displayAuthModal() {
    this.setState({ displayAuthModal: true })
  }

  hideAuthModal() {
    this.setState({ displayAuthModal: false })
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
        { this.state.displayAuthModal
            ? <AuthModal
                show={this.state.displayAuthModal}
                onHide={this.hideAuthModal}
                onSubmit={this.handleSignIn}
              />
            : null
        }
      </div>
    );
  }
}

const mapStateToProps = ({ search, bars, auth }) => {
  return { search, bars, auth }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
