import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';

const TotalCustomers = () => (
  <Col md={12} xl={3} lg={6} xs={12}>
    <Card>
      <CardBody className="dashboard__booking-card">
        <div className="dashboard__booking-total-container">
          <h5 className="dashboard__booking-total-title dashboard__booking-total-title--blue">
            3 235
          </h5>
          <TrendingUpIcon className="dashboard__trend-icon" />
        </div>
        <h5 className="dashboard__booking-total-description">
          Total customers
        </h5>
      </CardBody>
    </Card>
  </Col>
);

export default TotalCustomers;
