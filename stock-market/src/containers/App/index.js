import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import io from 'socket.io-client'
import _ from 'lodash'

import LineChart from '../../components/LineChart'
import TickerCard from '../../components/TickerCard'
import { actionCreators as actions } from '../../actions'

import './style.css'

const socket = io.connect()

class App extends Component {

  componentDidMount() {
    socket.on('init', this.props.actions.updateStocks)
  }

  renderChart() {
    if (this.props.stocks.tickers.length) {
      return (
        <LineChart
          chartData={this.props.stocks.chartData}
          tickers={this.props.stocks.tickers}
        />
      )
    }
    return <h2>Loading Data...</h2>
  }

  renderTickerCards() {
    const mostRecentPrices = _.last(this.props.stocks.chartData)

    return this.props.stocks.tickers.map(ticker => {
      return (
        <Col xs={4}>
          <TickerCard
            key={ticker}
            mostRecentClosePrice={mostRecentPrices[ticker]}
            ticker={ticker}
          />
        </Col>
      )
    })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>Stock Market App</h1>
            {this.renderChart()}
          </Col>
        </Row>
        <Row>
          {this.renderTickerCards()}
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = ({ stocks }) => {
  return { stocks }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
