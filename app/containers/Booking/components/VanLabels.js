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
            <div className="booking__label">
              {currentBookingItem.resource.status ==='Available' && (
                <>
                  <span className="booking__label_status">AVAILABLE</span>
                  <span className="booking__action"> ACCEPT </span>
                </>
              )}
              {currentBookingItem.resource.status ==='Booked' && (
                <>
                  <span className="booking__label_status">BOOKED</span>
                  <span className="booking__action"> ACCEPT </span>
                </>
              )}
              {currentBookingItem.resource.status ==='Inuse' && (
                <>
                  <span className="booking__label_status">IN USE</span>
                </>
              )}
              {currentBookingItem.resource.status ==='Waiting' && (
                <>
                  <span className="booking__label_status">WAITING</span>
                  <span className="booking__action"> WAITING </span>
                </>
              )}
              {currentBookingItem.resource.status ==='Cancelled' && (
                <>
                  <span className="booking__label_status">CANCELLED</span>
                </>
              )}
            </div>
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
