import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import moment from 'moment';

const { uuid } = require('uuidv4');

const EventLabels = ({ resourceList, currentBookings, acceptBookingHandler, cancelBookingHandler }) => (
  <Col md={12} lg={12} xl={3}>
    <Card className="card--not-full-height">
      <CardBody className="currentbooking__label">
        <div className="card__title">
          <h5 className="bold-text">Current booking</h5>
        </div>
        {currentBookings && currentBookings.length ? (
          currentBookings && currentBookings.map(currentBookingItem => (
            <>
              <p key={uuid()}>
                <span className="calendar-label" style={{backgroundColor: currentBookingItem.resource.color}} />
                {currentBookingItem.resource.brand} ( {moment(currentBookingItem.bookedStartDateTime).format('HH:mm')} - {moment(currentBookingItem.bookedEndDateTime).format('HH:mm')})
              </p>
              <div className="booking__label">
                {currentBookingItem.resource.status ==='Requested' && (
                  <>
                    <span className="booking__label_status">REQUESTED</span>
                    <span
                      role="presentation"
                      className="booking__action"
                      onClick={() => acceptBookingHandler(currentBookingItem.id, currentBookingItem.resource.id)}
                    > ACCEPT
                    </span>
                    <span
                      role="presentation"
                      className="booking__action"
                      onClick={() => cancelBookingHandler(currentBookingItem.id, currentBookingItem.resource.id)}
                    > CANCEL
                    </span>
                  </>
                )}
                {currentBookingItem.resource.status ==='Booked' && (
                  <>
                    <span className="booking__label_status">BOOKED</span>
                  </>
                )}
                {currentBookingItem.resource.status ==='Inuse' && (
                  <>
                    <span className="booking__label_status">IN USE</span>
                  </>
                )}

                {currentBookingItem.resource.status ==='Cancelled' && (
                  <>
                    <span className="booking__label_status">CANCELLED</span>
                  </>
                )}
              </div>
            </>
          ))
        ) : (
          <p>No booking yet!</p>
        )}
      </CardBody>
    </Card>
    <Card className="card--not-full-height">
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Your vans</h5>
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
  acceptBookingHandler: PropTypes.func,
  cancelBookingHandler: PropTypes.func,
}
export default EventLabels;
