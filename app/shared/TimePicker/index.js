import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class TimePickerField extends PureComponent {

  state = {
    startTime: moment("18:00", "HH:mm").toDate(),
  };

  onTimeChange = (changedTime) => {
    const { endTimeChanged, startTimeChanged, input } = this.props;

    this.setState({
      startTime: moment(changedTime, "HH:mm").toDate(),
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
