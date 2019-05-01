import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import CardsHeartIcon from 'mdi-react/CardsHeartIcon';

const Favourite = () => (
  <Col md={12} xl={3} lg={6} xs={12}>
    <Card>
      <CardBody className="dashboard__booking-card">
        <div className="dashboard__booking-total-container">
          <h5 className="dashboard__booking-total-title">34</h5>
          <CardsHeartIcon className="dashboard__trend-icon" />
        </div>
        <h5 className="dashboard__booking-total-description">Favourite</h5>
      </CardBody>
    </Card>
  </Col>
);

export default Favourite;
