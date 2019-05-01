import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import StarCircleIcon from 'mdi-react/StarCircleIcon';

const TotalProfitEarned = () => (
  <Col md={12} xl={3} lg={6} xs={12}>
    <Card>
      <CardBody className="dashboard__booking-card">
        <div className="dashboard__booking-total-container">
          <h5 className="dashboard__booking-total-title dashboard__booking-total-title--red">
            2,5
          </h5>
          <StarCircleIcon className="dashboard__trend-icon" />
        </div>
        <h5 className="dashboard__booking-total-description">Rating</h5>
      </CardBody>
    </Card>
  </Col>
);

export default TotalProfitEarned;
