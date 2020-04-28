import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import TimetableIcon from 'mdi-react/TimetableIcon';
import moment from 'moment';

import Error from '../ErrorField';
import renderDateTimePickerField from '../DateTimePicker/index';
import renderCheckBoxField from '../Checkbox/index';

const Search = ({ onSearch, disabled, storedValues }) => {
  const [duration, setDuration] = React.useState()
  const [bookingStartDateTime, setBookingStartDateTime] = React.useState();
  const [bookingEndDateTime, setBookingEndDateTime] = React.useState();

  const endDateChange = (endDateTime) => {
    setBookingEndDateTime(moment(endDateTime).format('YYYY/MM/DDTHH:mm'));
    // calculate number of hours
    const bookingHours = moment
      .duration(moment(bookingEndDateTime, 'YYYY/MM/DDTHH:mm')
        .diff(moment(bookingStartDateTime, 'YYYY/MM/DDTHH:mm'))
      ).asHours();
    setDuration(bookingHours);
  }
  const startDateChange = (startDateTime) => {
    setBookingStartDateTime(moment(startDateTime).format('YYYY/MM/DDTHH:mm'));
    // calculate number of hours
    const bookingHours = moment
      .duration(moment(bookingEndDateTime, 'YYYY/MM/DDTHH:mm')
        .diff(moment(bookingStartDateTime, 'YYYY/MM/DDTHH:mm'))
      ).asHours();
    setDuration(bookingHours);
  }
  return (
    <Form
      validate={values => { // validate both passowrds are same
        const errors = {};
        if (!values.location) {
          errors.location = 'Location is required';
        }
        if (!values.pickupDateTime) {
          errors.pickupDateTime = 'Pick up datetime is required';
        }
        if (!values.dropOfftDateTime) {
          errors.dropOfftDateTime = 'Drop off datetime is required';
        }
        return errors
      }}
      onSubmit={(values) => onSearch(values)}
      initialValues={storedValues}
      render={({ handleSubmit, values }) => (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__form-group">
            <span className="form__form-group-label">Pickup location</span>
            <div className="form__form-group-field">
              <Field
                name="location"
                component="input"
                type="text"
                placeholder="Helsinki"
                required
                disabled={!disabled}
              />
            </div>
            <Error name="location" />
          </div>
          <div className="form__form-group">
            <div className="form__form-group-field">
              <Field
                name="dropAtPickUpLocation"
                component={renderCheckBoxField}
                color="#646777"
                className="checkbox-btn  checkbox-btn--colored"
                label="Drop-off at pickup location"
                disabled={!disabled}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Pickup date & time</span>
            <div className="form__form-group-field">
              <Field
                name="pickupDateTime"
                component={renderDateTimePickerField}
                disabled={!disabled}
                startDateChanged={(startDateTime) => startDateChange(startDateTime)}
              />
              <div className="form__form-group-icon">
                <TimetableIcon />
              </div>
            </div>
            <Error name="pickupDateTime" />
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Drop-off date & time</span>
            <div className="form__form-group-field">
              <Field
                name="dropOfftDateTime"
                component={renderDateTimePickerField}
                disabled={!disabled}
                endDateChanged={(endDateTime) => endDateChange(endDateTime)}
              />
              <div className="form__form-group-icon">
                <TimetableIcon />
              </div>
            </div>
            <Error name="dropOfftDateTime" />
          </div>
          <div className="form__form-group">
            <p>
              {duration}
            </p>
            <div className="form__form-group-field">
              <button
                className="rounded btn btn-success"
                type="button"
                onClick={() => handleSubmit(values)}
                disabled={!disabled}
                storedValues={storedValues}
              >
                SEARCH VANS
              </button>
            </div>
          </div>
        </form>
      )}
    />
  )
};

Search.propTypes = {
  onSearch: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  storedValues: PropTypes.object,
};


export default Search;
