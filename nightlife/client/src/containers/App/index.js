import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {
  Grid,
  Row,
  Button,
  Form,
  FormGroup,
  FormControl,
  Modal
} from 'react-bootstrap'
import _ from 'lodash'

import BarCard from '../../components/BarCard'

import { actionCreators } from '../../actions'
import './style.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.barSeachResults(this.props.search)
  }

  handleChange(e) {
    this.props.actions.updateSearchTerm(e.target.value)
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
          <Button bsStyle="primary">
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
        <Modal show={false}>
          <Modal.Header closeButton onHide={() => 'stuff'}>
            
          </Modal.Header>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ search, bars }) => {
  return { search, bars }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
