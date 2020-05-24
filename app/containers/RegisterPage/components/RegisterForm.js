import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import ClipLoader from "react-spinners/ClipLoader";

import renderCheckBoxField from '../../../shared/Checkbox/index';

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


const RegisterForm = ({ onRegisterHandler, isEmailRegistered }) => (
  <Form
    onSubmit={onSubmit}
    validate={values => { // validate both passowrds are same
      const errors = {};
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Password didnt matched';
      }
      if (!values.email) {
        errors.email = 'email cant be blank';
      }
      if (!values.password) {
        errors.password = 'password cant be blank';
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'confirm password cant be blank';
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
              name="confirmPassword"
              component="input"
              type='password'
              placeholder="Password"
            />

          </div>
          <Error name="confirmPassword" />
        </div>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <Field
              name="isbusiness"
              component={renderCheckBoxField}
              label="I am business"
              color="red"
            />
          </div>
        </div>
        <div className="account__btns">
          <button
            className="rounded btn btn-success"
            type="submit" onClick={() => onRegisterHandler(values)}
            disabled={!!isEmailRegistered}
          >
            Register
            <span className="btn__loader">
              <ClipLoader
                size={15}
                color="#70C1B3"
                loading={!!isEmailRegistered}
              />
            </span>
          </button>
        </div>

      </form>
    )}
  />
);

RegisterForm.propTypes = {
  onRegisterHandler: PropTypes.func,
  isEmailRegistered: PropTypes.func,
};

export default RegisterForm;
