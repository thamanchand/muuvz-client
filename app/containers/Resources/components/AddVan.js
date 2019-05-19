import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Card, CardBody, Col, ButtonToolbar } from 'reactstrap';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation'

import toggleField from '../../../shared/ToggleField';
import renderDropZoneMultipleField from '../../../shared/DropzoneMultipleFiles';
import AddPrice from './AddPrice';
import Modal from '../../../shared/Modal';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const onSubmit = async values => {
  await sleep(300)
  console.log("submitted", values)
}

const ProfileForm = ({
  onSaveVan,
  onPriceInfoSave,
  openPriceModalHandler,
  showPriceModal,
  closePriceModal
}) => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, pristine, values, submitting }) => (
            <form className="form form--vertical" onSubmit={handleSubmit}>
              <div className="container">
                <h5 className="bold-text header_label">Business</h5>
              </div>
              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Brand</span>
                  <div className="form__form-group-field">
                    <Field
                      name="brand"
                      component="input"
                      type="text"
                      placeholder="Renault"
                      required
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Model</span>
                  <div className="form__form-group-field">
                    <Field
                      name="model"
                      component="input"
                      type="text"
                      placeholder="v3"
                      required
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">License-plate</span>
                  <div className="form__form-group-field">
                    <Field
                      name="platenum"
                      component="input"
                      type="text"
                      placeholder="XKR-323"
                      required
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Mileage</span>
                  <div className="form__form-group-field">
                    <Field
                      name="mileage"
                      component="input"
                      type="text"
                      placeholder="10000"
                      required
                    />
                  </div>
                </div>
              </Col>

              <div className="container">
                <h5 className="bold-text header_label">Features</h5>
              </div>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Number of Seats</span>
                  <div className="form__form-group-field">
                    <Field
                      name="passengernum"
                      component="input"
                      type="text"
                      placeholder="4"
                      required
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Engine size</span>
                  <div className="form__form-group-field">
                    <Field
                      name="enginesize"
                      component="input"
                      type="text"
                      placeholder="1.8"
                      required
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Fuel Type</span>
                  <div className="form__form-group-field">
                    <Field
                      name="fueltype"
                      component="input"
                      type="text"
                      placeholder="Diesel"
                      required
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Power</span>
                  <div className="form__form-group-field">
                    <Field
                      name="power"
                      component="input"
                      type="text"
                      placeholder="100kw"
                      required
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Consumption</span>
                  <div className="form__form-group-field">
                    <Field
                      name="consumption"
                      component="input"
                      type="text"
                      placeholder="10 l / 100km"
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Gear</span>
                  <div className="form__form-group-field">
                    <Field
                      name="transmission"
                      component="input"
                      type="text"
                      placeholder="E.g: Automatic/Manual"
                      required
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Width x Height x Length (cm)</span>
                  <div className="form__form-group-field">
                    <Field
                      name="exteriordimensions"
                      component="input"
                      type="text"
                      placeholder="210 x 280 x 620"
                      required
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Width x Height x Length (cm)</span>
                  <div className="form__form-group-field">
                    <Field
                      name="interiordimensions"
                      component="input"
                      type="text"
                      placeholder="200 x 290 x 610"
                      required
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Load capacity</span>
                  <div className="form__form-group-field">
                    <Field
                      name="loadcapacity"
                      component="input"
                      type="text"
                      placeholder="3500kg"
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Air bag</span>
                  <div className="form__form-group-field">
                    <Field
                      name="airbag"
                      component={toggleField}
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Air conditioning</span>
                  <div className="form__form-group-field">
                    <Field
                      name="airconditioning"
                      component={toggleField}
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Cruise control</span>
                  <div className="form__form-group-field">
                    <Field
                      name="cruisecontrol"
                      component={toggleField}
                    />
                  </div>
                </div>
              </Col>

              <Col md={12} sm={12}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Other features</span>
                  <div className="form__form-group-field">
                    <Field
                      name="features"
                      component="textarea"
                      type="text"
                      placeholder="Towing, EPS, ABS"
                    />
                  </div>
                </div>
              </Col>

              <div className="container">
                <h5 className="bold-text header_label">Pictures</h5>
              </div>

              <Col md={12} sm={12}>
                <h5 className="subhead">You can upload multiple files</h5>
                <div className="form__form-group">
                  <div className="form__form-group-field">
                    <Field
                      name='files'
                      component={renderDropZoneMultipleField}
                    />
                  </div>
                </div>
              </Col>

              <div className="container">
                <h5 className="bold-text header_label pricing">Pricing</h5>
                <Button
                  color='primary'
                  onClick={openPriceModalHandler}
                  className="btn square add__pricing-btn"
                >
                  Add price
                </Button>
                <Modal
                  color="primary"
                  title="Add new price"
                  header
                  sm
                  openModel={showPriceModal}
                  closePriceModal={closePriceModal}
                >
                  <AddPrice
                    onPriceInfoSave={onPriceInfoSave}
                    closePriceModal={() => closePriceModal()}
                  />
                </Modal>
              </div>
              <div className="container">
                <h5 className="page-subhead subhead">No data </h5>
              </div>
              <Row>
                <div className="addEditModal__footer">
                  <ButtonToolbar className="form__button-toolbar">
                    <button
                      className="square btn btn-primary"
                      type="submit"
                      onClick={() => onSaveVan(values)}
                      disabled={submitting || pristine}
                    >
                      Save
                    </button>
                  </ButtonToolbar>
                </div>
              </Row>
            </form>
          )}
        />
      </CardBody>
    </Card>
  </Col>
);

ProfileForm.propTypes = {
  onSaveVan: PropTypes.func,
  onPriceInfoSave: PropTypes.func,
  openPriceModalHandler: PropTypes.func,
  showPriceModal: PropTypes.bool,
  closePriceModal: PropTypes.func,
}
export default ProfileForm;
