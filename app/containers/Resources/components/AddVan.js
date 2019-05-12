import React from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar } from 'reactstrap';
import { Form, Field } from 'react-final-form';

import toggleField from '../../../shared/ToggleField';

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
          initialValues={{ bname: 'xyz oy', bId: '1334565-8' }}
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
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Mileage</span>
                  <div className="form__form-group-field">
                    <Field
                      name="year"
                      component="input"
                      type="text"
                      placeholder="X3"
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">License-plate</span>
                  <div className="form__form-group-field">
                    <Field
                      name="mileage"
                      component="input"
                      type="text"
                      placeholder="X3"
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
                      placeholder="X3"
                    />
                  </div>
                </div>
              </Col>

              <div className="container">
                <h5 className="bold-text header_label">Features</h5>
              </div>
              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">engine</span>
                  <div className="form__form-group-field">
                    <Field
                      name="engine"
                      component="input"
                      type="text"
                      placeholder="1.8"
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
                      placeholder="Automatic"
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
                  <span className="form__form-group-label">Cruise control</span>
                  <div className="form__form-group-field">
                    <Field
                      name="cruisecontrol"
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
                  <span className="form__form-group-label">Exterior - Width x Height x Length (cm)</span>
                  <div className="form__form-group-field">
                    <Field
                      name="exteriordimensions"
                      component="input"
                      type="text"
                      placeholder="210 x 280 x 620"
                    />
                  </div>
                </div>
              </Col>

              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Interior - Width x Height x Length (cm)</span>
                  <div className="form__form-group-field">
                    <Field
                      name="power"
                      component="input"
                      type="text"
                      placeholder="200 x 290 x 610"
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
