import React, { Component } from 'react'
import './style.css'


export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { email, password } = this.state
    this.props.actions.signInUser({ email, password })
    this.setState({ email: '', password: '' })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { email, password } = this.state
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Book Trader</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <form onSubmit={this.handleSubmit} className="navbar-form navbar-right">
              <div className="form-group">
                <input
                  value={email}
                  onChange={this.handleChange}
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  value={password}
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-success">Sign In</button>
            </form>
          </div>
        </div>
      </nav>
    )
  }
}
