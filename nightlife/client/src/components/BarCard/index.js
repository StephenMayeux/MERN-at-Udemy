import React from 'react'
import { Thumbnail, Button, Col } from 'react-bootstrap'

import './style.css'

const BarCard = (props) => {
  const { image_url, name } = props
  return (
    <Col xs={4}>
      <Thumbnail src={image_url}>
        <h3>{name}</h3>
        <Button bsStyle="primary">Check In</Button>
      </Thumbnail>
    </Col>
  )
}

export default BarCard
