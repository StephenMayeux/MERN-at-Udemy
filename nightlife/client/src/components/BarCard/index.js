import React from 'react'
import {
  Thumbnail,
  Button,
  Col,
  Label,
  Glyphicon
} from 'react-bootstrap'
import _ from 'lodash'

import './style.css'

const BarCard = (props) => {
  const { image_url, name, isLoggedIn, visitors, toggleCheckIn, id, user } = props
  const buttonText = _.includes(visitors, user) ? 'Check Out' : 'Check In'
  const indicator = _.includes(visitors, user)
    ? <span><Glyphicon glyph="glass" /></span>
    : null

  return (
    <Col xs={4}>
      <Thumbnail src={image_url}>
        <h3>{name}</h3>
        {isLoggedIn
          ? <span style={{ marginRight: 20 }}>
              <Button onClick={() => toggleCheckIn(id)} bsStyle="primary">{buttonText}</Button>
            </span>
          : null
        }
        <span>
          <Label>{`${visitors.length} people are going`}</Label>
        </span>
        {indicator}
      </Thumbnail>
    </Col>
  )
}

export default BarCard
