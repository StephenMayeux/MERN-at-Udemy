import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  Thumbnail,
  Button,
  Label,
  Glyphicon
} from 'react-bootstrap'
import _ from 'lodash'

import './style.css'

import BookCard from '../BookCard'

export default class MyBooks extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { _id } = this.props.auth.user
    this.props.actions.fetchUserBooks(_id)
  }

  renderBooks() {
    const { books, actions } = this.props
    if (_.isEmpty(books)) {
      return (
        <p>You do not have any books yet!</p>
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
            <h1>My Library</h1>
          </Col>
        </Row>
        <Row>
          {this.renderBooks()}
        </Row>
      </Grid>
    )
  }
}
