import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, Col } from 'reactstrap';

const EventLabels = ({ bookingList }) => (
  <Col md={12} lg={12} xl={3}>
    <Card className="card--not-full-height">
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Resource labels</h5>
        </div>
        {bookingList.map(event => (
          <p>
            <span className="calendar-label" style={{backgroundColor: event.resource.color}} /> {event.resource.brand}
          </p>
        ))}

      </CardBody>
    </Card>
  </Col>
);

EventLabels.propTypes = {
  bookingList: PropTypes.arrayOf(PropTypes.shape({
    event: PropTypes.id,
    title: PropTypes.string,
    start: PropTypes.obj,
    end: PropTypes.obj,
    color: PropTypes.string
  }).isRequired
  )
};

export default EventLabels;
