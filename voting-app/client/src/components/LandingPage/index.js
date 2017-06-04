import React from 'react'
import { browserHistory } from 'react-router'
import {
  ButtonToolbar,
  Button,
  Jumbotron,
  Grid,
  Col,
  Row
} from 'react-bootstrap'

const LandingPage = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <Jumbotron>
            <h1>Voting App</h1>
            <p>Anybody can vote, but you have to register to create polls.</p>
            <ButtonToolbar>
              <Button bsStyle="primary">
                Sign In Account
              </Button>
              <Button
                bsStyle="default"
                onClick={() => browserHistory.push('vote')}
              >
                Vote Anyway
              </Button>
            </ButtonToolbar>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <h2>Share</h2>
          <p>You can share your polls with friends and foes with lightning speed and finally settle those bitter disputes. They do not need to register.</p>
        </Col>
        <Col xs={4}>
          <h2>Create</h2>
          <p>Make unlimited polls with an unlimited number of options. Instantly see the results in a beautiful bar chart.</p>
        </Col>
        <Col xs={4}>
          <h2>Manage</h2>
          <p>Easily add more voting options to existing polls. And once the dust has clear and the people have spoken, delete the polls you no longer need.</p>
        </Col>
      </Row>
      <hr />
      <p>Stephen Mayeux, &copy; 2017</p>
    </Grid>
  )
}

export default LandingPage;
