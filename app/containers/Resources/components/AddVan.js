import React from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar } from 'reactstrap';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation'

import toggleField from '../../../shared/ToggleField';
import renderDropZoneMultipleField from '../../../shared/DropzoneMultipleFiles';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const ProfileForm = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit }) => (
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
                      name="engine"
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
                      name="engine"
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
                      name="power"
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
                      name="aircon"
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


              <div>
                <ButtonToolbar className="form__button-toolbar">
                  <Button className="square btn btn-primary" type="submit">
                    Submit
                  </Button>
                </ButtonToolbar>
              </div>
            </form>
          )}
        />
      </CardBody>
    </Card>
  </Col>
);

export default ProfileForm;
