import React, { Component } from 'react'
import { Link } from 'react-router'
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
    this.hideErrors = this.hideErrors.bind(this)
  }

  displayErrors() {
    if (!this.props.uiState.signInFailure) return null
    return (
      <span className="error">
        {this.props.uiState.signInFailure}
      </span>
    )
  }

  hideErrors() {
    this.props.actions.clearMessages()
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

  isActive(pathname) {
    return this.props.pathname === pathname ? 'active' : ''
  }

  renderMainMenu() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li className={this.isActive('/mybooks')}><Link to="mybooks">My Library</Link></li>
        <li className={this.isActive('/addbooks')}><Link to="addbooks">Add Books</Link></li>
        <li className={this.isActive('requests')}><Link to="requests">Make a Request</Link></li>
        <li><a href="#">Log Out</a></li>
      </ul>
    )
  }

  renderSignIn() {
    const { email, password } = this.state
    return (
      <form onSubmit={this.handleSubmit} className="navbar-form navbar-right">
        {this.displayErrors()}
        <div className="form-group">
          <input
            value={email}
            onChange={this.handleChange}
            name="email"
            type="text"
            placeholder="Email"
            className="form-control"
            onFocus={this.hideErrors}
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
            onFocus={this.hideErrors}
          />
        </div>
        <button type="submit" className="btn btn-success">Sign In</button>
      </form>
    )
  }

  render() {
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
            {this.props.auth.isLoggedIn ? this.renderMainMenu() : this.renderSignIn()}
          </div>
        </div>
      </nav>
    )
  }
}
