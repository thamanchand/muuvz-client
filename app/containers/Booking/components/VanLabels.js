import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, Col } from 'reactstrap';

const EventLabels = ({ resourceList }) => (
  <Col md={12} lg={12} xl={3}>
    <Card className="card--not-full-height">
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Resource labels</h5>
        </div>
        {resourceList && resourceList.map(resource => (
          <p>
            <span className="calendar-label" style={{backgroundColor: resource.color}} /> {resource.brand}
          </p>
        ))}

      </CardBody>
    </Card>
  </Col>
);

EventLabels.propTypes = {
  resourceList: PropTypes.array,
}
export default EventLabels;
