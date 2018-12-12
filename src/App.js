import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';

import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg="12">
            <Login/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
