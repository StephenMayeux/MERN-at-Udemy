import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap'
import axios from 'axios'

const baseURL = 'http://localhost:3000'

export default class CreatePollItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      options: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()

    const username = this.props.route.auth.getUsername()
    const idToken = this.props.route.auth.getToken()
    const config = { headers: { 'Authorization': `Bearer ${idToken}` } }
    const createdBy = username

    let { title, options } = this.state
    options = options.split(',').map(option => option.trim())

    const body = {
      title,
      options,
      createdBy
    }

    axios.post(`${baseURL}/polls/create`, body, config)
      .then(({ data }) => {
        browserHistory.push(`/vote/${data.poll._id}`)
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formHorizontalTitle">
              <Col componentClass={ControlLabel} sm={2}>
                Name of Poll
              </Col>
              <Col sm={10}>
                <FormControl
                  name="title"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.title}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalOptions">
              <Col componentClass={ControlLabel} sm={2}>
                Options, seperated by commas
              </Col>
              <Col sm={10}>
                <FormControl
                  name="options"
                  componentClass="textarea"
                  onChange={this.handleChange}
                  value={this.state.options}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit" className="btn btn-primary">
                  Create Poll!
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Row>
      </Grid>
    )
  }
}
