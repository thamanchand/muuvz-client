import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import Calendar from './Calendar';

const BigCalendar = ({ bookingList }) => {
  const events = bookingList.map(event => {
    const mapEvents = {
      id: event.id,
      title: event.resource.brand,
      start: new Date(event.bookedStartDateTime),
      end: new Date(event.bookedEndDateTime),
      color: event.resource.color,
    }
    return mapEvents;
  })

  return (
    <Col md={12} lg={12} xl={9}>
      <Card>
        <CardBody>
          <Calendar events={events} />
        </CardBody>
      </Card>
    </Col>
  )
};

BigCalendar.propTypes = {
  bookingList: PropTypes.arrayOf(PropTypes.shape({
    event: PropTypes.id,
    title: PropTypes.string,
    start: PropTypes.obj,
    end: PropTypes.obj,
    color: PropTypes.string
  }).isRequired
  )
};

export default BigCalendar;
