import React from 'react';
import { Form, Field } from 'react-final-form';

import PropTypes from 'prop-types';

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


const RegisterForm = ({ onRegisterHandler }) => (
  <Form
    onSubmit={onSubmit}
    validate={values => { // validate both passowrds are same
      const errors = {};
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Password didnt matched';
      }
      if (!values.username) {
        errors.username = 'username cant be blank';
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
          <span className="form__form-group-label">Username</span>
          <div className="form__form-group-field">
            <Field
              name="username"
              component="input"
              type="text"
              placeholder="hikenen"
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
          <button className="square btn btn-success" type="submit" onClick={() => onRegisterHandler(values)}>Register</button>
        </div>

      </form>
    )}
  />
);

RegisterForm.propTypes = {
  onRegisterHandler: PropTypes.func,
};

export default RegisterForm;
