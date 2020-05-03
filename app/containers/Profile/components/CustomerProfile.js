import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import { Form, Field } from 'react-final-form';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';

import auth from '../../../utils/auth';
import Error from '../../../shared/ErrorField';
import renderFileInputField from '../../../shared/FileDropZone';
import GooglePlaceAutocomplete from '../../../shared/GooglePlaceAutocomplete';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  console.log("values", values);
};

const ProfileForm = ({
  onProfileFormSave,
  reset,
  initialValues,
  onProfileFormEdit,
  onAvatarDelete,
}) => {
  const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div>
            {!isProfileCompleted && (
              <>
                <h3 className="profile__header_label">Thank you for choosing MUUVZ</h3>
                <hr />
                <h4 className="profile__header_label">Now complete your profile to start using MUUVZ services</h4>
              </>
            )}
          </div>
          <div className="card__title">
            <h5 className="bold-text">Your Info</h5>
            <h5 className="subhead">Fill all required fields</h5>
            {initialValues && initialValues.avatar && initialValues.avatar.id && (
              <div className="profile__information">
                <div className="profile__avatar">
                  <img
                    className="avatar"
                    alt="profileImage"
                    src={initialValues.avatar ? `${'http://localhost:1337'}${initialValues.avatar.url}` : null }
                  />
                  <span className="avatar__delete">
                    <DeleteForeverIcon
                      size="25" color="#ff4861"
                      onClick={() => onAvatarDelete(initialValues.avatar.id, initialValues.id)}
                      className="avatar__delete__icon"
                    />
                  </span>
                </div>
              </div>
            )}
          </div>
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={values => { // validate both passowrds are same
              const errors = {};
              if (!values.businessName) {
                errors.businessName = 'Your fullname is required';
              }
              if (!values.phoneNumber) {
                errors.phoneNumber = 'Phone number is required';
              }
              if (!values.address) {
                errors.address = 'Address is required';
              }
              return errors
            }}
            render={({ handleSubmit, values,  submitting }) => (
              <form className="form form--vertical" onSubmit={handleSubmit}>
                <div className="form__half">
                  <div className="form__form-group">
                    <span className="form__form-group-label">Full name</span>
                    <span className="form__form-group-label_right">Required</span>
                    <div className="form__form-group-field">
                      <Field
                        name="businessName"
                        component="input"
                        type="text"
                        placeholder="Sami Rantanen"
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
                </div>
                <div className="form__half">
                  <div className="form__form-group">
                    <span className="form__form-group-label">Address </span>
                    <span className="form__form-group-label_right">Required</span>
                    <div className="form__form-group-field">
                      <Field
                        name="address"
                        component={GooglePlaceAutocomplete}
                        type="text"
                        placeholder="Kuusitie 5 Helsinki"
                      />

                    </div>
                    <Error name="address" />
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Licence </span>
                    <span className="form__form-group-label_right">Required</span>
                    <div className="form__form-group-field">
                      <Field
                        name="licenseTypes"
                        component="input"
                        type="text"
                        placeholder="A, B"
                      />

                    </div>
                    <Error name="address" />
                  </div>


                  <Col md={12} sm={12}>
                    {initialValues && !(initialValues.avatar && initialValues.avatar.id)  && (
                      <>
                      <span className="form__form-group-label">Profile picture</span>
                      <span className="form__form-group-label_right">Optional</span>
                      <div className="form__form-group">
                        <div className="form__form-group-field">
                          <Field
                            name='files'
                            component={renderFileInputField}
                          />
                        </div>
                      </div>
                      </>
                    )}
                  </Col>
                </div>
                <div className="profile__btns">
                  <button className="square btn btn-success" type="button" onClick={reset}>
                    Cancel
                  </button>
                  {isProfileCompleted && (
                    <button
                      className="square btn btn-primary"
                      type="submit"
                      onClick={() => onProfileFormEdit(values, initialValues.id)}
                      disabled={submitting }
                    >Submit</button>
                  )}
                  {!(isProfileCompleted && initialValues.id) && (
                    <button
                      className="square btn btn-primary"
                      type="submit"
                      onClick={() => onProfileFormSave(values)}
                    >Submit</button>
                  )}
                  {!isProfileCompleted && initialValues.id && (
                    <button
                      className="square btn btn-primary"
                      type="submit"
                      onClick={() => onProfileFormEdit(values, initialValues.id)}
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
  onProfileFormEdit: PropTypes.func,
  onAvatarDelete: PropTypes.func,
}

export default ProfileForm;
