import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'moment/locale/fi'; // new
import { FormattedMessage } from 'react-intl';

import messages from '../messages';

const localizer = BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const allMessages = {
  // new
  previous: <span className="lnr lnr-chevron-left" />,
  next: <span className="lnr lnr-chevron-right" />,
  today: <FormattedMessage {...messages.today} />,
  month: <FormattedMessage {...messages.month} />,
  week: <FormattedMessage {...messages.week} />,
  day: <FormattedMessage {...messages.day} />,
  agenda: <FormattedMessage {...messages.agenda} />,
};

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

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
    locale: PropTypes.string,
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
      border: '1',
    };

    return {
      style,
    };
  };

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map(existingEvent =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent,
    );

    this.setState({
      events: nextEvents,
    });
  };

  render() {
    const { small, events, locale } = this.props;

    return (
      <div className={`calendar${small ? ' calendar--small' : ''}`}>
        <DragAndDropCalendar
          culture={locale}
          localizer={localizer}
          events={events}
          views={[allViews[0], allViews[1], allViews[3], allViews[4]]}
          popup={false}
          step={60}
          timeslots={1}
          showMultiDayTimes
          onEventDrop={this.moveEvent}
          eventPropGetter={this.eventStyleGetter}
          messages={allMessages}
        />
      </div>
    );
  }
}
