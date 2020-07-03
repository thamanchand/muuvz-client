import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isMobileOnly } from 'react-device-detect';
import PropTypes from 'prop-types';
import moment from 'moment';
import fi from 'date-fns/locale/fi';
import en from 'date-fns/locale/en-GB';

import { makeSelectLocale } from '../../containers/LanguageProvider/selectors';

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
      input.onChange(moment(date).format('YYYY-MM-DD'));
      startDateChanged(date)
    }
    else if (input.name === 'dropOffDate') {
      input.onChange(moment(date).format('YYYY-MM-DD'));
      endDateChanged(date)
    }
  };

  render() {
    const { startDate } = this.state;
    const { disabled, input, locale } = this.props;
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
          locale={locale === 'fi' ? fi : en }
        >
          <div className="select__time">Please select date, hrs and mins</div>
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
  locale: PropTypes.string,
}

const renderDatePickerField = (props) => {
  const { input, disabled, meta, endDateChanged, startDateChanged, locale } = props;
  return <DatePickerField
    input={input}
    disabled={disabled}
    meta={meta}
    endDateChanged={endDateChanged}
    startDateChanged={startDateChanged}
    locale={locale}
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
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export default connect(
  mapStateToProps,
)(renderDatePickerField);
