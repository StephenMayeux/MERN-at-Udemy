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
  let { _id, title, subtitle, authors, thumbnail } = props
  thumbnail = thumbnail ? thumbnail : ''
  return null
  // props.actions.addBook({ _id, title, subtitle, authors, thumbnail })
}

const SearchResult = (props) => {
  const { authors, thumbnail, title } = props
  return (
    <Col xs={4}>
      <Thumbnail src={thumbnail}>
        <h3>{_.truncate(title, { length: 25 })}</h3>
        {renderAuthors(authors)}
        {renderAddButton(props)}
      </Thumbnail>
    </Col>
  )
}

export default SearchResult
