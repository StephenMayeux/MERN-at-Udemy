import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
  Grid
 } from 'react-bootstrap'
import _ from 'lodash'
import axios from 'axios'
import './style.css'

const baseURL = 'http://localhost:3000'

export default class PollList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: [],
      hasLoaded: false
    }

    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(_id) {
    const config = { headers: { 'Authorization': `Bearer ${this.props.route.auth.getToken()}` } }
    axios.delete(`${baseURL}/polls/delete/${_id}`, config)
      .then(response => {
        const polls = _.filter(this.state.polls, (poll) => poll._id !== _id)
        this.setState({ polls })
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentWillMount() {
    axios.get(`${baseURL}/polls/user/${this.props.route.auth.getUsername()}`)
      .then(({ data }) => {
        this.setState({ polls: data.polls, hasLoaded: true })
      })
      .catch(error => {
        console.error('Error fetching polls', error)
      })
  }

  renderList() {
    const { polls, hasLoaded } = this.state
    if (_.isEmpty(polls) && !hasLoaded) return null
    if (_.isEmpty(polls) && hasLoaded) return <div>You have no polls! Create one now.</div>
    return (
      <ListGroup>
        {this.renderListItems()}
      </ListGroup>
    )
  }

  renderListItems() {
    return this.state.polls.map(({ title, _id }) => {
      return (
        <ListGroupItem
          key={_id}
          className="pollItem"
        >
          <Row>
            <Col xs={6}>
              <p onClick={() => browserHistory.push(`vote/${_id}`)}>{title}</p>
            </Col>
            <Col xs={6}>
              <Button className="btn btn-danger" onClick={this.handleDelete.bind(this, _id)}>Delete</Button>
            </Col>
          </Row>
        </ListGroupItem>
      )
    })
  }

  render() {
    return (
      <Grid>
        <h1>My Polls</h1>
        {this.renderList()}
      </Grid>
    )
  }
}
