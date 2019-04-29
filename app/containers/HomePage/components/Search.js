import React from 'react';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';

import TimetableIcon from 'mdi-react/TimetableIcon';

import renderDateTimePickerField from '../../../shared/DateTimePicker/index';
import renderCheckBoxField from '../../../shared/Checkbox/index';

const Search = () => (
  <Form
    onSubmit={() => console.log('submit')}
    render={({ handleSubmit }) => (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__form-group">
          <span className="form__form-group-label">Pickup location</span>
          <div className="form__form-group-field">
            <Field
              name="defaultInput"
              component="input"
              type="text"
              placeholder="Helsinki"
            />
          </div>
        </div>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <Field
              name="70bbfd"
              component={renderCheckBoxField}
              color="#646777"
              className="checkbox-btn  checkbox-btn--colored"
              label="Drop-off at pickup location"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Pickup date & time</span>
          <div className="form__form-group-field">
            <Field name="date_time" component={renderDateTimePickerField} />
            <div className="form__form-group-icon">
              <TimetableIcon />
            </div>
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Drop-off date & time</span>
          <div className="form__form-group-field">
            <Field name="date_time" component={renderDateTimePickerField} />
            <div className="form__form-group-icon">
              <TimetableIcon />
            </div>
          </div>
        </div>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <Link to="/listing">
              <button className="square btn btn-primary" type="button">
                Search{' '}
              </button>
            </Link>
          </div>
        </div>
      </form>
    )}
  />
);

export default Search;
