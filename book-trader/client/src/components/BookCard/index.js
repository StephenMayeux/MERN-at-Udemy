import React from 'react'
import {
  Thumbnail,
  Button,
  Col
} from 'react-bootstrap'
import { Link } from 'react-router'
import _ from 'lodash'

import './style.css'

const renderAuthors = (authors) => {
  if (_.isEmpty(authors)) return null
  return authors.reduce((acc, author, i, a) => {
    acc += author
    if (a.length === 2 && i === 0) {
      acc += ' and '
    }
    else if (a.length >= 3 && i !== a.length - 1) {
      acc += ', '
    }
    return acc
  }, '')
}

const renderButtons = (props) => {
  const { requested_by, areMyBooks, actions, _id } = props
  if (areMyBooks) {
    let label = requested_by.length.toString()
      label += requested_by.length === 1 ? ' Request' : ' Requests'
    return (
      <div>
        <Link to="requests">
          <Button bsStyle="primary">{label}</Button>
        </Link>
        <Button
          bsStyle="danger"
          className="pull-right"
          onClick={() => actions.deleteBook(_id)}
        >
          Delete
        </Button>
      </div>
    )
  }
}

const BookCard = (props) => {
  const { book: { authors, thumbnail, title }, requested_by, _id, areMyBooks } = props
  return (
    <Col xs={4}>
      <Thumbnail src={thumbnail}>
        <h3>{_.truncate(title, { length: 25 })}</h3>
        {renderAuthors(authors)}
        {renderButtons(props)}
      </Thumbnail>
    </Col>
  )
}

export default BookCard
