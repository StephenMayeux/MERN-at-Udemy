import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  Panel,
  FormGroup,
  Radio,
  Button,
  Modal
} from 'react-bootstrap'
import _ from 'lodash'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

const baseURL = 'http://localhost:3000'

export default class PollItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      poll: null,
      hasLoaded: false,
      selectedOption: null,
      showAlertModal: false,
      ip_address: ''
    }

    this.closeModal = this.closeModal.bind(this)
  }

  closeModal() {
    this.setState({ showAlertModal: false })
  }

  componentWillMount() {
    axios.all([this.fetchPoll(), this.fetchIpAddress()])
      .then(axios.spread((pollData, ipData) => {
        const { poll } = pollData.data
        const { ip } = ipData.data
        this.setState({ poll, ip, hasLoaded: true })
      }))
      .catch(error => {
        console.error('Error fetching single poll', error)
      })
  }

  fetchPoll() {
    return axios.get(`${baseURL}/polls/vote/${this.props.params.id}`)
  }

  fetchIpAddress() {
    return axios.get('https://ipapi.co/json/')
  }

  handleSubmit(e) {
    e.preventDefault()

    const { _id, votedBy } = this.state.poll
    const voter = this.props.route.auth.getUsername()
      ? this.props.route.auth.getUsername()
      : this.state.ip

    if (!votedBy.includes(voter)) {
      axios.post(`${baseURL}/polls/vote/${_id}`, { voter, vote: this.state.selectedOption })
        .then(({ data }) => {
          this.setState({ poll: data.poll, selectedOption: null })
        })
        .catch(error => {
          console.error('Error posting a vote to single poll', error)
        })
    }
    else {
      this.setState({ showAlertModal: true })
    }

  }

  renderPollOptions() {
    const { results } = this.state.poll
    return _.map(results, (value, option) => {
      return (
        <Radio
          key={option}
          name="vote"
          value={option}
          checked={option === this.state.selectedOption}
          onChange={(e) => this.setState({ selectedOption: e.target.value })}
        >
          {option}
        </Radio>
      )
    })
  }

  renderChart() {
    const { results } = this.state.poll
    const totalVotes = _.reduce(results, (acc, num, key) => {
      return acc + num
    }, 0)

    if (totalVotes) {
      const data = _.map(results, (num, option) => {
        return { option, num }
      })
      return (
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="option" />
          <YAxis allowDecimals={false} />
          <Bar dataKey="num" fill="#8884d8" />
        </BarChart>
      )
    }
    else {
      return (
        <h1>No Votes Yet</h1>
      )
    }
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
          <Col xs={6}>
            {this.renderChart()}
          </Col>
        </Row>
        <Modal show={this.state.showAlertModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Already Voted!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>This ip or username has already voted on this poll.</p>
          </Modal.Body>
        </Modal>
      </Grid>
    )
  }
}
