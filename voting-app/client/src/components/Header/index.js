import React from 'react'
import { IndexLink, Link } from 'react-router'
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'
import './style.css'

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
        <Nav pullRight>
          <NavItem eventKey={1}>
            <Link className="link" to="/vote">See Polls</Link>
          </NavItem>
          <NavItem eventKey={2}>
            <Link className="link" to="/signin">Sign In</Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header
