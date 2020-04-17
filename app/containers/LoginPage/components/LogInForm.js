import React from 'react';
import { Form, Field } from 'react-final-form';
import EyeIcon from 'mdi-react/EyeIcon';
import PropTypes from 'prop-types';
import * as EmailValidator from "email-validator";

import renderCheckBoxField from '../../../shared/Checkbox/index';

import Error from '../../../shared/ErrorField';

const onSubmit = async values => {
  console.log("submitted value", values)
};

const LogInForm = ({showPasswordHandler, onLoginSubmitHandler, showPassword}) => (
  <Form
    onSubmit={onSubmit}
    validate={values => { // validate both passowrds are same
      const errors = {};
      if (!values.identifier) {
        errors.identifier = 'Email can not be empty';
      } if (!values.password) {
        errors.password = 'Password can not be empty';
      } if (!EmailValidator.validate(values.identifier)) {
        errors.identifier = "Invalid email address.";
      }
      return errors
    }}
    render={({ handleSubmit, values }) => (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__form-group">
          <span className="form__form-group-label">Email</span>
          <div className="form__form-group-field">
            <Field
              name="identifier"
              component="input"
              type="text"
              placeholder="abc@moverz.fi"
            />
          </div>
          <Error name="identifier" />
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Password</span>
          <div className="form__form-group-field">
            <Field
              name="password"
              component="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <button
              type="button"
              className={`form__form-group-button${showPasswordHandler ? ' active' : ''}`}
              onClick={showPasswordHandler}
            ><EyeIcon />
            </button>
          </div>
          <Error name="password" />
          <div className="account__forgot-password">
            <a href="/auth/forgot-password">Forgot a password?</a>
          </div>
        </div>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <Field
              name="rememberMe"
              component={renderCheckBoxField}
              label="Remember me"
            />
          </div>
        </div>
        <div className="account__btns">
          <button className="square btn btn-success" type="submit" onClick={() => onLoginSubmitHandler(values)}>Sign In</button>
        </div>
      </form>
    )}
  />
);

LogInForm.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  showPasswordHandler: PropTypes.func,
  onLoginSubmitHandler: PropTypes.func,
};

export default LogInForm;
