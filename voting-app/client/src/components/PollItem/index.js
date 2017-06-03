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

    if (!votedBy.includes(this.state.ip)) {
      axios.post(`${baseURL}/polls/vote/${_id}`, { voter: this.state.ip, vote: this.state.selectedOption })
        .then(({ data }) => {
          this.setState({ poll: data.poll })
        })
        .catch(error => {
          console.error('Error fetching single poll', error)
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
        <Modal show={this.state.showAlertModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Already Voted!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>This ip address has already voted on this poll.</p>
          </Modal.Body>
        </Modal>
      </Grid>
    )
  }
}
