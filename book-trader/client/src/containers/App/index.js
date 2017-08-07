import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actionCreators } from '../../actions'

import Header from '../../components/Header'

class App extends Component {
  render() {
    const { actions, uiState, auth, books } = this.props
    const allProps = { actions, uiState, auth, books }
    const childrenWithProps = React.cloneElement(this.props.children, allProps)
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

const mapStateToProps = ({ uiState, auth, books }) => {
  return { uiState, auth, books }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
