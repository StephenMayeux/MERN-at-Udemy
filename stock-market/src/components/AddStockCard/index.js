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
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="tickerCardWrapper">
        <h2>Add New Stock</h2>
        <form>
          <FormControl
            type="text"
            value={this.state.formValue}
            name="formValue"
            onChange={this.handleChange}
          />
          <Button type="submit" bsStyle="primary">
            Submit
          </Button>
        </form>
      </div>
    )
  }
}
