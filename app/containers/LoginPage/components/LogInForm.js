import React from 'react';
import { Form, Field } from 'react-final-form';
import { Button } from 'reactstrap';
import EyeIcon from 'mdi-react/EyeIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import renderCheckBoxField from '../../../shared/Checkbox/index';

const onSubmit = async values => {
  console.log("submitted value", values)
};


const LogInForm = ({showPasswordHandler, onLoginSubmitHandler, showPassword}) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, values }) => (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__form-group">
          <span className="form__form-group-label">Username</span>
          <div className="form__form-group-field">
            <Field
              name="identifier"
              component="input"
              type="text"
              placeholder="abc@moverz.fi"
            />
          </div>
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
          <div className="account__forgot-password">
            <a href="/">Forgot a password?</a>
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
          <Button className="btn btn-primary" type="submit" onClick={() => onLoginSubmitHandler(values)}>Sign In</Button>
          <Link className="btn btn-outline-primary account__btn" to="/register">Create
            Account
          </Link>
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
