import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import Layout from '../Layout/index';
import Statistics from './components/Statistics';
import BigCalendar from './components/BigCalendar';
import EventLabels from './components/VanLabels';

const BookingDashboard = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Container className="dashboard container">
        <Row>
          <Col md={12}>
            <h3 className="page-title">Booking</h3>
          </Col>
        </Row>
        <Row>
          <Statistics />
        </Row>
        <Row>
          <div className="container dashboard">
            <Row>
              <BigCalendar />
              <EventLabels />
            </Row>
          </div>
        </Row>
      </Container>
    </div>
  </div>
);

export default BookingDashboard;
