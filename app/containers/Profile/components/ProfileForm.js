import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import { Form, Field } from 'react-final-form';

import auth from '../../../utils/auth';
import Error from '../../../shared/ErrorField';
import renderFileInputField from '../../../shared/FileDropZone';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  console.log("values", values);
};

const ProfileForm = ({
  onProfileFormSave,
  reset,
  initialValues,
  onProfileFormEdit
}) => {
  const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;
  console.log("isProfileCompleted", isProfileCompleted);

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div>
            {!isProfileCompleted && (
              <>
                <h4 className="profile__header_label">To use Muverz service you need to complete profile</h4>
                <p>Fill information below </p>
              </>
            )}
          </div>
          <div className="card__title">
            <h5 className="bold-text">Business</h5>
            <h5 className="subhead">Fill all fields</h5>
            <img
              className="avatar"
              alt="profileImage"
              src={initialValues.avatar ? `${'http://localhost:1337'}${initialValues.avatar.url}` : null }
            />
          </div>
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={values => { // validate both passowrds are same
              const errors = {};
              if (!values.businessName) {
                errors.businessName = 'Business name is required';
              }
              if (!values.phoneNumber) {
                errors.phoneNumber = 'Phone number is required';
              }
              if (!values.address) {
                errors.address = 'Address is required';
              }
              return errors
            }}
            render={({ handleSubmit, values,  submitting, pristine,}) => (
              <form className="form form--vertical" onSubmit={handleSubmit}>
                <div className="form__half">
                  <div className="form__form-group">
                    <span className="form__form-group-label">Business name</span>
                    <span className="form__form-group-label_right">Required</span>
                    <div className="form__form-group-field">
                      <Field
                        name="businessName"
                        component="input"
                        type="text"
                        placeholder="Muverz oy"
                      />
                    </div>
                    <Error name="businessName" />
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Phone number</span>
                    <span className="form__form-group-label_right">Required</span>
                    <div className="form__form-group-field">
                      <Field
                        name="phoneNumber"
                        component="input"
                        type="text"
                        placeholder="0442105580"
                      />
                    </div>
                    <Error name="phoneNumber" />
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Website</span>
                    <span className="form__form-group-label_right">Optional</span>
                    <div className="form__form-group-field">
                      <Field
                        name="website"
                        component="input"
                        type="text"
                        placeholder="muverz.fi"
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Description</span>
                    <span className="form__form-group-label_right">Optional</span>
                    <div className="form__form-group-field">
                      <Field
                        name="description"
                        component="textarea"
                        type="text"
                        placeholder="We provide moving service"
                      />
                    </div>
                  </div>
                </div>
                <div className="form__half">
                  <div className="form__form-group">
                    <span className="form__form-group-label">Address </span>
                    <span className="form__form-group-label_right">Required</span>
                    <div className="form__form-group-field">
                      <Field
                        name="address"
                        component="input"
                        type="text"
                        placeholder="Kuusitie 5 Helsinki"
                      />
                    </div>
                    <Error name="address" />
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Business Id</span>
                    <span className="form__form-group-label_right">Optional</span>
                    <div className="form__form-group-field">
                      <Field
                        name="businessId"
                        component="input"
                        type="text"
                        placeholder="33939X-ID"
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Facebook</span>
                    <span className="form__form-group-label_right">Optional</span>
                    <div className="form__form-group-field">
                      <Field
                        name="facebookLink"
                        component="input"
                        type="text"
                        placeholder="www.facebook.com/muveroy"
                      />
                    </div>
                  </div>
                  <Col md={12} sm={12}>
                    <h5 className="subhead">You can upload multiple files</h5>
                    <div className="form__form-group">
                      <div className="form__form-group-field">
                        <Field
                          name='files'
                          component={renderFileInputField}
                        />
                      </div>
                    </div>
                  </Col>
                </div>
                <div className="profile__btns">
                  <button className="square btn btn-success" type="button" onClick={reset}>
                    Cancel
                  </button>
                  {isProfileCompleted ? (
                    <button
                      className="square btn btn-primary"
                      type="submit"
                      onClick={() => onProfileFormEdit(values, initialValues.id)}
                      disabled={submitting || pristine}
                    >Submit</button>
                  ) : (
                    <button
                      className="square btn btn-primary"
                      type="submit"
                      onClick={() => onProfileFormSave(values)}
                    >Submit</button>
                  )}
                </div>
              </form>
            )}
          />
        </CardBody>
      </Card>
    </Col>
  )
};

ProfileForm.propTypes = {
  onProfileFormSave: PropTypes.func,
  reset: PropTypes.func,
  initialValues: PropTypes.object,
  onProfileFormEdit: PropTypes.func
}

export default ProfileForm;
