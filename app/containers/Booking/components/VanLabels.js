import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';

const EventLabels = () => (
  <Col md={12} lg={12} xl={3}>
    <Card className="card--not-full-height">
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Van labels</h5>
        </div>
        <p>
          <span className="calendar-label calendar-label--red" /> Renault V3
        </p>
        <p>
          <span className="calendar-label calendar-label--green" /> BMW highland
          events
        </p>
        <p>
          <span className="calendar-label calendar-label--blue" /> Scandia
        </p>
      </CardBody>
    </Card>
  </Col>
);

export default EventLabels;
