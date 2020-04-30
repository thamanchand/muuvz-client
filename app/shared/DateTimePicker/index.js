import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

class DateTimePickerField extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      monthChange: false,
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

  monthChanged = () => {
    this.setState({ monthChange: true});
  }

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
          dateFormat="MMMM d, yyyy HH:mm"
          dropDownMode="select"
          defaultValue="2020"
          disabled={disabled}
          minDate={new Date()}
          onSelect={this.monthChanged}
          onDayMouseEnter={this.monthChanged}
          onMonthChange={this.monthChanged}
          onTimeChange={this.monthChanged}
          setOpen={this.monthChanged}
        >
          {this.state.monthChange  && (
            <div className="datepicker__select_time">
              Select booking start & end time!
              <span className="arrow up" />
            </div>
          )}
        </DatePicker>
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
  startDateChanged: PropTypes.func,
  endDateChanged: PropTypes.func,
}

const renderDateTimePickerField = props => {
  console.log("renderDateTimePickerField", props);
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
  startDateChanged: PropTypes.func,
  endDateChanged: PropTypes.func,
};

export default renderDateTimePickerField;
