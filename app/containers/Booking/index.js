import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Rating from './components/Rating';
import TotalCustomers from './components/TotalCustomers';
import TotalBookings from './components/TotalBookings';
import Favourite from './components/Favourite';
import Layout from '../Layout/index';
import TimelineCalendar from './components/TimelineCalendar';

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
          <Rating />
          <TotalBookings />
          <TotalCustomers />
          <Favourite />
        </Row>
        <Row>
          <div className="container">
            <Container className="dashboard">
              <Row>
                <Col md={12}>
                  <TimelineCalendar />
                </Col>
              </Row>
            </Container>
          </div>
        </Row>
      </Container>
    </div>
  </div>
);

export default BookingDashboard;
