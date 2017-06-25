import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  CartesianGrid,
  Tooltip
} from 'recharts'
import io from 'socket.io-client'
import _ from 'lodash'

import { actionCreators as actions } from '../../actions'
const socket = io.connect()

const colors = [
  '#82ca9d',
  '#C0392B',
  '#2980B9',
  '#27AE60',
  '#E67E22'
]

class App extends Component {

  componentDidMount() {
    socket.on('init', this.props.actions.updateStocks)
  }

  renderChart() {
    return (
      <LineChart width={730} height={250} data={this.props.stocks.chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Legend />
        <Tooltip />
        {this.renderChartLines()}
      </LineChart>
    )
  }

  renderChartLines() {
    return this.props.stocks.tickers.map(ticker => {
      return (
        <Line key={ticker} type="monotone" dataKey={ticker} stroke={_.sample(colors)} />
      )
    })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            {this.props.stocks.tickers.length ? this.renderChart() : null}
          </Col>
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
