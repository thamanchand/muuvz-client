import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import Calendar from './Calendar';

const BigCalendar = ({ bookingList, locale }) => {
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
    <Col md={12} lg={12} xl={8}>
      <Card>
        <CardBody>
          <Calendar
            events={events}
            locale={locale}
          />
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
  }).isRequired,
  ),
  locale: PropTypes.string,
};

export default BigCalendar;
