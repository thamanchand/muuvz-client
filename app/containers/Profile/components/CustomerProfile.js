import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import { Form, Field } from 'react-final-form';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import { FormattedMessage } from 'react-intl';

import auth from '../../../utils/auth';
import Error from '../../../shared/ErrorField';
import renderFileInputField from '../../../shared/FileDropZone';
import GooglePlaceAutocomplete from '../../../shared/GooglePlaceAutocomplete';
import messages from '../messages';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  console.log('values', values);
};

const ProfileForm = ({
  onProfileFormSave,
  initialValues,
  onProfileFormEdit,
  onAvatarDelete,
}) => {
  useEffect(() => console.log('profile props changed!'), [initialValues]);

  const isProfileCompleted =
    auth.get('userInfo') && auth.get('userInfo').profileCompleted;
  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div>
            {!isProfileCompleted && (
              <>
                <h3 className="profile__header_label">
                  <FormattedMessage {...messages.thankYouHeader} />
                </h3>
                <hr />
                <h4 className="profile__header_label">
                  <FormattedMessage {...messages.thankYouMessage} />
                </h4>
              </>
            )}
          </div>
          <div className="card__title">
            <h5 className="bold-text">
              <FormattedMessage {...messages.profileHeader} />
            </h5>
            {/* <h5 className="subhead">Fill all required fields</h5> */}
            {initialValues && initialValues.avatar && initialValues.avatar.id && (
              <div className="profile__information">
                <div className="profile__avatar">
                  <img
                    className="avatar"
                    alt="profileImage"
                    src={
                      initialValues.avatar
                        ? `${'http://localhost:1337'}${
                          initialValues.avatar.url
                        }`
                        : null
                    }
                  />
                  <span className="avatar__delete">
                    <DeleteForeverIcon
                      size="25"
                      color="#ff4861"
                      onClick={() =>
                        onAvatarDelete(
                          initialValues.avatar.id,
                          initialValues.id,
                        )
                      }
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
            validate={values => {
              // validate both passowrds are same
              const errors = {};
              if (!values.businessName) {
                errors.businessName = (
                  <FormattedMessage {...messages.requiredField} />
                );
              }
              if (!values.phoneNumber) {
                errors.phoneNumber = (
                  <FormattedMessage {...messages.requiredField} />
                );
              }
              if (!values.address) {
                errors.address = (
                  <FormattedMessage {...messages.requiredField} />
                );
              }
              if (!values.licenseTypes) {
                errors.licenseTypes = (
                  <FormattedMessage {...messages.requiredField} />
                );
              }
              return errors;
            }}
            render={({ handleSubmit, values, submitting }) => (
              <form className="form form--vertical" onSubmit={handleSubmit}>
                <div className="form__half">
                  <div className="form__form-group">
                    <span className="form__form-group-label">
                      <FormattedMessage {...messages.fullName} />
                    </span>
                    <span className="form__form-group-label_right">
                      <FormattedMessage {...messages.required} />
                    </span>
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
                    <span className="form__form-group-label">
                      <FormattedMessage {...messages.phoneNumber} />
                    </span>
                    <span className="form__form-group-label_right">
                      <FormattedMessage {...messages.required} />
                    </span>
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
                    <span className="form__form-group-label">
                      <FormattedMessage {...messages.address} />
                    </span>
                    <span className="form__form-group-label_right">
                      <FormattedMessage {...messages.required} />
                    </span>
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
                    <span className="form__form-group-label">
                      <FormattedMessage {...messages.licenseType} />
                    </span>
                    <span className="form__form-group-label_right">
                      <FormattedMessage {...messages.required} />
                    </span>
                    <div className="form__form-group-field">
                      <Field
                        name="licenseTypes"
                        component="input"
                        type="text"
                        placeholder="A, B"
                      />
                    </div>
                    <Error name="licenseTypes" />
                  </div>

                  <Col md={12} sm={12}>
                    {initialValues &&
                      !(initialValues.avatar && initialValues.avatar.id) && (
                        <>
                          <span className="form__form-group-label">
                            <FormattedMessage {...messages.profilePicture} />
                          </span>
                          <span className="form__form-group-label_right">
                            <FormattedMessage {...messages.optional} />
                          </span>
                          <div className="form__form-group">
                            <div className="form__form-group-field">
                              <Field
                                name="files"
                                component={renderFileInputField}
                              />
                            </div>
                          </div>
                        </>
                    )}
                  </Col>
                  <Col>
                    <div className="profile__btns">
                      {isProfileCompleted && (
                        <button
                          className="btn btn-success btn-sm rounded"
                          type="submit"
                          onClick={() =>
                            onProfileFormEdit(values, initialValues.id)
                          }
                          disabled={submitting}
                        >
                          <FormattedMessage {...messages.updateProfile} />
                        </button>
                      )}
                      {!(isProfileCompleted && initialValues.id) && (
                        <button
                          className="btn btn-success btn-sm rounded"
                          type="submit"
                          onClick={() => onProfileFormSave(values)}
                        >
                          <FormattedMessage {...messages.saveProfile} />
                        </button>
                      )}
                      {!isProfileCompleted && initialValues.id && (
                        <button
                          className="btn btn-success btn-sm rounded"
                          type="submit"
                          onClick={() =>
                            onProfileFormEdit(values, initialValues.id)
                          }
                        >
                          <FormattedMessage {...messages.updateProfile} />
                        </button>
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
  );
};

ProfileForm.propTypes = {
  onProfileFormSave: PropTypes.func,
  initialValues: PropTypes.object,
  onProfileFormEdit: PropTypes.func,
  onAvatarDelete: PropTypes.func,
};

export default ProfileForm;
