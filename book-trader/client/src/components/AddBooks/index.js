import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  Form,
  FormControl,
  Thumbnail,
  Button,
  Label,
  Glyphicon
} from 'react-bootstrap'
import _ from 'lodash'

import './style.css'

import BookCard from '../BookCard'

export default class AddBooks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.searchForBooks(this.state.searchTerm)
    this.setState({ searchTerm: '' })
  }

  renderBooks() {
    const { books, actions } = this.props
    if (_.isEmpty(books)) {
      return (
        <p style={{ marginRight: 15 }}>Your search came up empty.</p>
      )
    }
    return _.map(books, (book, i) => {
      return (
        <div key={book._id}>
          <BookCard
            {...book}
            actions={actions}
            areMyBooks={true}
          />
          {(i + 1) % 3 === 0
            ? <div className="clearfix visible-lg-block visible-md-block"></div>
            : null
          }
        </div>
      )
    })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>Add Books</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form inline onSubmit={this.handleSubmit}>
              <FormControl
                type="text"
                name="searchTerm"
                onChange={this.handleChange}
                value={this.state.searchTerm}
              />
              <Button type="submit" bsStyle="primary">Search</Button>
            </Form>
          </Col>
        </Row>
        <Row>
        </Row>
      </Grid>
    )
  }
}
