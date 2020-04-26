import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import moment from 'moment';

const { uuid } = require('uuidv4');

const EventLabels = ({ resourceList, currentBookings }) => (
  <Col md={12} lg={12} xl={3}>
    <Card className="card--not-full-height">
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Current booking</h5>
        </div>
        {currentBookings && currentBookings.map(currentBookingItem => (
          <>
            <p key={uuid()}>
              <span className="calendar-label" style={{backgroundColor: currentBookingItem.resource.color}} />
              {currentBookingItem.resource.brand} ( {moment(currentBookingItem.bookedStartDateTime).format('HH:mm')} - {moment(currentBookingItem.bookedEndDateTime).format('HH:mm')})
            </p>
            <p>
              <span className="booking__status">
                {currentBookingItem.resource.status}
              </span>
            </p>
          </>
        ))}

      </CardBody>
    </Card>
    <Card className="card--not-full-height">
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Resource labels</h5>
        </div>
        {resourceList && resourceList.map(resource => (
          <p key={uuid()}>
            <span className="calendar-label" style={{backgroundColor: resource.color}} />
            {resource.brand} ({resource.model})
          </p>
        ))}

      </CardBody>
    </Card>
  </Col>
);

EventLabels.propTypes = {
  resourceList: PropTypes.array,
  currentBookings: PropTypes.array,
}
export default EventLabels;
