import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

class DateTimePickerField extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
    };
  }

  handleChange = date => {
    const { input, startDateChanged, endDateChanged } = this.props;
    this.setState({
      startDate: date,
    });

    if (input.name === 'dropOfftDateTime') {
      input.onChange(date);
      endDateChanged(date)
    }
    else if (input.name === 'pickupDateTime') {
      input.onChange(date);
      startDateChanged(date)
    }
  };

  render() {
    const { startDate } = this.state;
    const { disabled, input } = this.props;
    const initialDate = input.value ? Date.parse(input.value) : startDate;
    return (
      <div className="date-picker">
        <DatePicker
          timeFormat="HH:mm"
          className="form__form-group-datepicker"
          selected={initialDate}
          onChange={this.handleChange}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm"
          dropDownMode="select"
          defaultValue="2019"
          disabled={disabled}
          minDate={new Date()}
        />
      </div>
    );
  }
}

DateTimePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool,
  startDateChanged: PropTypes.object,
  endDateChanged: PropTypes.object,
}

const renderDateTimePickerField = props => {
  const { input, disabled, meta, endDateChanged, startDateChanged } = props;
  return <DateTimePickerField
    input={input}
    disabled={disabled}
    meta={meta}
    endDateChanged={endDateChanged}
    startDateChanged={startDateChanged}
  />;
};

renderDateTimePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.object,
  startDateChanged: PropTypes.object,
  endDateChanged: PropTypes.object,
};

export default renderDateTimePickerField;
