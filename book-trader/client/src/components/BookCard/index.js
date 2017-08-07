import React from 'react'
import {
  Thumbnail,
  Button,
  Col,
  Label,
  Glyphicon
} from 'react-bootstrap'
import { Link } from 'react-router'
import _ from 'lodash'

import './style.css'

const renderAuthors = (authors) => {
  if (authors.length === 0) return null
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

const renderButtons = ({ requested_by, areMyBooks }) => {
  if (areMyBooks) {
    let label = requested_by.length.toString()
    label += requested_by.length === 1 ? ' Request' : ' Requests'
    return (
      <div>
        <Link to="requests">
          <Button bsStyle="primary">{label}</Button>
        </Link>
        <Button bsStyle="danger" className="pull-right">Delete</Button>
      </div>
    )
  }
}

const BarCard = (props) => {
  const { book: { authors, thumbnail, title }, requested_by, _id, areMyBooks } = props
  return (
    <Col xs={4}>
      <Thumbnail src={thumbnail}>
        <h3>{_.truncate(title, { length: 25 })}</h3>
        {renderAuthors(authors)}
        {renderButtons({ requested_by, areMyBooks })}
      </Thumbnail>
    </Col>
  )
}

export default BarCard
