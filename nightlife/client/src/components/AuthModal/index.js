import React from 'react'
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  Button
} from 'react-bootstrap'

const AuthModal = ({ show, onHide, onSubmit }) => {
  return (
    <Modal show={show}>
      <Modal.Header closeButton onHide={onHide}>
        Sign In or Sign Up
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit} horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" bsStyle="primary">
                Sign Up or Sign In
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AuthModal
