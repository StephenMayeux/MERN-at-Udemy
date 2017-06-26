import React from 'react'
import {
  Glyphicon
} from 'react-bootstrap'
import './style.css'

const TickerCard = (props) => {
  return (
    <div className="tickerCardWrapper">
      <Glyphicon
        glyph="remove"
        className="pull-right close-icon"
        onClick={() => props.handleDelete(props.ticker)}
      />
      <h2>{props.ticker}</h2>
      <p className="lead">{props.mostRecentClosePrice}</p>
    </div>
  )
}

export default TickerCard
