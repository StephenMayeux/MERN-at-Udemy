import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actionCreators } from '../../actions'

import Header from '../../components/Header'

class App extends Component {
  render() {
    const { actions, uiState, auth } = this.props
    const childrenWithProps = React.cloneElement(this.props.children, { actions, uiState })
    return (
      <div>
        <Header
          actions={actions}
          uiState={uiState}
          auth={auth}
          pathname={this.props.location.pathname}
        />
        {childrenWithProps}
      </div>
    )
  }
}

const mapStateToProps = ({ uiState, auth }) => {
  return { uiState, auth }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
