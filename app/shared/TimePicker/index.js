import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class TimePickerField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      minTime: this.calculateMinTime(new Date()),
    };
    this.calculateMinTime = this.calculateMinTime.bind(this);
  }

  // add these two functions to your component
  calculateMinTime = (date) => {
    const isToday = moment(date).isSame(moment(), 'day');
    if (isToday) {
      const nowAddOneHour = moment(new Date()).add({hours: 1}).toDate();
      return nowAddOneHour;
    }
    return moment().startOf('day').toDate();
  }

  onTimeChange = (changedTime) => {
    const { endTimeChanged, startTimeChanged, input } = this.props;

    this.setState({
      startTime: moment(changedTime, "HH:mm").toDate(),
      minTime: this.calculateMinTime(changedTime),
    });

    if (input.name === 'pickupTime') {
      input.onChange(moment(changedTime).format('HH:mm'));
      startTimeChanged(changedTime);
    }
    else if (input.name === 'dropOffTime') {
      input.onChange(moment(changedTime).format('HH:mm'));
      endTimeChanged(changedTime)
    }
  }

  render() {
    const { startTime } = this.state;
    const { disabled } = this.props;

    return (
      <div className="form__form-group-field timepicker">
        <TimePicker
          className="form__form-group-datepicker"
          selected={startTime}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
          onChange={this.onTimeChange}
          disabled={disabled}
          minDate={new Date()}
          minTime={this.state.minTime}
          maxTime={moment().endOf('day').toDate()} // set to 23:59 pm today
        />
      </div>
    );
  }
}

TimePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool,
  endTimeChanged: PropTypes.func,
  startTimeChanged: PropTypes.func,
};

const renderTimePickerField = (props) => {
  // const { input, timeMode, theme } = props;
  const {
    input,
    disabled,
    meta,
    endTimeChanged,
    startTimeChanged,
  } = props;

  return (
    <TimePickerField
      input={input}
      disabled={disabled}
      meta={meta}
      endTimeChanged={endTimeChanged}
      startTimeChanged={startTimeChanged}
    />
  );
};

renderTimePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool,
  endTimeChanged: PropTypes.func,
  startTimeChanged: PropTypes.func,
  meta: PropTypes.object,
};

export default renderTimePickerField;
