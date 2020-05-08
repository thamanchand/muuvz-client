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


const PasswordResetForm = ({ onPasswordResetHandler, isPasswordResetting }) => (
  <Form
    onSubmit={onSubmit}
    validate={values => { // validate both passowrds are same
      const errors = {};
      if (values.password !== values.passwordConfirmation) {
        errors.passwordConfirmation = 'Password didnt matched';
      }
      if (!values.password) {
        errors.password = 'Password cant be blank';
      }
      if (!values.passwordConfirmation) {
        errors.passwordConfirmation = 'Confirm password cant be blank';
      }
      return errors
    }}
    render={({ handleSubmit, form, values }) => (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__form-group">
          <span className="form__form-group-label">Password</span>
          <div className="form__form-group-field">
            <Field
              name="password"
              component="input"
              type='password'
              placeholder="Password"
            />
          </div>
          <Error name="password" />
        </div>

        <div className="form__form-group">
          <span className="form__form-group-label">Re-Password</span>
          <div className="form__form-group-field">
            <Field
              name="passwordConfirmation"
              component="input"
              type='password'
              placeholder="Password"
            />

          </div>
          <Error name="passwordConfirmation" />
        </div>
        <div className="account__btns">
          <button
            className="rounded btn btn-success"
            type="submit"
            disabled={isPasswordResetting}
            onClick={() => onPasswordResetHandler(values)}>Reset my password</button>
        </div>

      </form>
    )}
  />
);

PasswordResetForm.propTypes = {
  onPasswordResetHandler: PropTypes.func,
  isPasswordResetting:PropTypes.bool,

};

export default PasswordResetForm;
