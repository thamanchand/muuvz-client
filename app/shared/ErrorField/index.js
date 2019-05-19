import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const ErrorField = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error
        ?
        <div className="validation__error">
          {error}
        </div>
        :
        null
    }
  />
);

ErrorField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ErrorField;
