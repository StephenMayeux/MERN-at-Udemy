import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actionCreators } from '../../actions'

import Header from '../../components/Header'

class App extends Component {
  render() {
    const { actions, uiState } = this.props
    const childrenWithProps = React.cloneElement(this.props.children, { actions, uiState })
    return (
      <div>
        <Header />
        {childrenWithProps}
      </div>
    )
  }
}

const mapStateToProps = ({ uiState }) => {
  return { uiState }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
