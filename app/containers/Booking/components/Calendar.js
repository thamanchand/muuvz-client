import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import moment from 'moment';

const localizer = BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);


export default class CalendarComponent extends PureComponent {
  static propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        allDay: PropTypes.bool,
        start: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date),
        priority: PropTypes.string,
      }),
    ).isRequired,
    small: PropTypes.bool,
  };

  static defaultProps = {
    small: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      events: props.events,
    };
  }

  moveEvent = ({ event, start, end }) => {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents,
    });
  };


  eventStyleGetter = event => {
    const style = {
      backgroundColor: event.color,
      border: 'none',
    };

    return {
      style,
    };
  };

  render() {
    const { small, events } = this.props;

    return (
      <div className={`calendar${small ? ' calendar--small' : ''}`}>
        <DragAndDropCalendar
          localizer={localizer}
          events={events}
          views={['month', 'week', 'day']}
          popup={false}
          step={60}
          timeslots={1}
          showMultiDayTimes
          onEventDrop={this.moveEvent}
          eventPropGetter={this.eventStyleGetter}
          messages={{
            previous: <span className="lnr lnr-chevron-left" />,
            next: <span className="lnr lnr-chevron-right" />,
          }}
        />
      </div>
    );
  }
}
