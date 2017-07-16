import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actionCreators } from '../../actions'

import Header from '../../components/Header'

class App extends Component {
  render() {
    const { actions } = this.props
    const childrenWithProps = React.cloneElement(this.props.children, { actions })
    return (
      <div>
        <Header />
        {childrenWithProps}
      </div>
    )
  }
}

const mapStateToProps = ({ msg }) => {
  return { msg }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
