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
    const { input } = this.props;
    this.setState({
      startDate: date,
    });
    input.onChange(date);
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
  disabled: PropTypes.bool
}

const renderDateTimePickerField = props => {
  const { input, disabled, meta } = props;
  return <DateTimePickerField input={input} disabled={disabled} meta={meta} />;
};

renderDateTimePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.object,
};

export default renderDateTimePickerField;
