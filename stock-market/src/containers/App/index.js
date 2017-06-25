import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import io from 'socket.io-client'

import LineChart from '../../components/LineChart'
import { actionCreators as actions } from '../../actions'
const socket = io.connect()

class App extends Component {

  componentDidMount() {
    socket.on('init', this.props.actions.updateStocks)
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            {this.props.stocks.tickers.length
              ? <LineChart
                  chartData={this.props.stocks.chartData}
                  tickers={this.props.stocks.tickers}
                />
              : null}
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
