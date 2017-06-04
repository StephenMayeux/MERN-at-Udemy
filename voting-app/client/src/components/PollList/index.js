import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import {
  ListGroup,
  ListGroupItem,
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
  }

  componentWillMount() {
    axios.get(`${baseURL}/polls/all`)
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
    if (_.isEmpty(polls) && hasLoaded) return <div>No polls in the database!</div>
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
          onClick={() => browserHistory.push(`vote/${_id}`)}
        >
          {`${title}`}
        </ListGroupItem>
      )
    })
  }

  render() {
    return (
      <Grid>
        <h1>All Polls</h1>
        {this.renderList()}
      </Grid>
    )
  }
}
