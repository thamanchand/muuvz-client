import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

const onSubmit = () => new Promise(resolve => {
  setTimeout(resolve, 200);
})

// Reusable Error component
const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error
        ?
        <div className="validation__error">
          {error}
        </div>
        : null
    }
  />
);

Error.propTypes = {
  name: PropTypes.string,
};


const ForgotPasswordForm = ({ onForgotPasswordHandler, isLoading }) => (
  <Form
    onSubmit={onSubmit}
    validate={values => { // validate both passowrds are same
      const errors = {};
      if (!values.email) {
        errors.email = 'Email cant be blank';
      }
      return errors
    }}
    render={({ handleSubmit, form, values }) => (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__form-group">
          <span className="form__form-group-label">Email</span>
          <div className="form__form-group-field">
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="abc@muverz.fi"
            />
          </div>
          <Error name="email" />
        </div>
        <div className="account__btns">
          <button
            className="rounded btn btn-success"
            type="submit" onClick={() => onForgotPasswordHandler(values)}
            disabled={isLoading}
          >
            Reset password
          </button>
        </div>

      </form>
    )}
  />
);

ForgotPasswordForm.propTypes = {
  onForgotPasswordHandler: PropTypes.func,
  isLoading: PropTypes.func,
};

export default ForgotPasswordForm;
