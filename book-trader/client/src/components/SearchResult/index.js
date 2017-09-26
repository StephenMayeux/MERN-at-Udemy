import React from 'react'
import {
  Thumbnail,
  Button,
  Col
} from 'react-bootstrap'
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

const renderAddButton = (props) => {
  let { _id, title, subtitle, authors, thumbnail, added } = props
  thumbnail = thumbnail ? thumbnail : ''
  return (
    <Button
      block
      bsStyle="primary"
      onClick={props.actions.addBook.bind(this, { _id, title, subtitle, authors, thumbnail })}
      disabled={added}
    >
      Add
    </Button>
  )
}

const SearchResult = (props) => {
  const { authors, thumbnail, title } = props
  return (
    <Col xs={4}>
      <Thumbnail src={thumbnail}>
        <h3>{_.truncate(title, { length: 25 })}</h3>
        <div>{renderAuthors(authors)}</div>
        <div>{renderAddButton(props)}</div>
      </Thumbnail>
    </Col>
  )
}

export default SearchResult
