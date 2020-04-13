import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import TimetableIcon from 'mdi-react/TimetableIcon';
import Error from '../ErrorField';

import renderDateTimePickerField from '../DateTimePicker/index';
import renderCheckBoxField from '../Checkbox/index';

const Search = ({ onSearch, disabled }) => (
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
            />
            <div className="form__form-group-icon">
              <TimetableIcon />
            </div>
          </div>
          <Error name="dropOfftDateTime" />
        </div>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <button
              className="square btn btn-primary"
              type="button"
              onClick={() => handleSubmit(values)}
              disabled={!disabled}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    )}
  />
);

Search.propTypes = {
  onSearch: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
};


export default Search;
