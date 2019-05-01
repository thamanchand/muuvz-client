import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Rating from './components/Rating';
import TotalCustomers from './components/TotalCustomers';
import TotalBookings from './components/TotalBookings';
import Favourite from './components/Favourite';
import Layout from '../Layout/index';

class BookingDashboard extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    return (
      <div>
        <Layout />
        <div className="container__wrap">
          <Container className="dashboard container">
            <Row>
              <Col md={12}>
                <h3 className="page-title">
                  {t('dashboard_booking.page_title')}
                </h3>
              </Col>
            </Row>
            <Row>
              <Rating />
              <TotalBookings />
              <TotalCustomers />
              <Favourite />
            </Row>
            <Row>
              <p>Test</p>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default BookingDashboard;
