import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import { Form, Field } from 'react-final-form';
// import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';

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
  initialValues,
  onProfileFormEdit,
  // onAvatarDelete,
}) => {

  // make sure component re-render when initialValues changed
  useEffect(() => console.log('profile props changed!'), [initialValues]);

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
            <h5 className="bold-text">Business Info</h5>
            <h5 className="subhead">Fill all required fields</h5>
            {initialValues && initialValues.avatar && initialValues.avatar.id && (
              <div className="profile__information">
                <div className="profile__avatar">
                  <img
                    className="avatar"
                    alt="profileImage"
                    src={initialValues.avatar ? `${'http://localhost:1337'}${initialValues.avatar.url}` : null }
                  />
                  {/* <span className="avatar__delete">
                    <DeleteForeverIcon
                      size="25" color="#ff4861"
                      onClick={() => onAvatarDelete(initialValues.avatar.id, initialValues.id)}
                      className="avatar__delete__icon"
                    />
                  </span>
                  */}
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
                errors.businessName = 'Business name is required';
              }
              if (!values.phoneNumber) {
                errors.phoneNumber = 'Phone number is required';
              }
              if (!values.address) {
                errors.address = 'Address is required';
              }
              if (!values.files) {
                errors.files = 'Upload company logo';
              }
              return errors
            }}
            render={({ handleSubmit, values,  submitting }) => (
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
                        component={GooglePlaceAutocomplete}
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
                      <>
                      <span className="form__form-group-label">Company logo</span>
                      <span className="form__form-group-label_right">Required</span>
                      <div className="form__form-group">
                        <div className="form__form-group-field">
                          <Field
                            name='files'
                            component={renderFileInputField}
                          />
                        </div>
                      </div>
                      <Error name="files" />
                      </>
                  </Col>
                  <Col>
                    <div className="profile__btns">
                      {isProfileCompleted && (
                        <button
                          className="btn btn-success btn-sm rounded"
                          type="submit"
                          onClick={() => onProfileFormEdit(values, initialValues.id)}
                          disabled={submitting }
                        >Update profile</button>
                      )}
                      {!(isProfileCompleted && initialValues.id) && (
                        <button
                          className="btn btn-success btn-sm rounded"
                          type="submit"
                          onClick={() => onProfileFormSave(values)}
                        >Save profile</button>
                      )}
                      {!isProfileCompleted && initialValues.id && (
                        <button
                          className="btn btn-success btn-sm rounded"
                          type="submit"
                          onClick={() => onProfileFormEdit(values, initialValues.id, {isSubmittedBusinessForm: true })}
                        >Update profile</button>
                      )}
                    </div>
                  </Col>
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
  initialValues: PropTypes.object,
  onProfileFormEdit: PropTypes.func,
  // onAvatarDelete: PropTypes.func,
}

export default ProfileForm;
