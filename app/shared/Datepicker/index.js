import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import { isMobileOnly } from 'react-device-detect';
import PropTypes from 'prop-types';

class DatePickerField extends PureComponent {

  constructor() {
    super();
    this.state = {
      startDate: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = date => {
    const { input, startDateChanged, endDateChanged } = this.props;
    this.setState({
      startDate: date,
    });

    if (input.name === 'pickupDate') {
      input.onChange(date);
      startDateChanged(date)
    }
    else if (input.name === 'dropOffDate') {
      input.onChange(date);
      endDateChanged(date)
    }
  };

  render() {
    const { startDate } = this.state;
    const { disabled, input } = this.props;
    const initialDate = input.value ? Date.parse(input.value) : startDate;

    return (
      <div className="date-picker">
        <DatePicker
          className="form__form-group-datepicker"
          selected={initialDate}
          onChange={this.handleChange}
          dateFormat="dd.MM.yyyy"
          dropDownMode="select"
          popperPlacement="center"
          withPortal={isMobileOnly}
          disabled={disabled}
          minDate={new Date()}
          required
        >
          <div className="select__time">Please select time</div>
        </DatePicker>
      </div>
    );
  }
}

DatePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool,
  startDateChanged: PropTypes.func,
  endDateChanged: PropTypes.func,
}

const renderDatePickerField = (props) => {
  const { input, disabled, meta, endDateChanged, startDateChanged } = props;
  return <DatePickerField
    input={input}
    disabled={disabled}
    meta={meta}
    endDateChanged={endDateChanged}
    startDateChanged={startDateChanged}
  />;
};

renderDatePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.object,
  startDateChanged: PropTypes.func,
  endDateChanged: PropTypes.func,
};

export default renderDatePickerField;
