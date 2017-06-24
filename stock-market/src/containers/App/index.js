import React, { Component } from 'react'
import io from 'socket.io-client'

const socket = io.connect()

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      symbols: null
    }
  }

  componentDidMount() {
    socket.on('symbols', (data) => {
      console.log('these are symbols from server', data)
    })
  }

  render() {
    return (
      <h1>Hello World!</h1>
    )
  }
}
