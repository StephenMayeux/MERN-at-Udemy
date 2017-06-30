import React, { Component } from 'react'
import {
  FormControl,
  Button
} from 'react-bootstrap'
import './style.css'

export default class AddStockCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formValue: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.props.tickers.includes(this.state.formValue.toUpperCase())) {
      this.props.displayMessage('This stock is already displayed')
    }
    else {
      this.props.socket.emit('addStock', { symbol: this.state.formValue.toUpperCase() })
      this.setState({
        formValue: ''
      })
    }
  }

  onFocus() {
    console.log('got called')
    this.props.hideMessage()
  }

  render() {
    return (
      <div className="tickerCardWrapper">
        <h2>Add New Stock</h2>
        <form onSubmit={this.handleSubmit}>
          <FormControl
            onFocus={this.onFocus}
            type="text"
            value={this.state.formValue}
            name="formValue"
            onChange={this.handleChange}
          />
          <Button type="submit" bsStyle="primary">
            Submit
          </Button>
        </form>
        {this.props.errorMessage
          ? <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
          : null
        }
      </div>
    )
  }
}
