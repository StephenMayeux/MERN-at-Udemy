import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  Panel,
  FormGroup,
  Radio,
  Button
} from 'react-bootstrap'
import _ from 'lodash'
import axios from 'axios'

const baseURL = 'http://localhost:3000'

export default class PollItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poll: null,
      hasLoaded: false,
      selectedOption: null
    }
  }

  componentWillMount() {
    axios.get(`${baseURL}/polls/vote/${this.props.params.id}`)
      .then(({ data }) => {
        this.setState({ poll: data.poll, hasLoaded: true })
      })
      .catch(error => {
        console.error('Error fetching single poll', error)
      })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { _id } = this.state.poll
    axios.post(`${baseURL}/polls/vote/${_id}`, { voter: 'test', vote: this.state.selectedOption })
      .then(({ data }) => {
        this.setState({ poll: data.poll })
      })
      .catch(error => {
        console.error('Error fetching single poll', error)
      })
  }

  renderPollOptions() {
    const { results } = this.state.poll
    return _.map(results, (value, option) => {
      return (
        <Radio
          key={option}
          name="vote"
          value={option}
          onChange={(e) => this.setState({ selectedOption: e.target.value })}
        >
          {option}
        </Radio>
      )
    })
  }

  render() {
    const { poll, hasLoaded } = this.state
    if (_.isEmpty(poll) && !hasLoaded) return null
    if (_.isEmpty(poll) && hasLoaded) return <div>Invalid poll id</div>
    return (
      <Grid>
        <Row>
          <Col xs={6}>
            <Panel header={poll.title} bsStyle="primary">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                  {this.renderPollOptions()}
                </FormGroup>
                <Button type="submit">Vote!</Button>
              </form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}
