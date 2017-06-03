import React from 'react'
import { IndexLink, Link } from 'react-router'
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'
import './style.css'

const displayButtons = (auth) => {
  if (auth.loggedIn()) {
    return (
      <Nav pullRight>
        <NavItem eventKey={1}>
          <Link className="link" to="/vote">See Polls</Link>
        </NavItem>
        <NavItem eventKey={2}>
          <Link className="link" to="/mypolls">My Polls</Link>
        </NavItem>
        <NavItem eventKey={3}>
          <Link className="link" to="/create">Create Polls</Link>
        </NavItem>
        <NavItem eventKey={4}>
          <Link className="link" onClick={auth.logout.bind(this)}>Logout</Link>
        </NavItem>
      </Nav>
    )
  }
  return (
    <Nav pullRight>
      <NavItem eventKey={1}>
        <Link className="link" to="/vote">See Polls</Link>
      </NavItem>
      <NavItem eventKey={2}>
        <Link className="link" onClick={auth.login.bind(this)}>Sign In</Link>
      </NavItem>
    </Nav>
  )
}

const Header = (props) => {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <IndexLink to="/">Voting App</IndexLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {displayButtons(props.auth)}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header
