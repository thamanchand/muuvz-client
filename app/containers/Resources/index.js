import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import ResourceList from './components/ResourceList';
import Statistics from '../Booking/components/Statistics';
import Layout from '../Layout/index';

class Resources extends React.PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Layout />
        <div className="container__wrap">
          <Container className="dashboard container">
            <Row>
              <Col md={12}>
                <h3 className="page-title">Resources</h3>
              </Col>
            </Row>
            <Row>
              <Statistics />
            </Row>
            <Row>
              <ResourceList />
            </Row>
          </Container>
        </div>
      </div>
    );
  }

}

export default Resources;
