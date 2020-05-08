import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import { Form, Field } from 'react-final-form';

import Error from '../../../shared/ErrorField';

import auth from '../../../utils/auth';
const userEmail = auth.get('userInfo') && auth.get('userInfo').email;

const onSubmit = async values => {
  console.log("submitted value", values)
};

const AccountForm = ({ changePassword, isPasswordChangeButtonDisabled, isPasswordChanged }) => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Settings</h5>
        </div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (

            <form className="form form-small form--horizontal" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">Username</span>
                <div className="form__form-group-field">
                  <Field
                    name="email"
                    component="input"
                    type="text"
                    placeholder={userEmail}
                    disabled
                  />
                </div>
              </div>
            </form>
          )}
        />
        <div className="card__title">
          <h5 className="bold-text">Password</h5>
        </div>
        <Form
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
          onSubmit={onSubmit}
          render={({ handleSubmit, values, pristine, submitting }) => (

            <form className="form form-small form--horizontal" onSubmit={handleSubmit}>
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
                    placeholder="Re-Password"
                  />

                </div>
                <Error name="passwordConfirmation" />
              </div>


              <div className="profile__btns">
                <button
                  className="btn btn-success btn-sm rounded"
                  type="submit"
                  onClick={() => changePassword(values)}
                  disabled={isPasswordChangeButtonDisabled || pristine || submitting}
                >Change password</button>
              </div>
              {isPasswordChanged && (
                <p className="passwordchange_notification">
                Password is changed successfully!</p>
              )}
            </form>
          )}
        />
      </CardBody>
    </Card>
  </Col>
);

AccountForm.propTypes = {
  changePassword: PropTypes.func,
  isPasswordChangeButtonDisabled: PropTypes.bool,
  isPasswordChanged: PropTypes.bool,
}

export default AccountForm;
