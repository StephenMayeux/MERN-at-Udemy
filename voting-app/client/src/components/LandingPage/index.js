import React from 'react'
import { Grid, Col, Row } from 'react-bootstrap'

const LandingPage = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <div className="jumbotron">
            <h1>Voting App</h1>
            <p>Anybody can vote, but you have to register to create polls.</p>
          </div>
        </Col>
      </Row>
    </Grid>
  )
}

export default LandingPage;
