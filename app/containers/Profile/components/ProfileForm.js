import React from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar } from 'reactstrap';
import { Form, Field } from 'react-final-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const ProfileForm = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Business</h5>
          <h5 className="subhead">Fill all fields</h5>
        </div>
        <Form
          onSubmit={onSubmit}
          initialValues={{ bname: 'xyz oy', bId: '1334565-8' }}
          render={({ handleSubmit }) => (
            <form className="form form--vertical" onSubmit={handleSubmit}>
              <div className="form__half">
                <div className="form__form-group">
                  <span className="form__form-group-label">Business name</span>
                  <div className="form__form-group-field">
                    <Field
                      name="bname"
                      component="input"
                      type="text"
                      placeholder="Pakketiauto oy"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Address</span>
                  <div className="form__form-group-field">
                    <Field
                      name="address"
                      component="input"
                      type="text"
                      placeholder="Kussitie 8B "
                    />
                  </div>
                </div>
              </div>

              <div className="form__half">
                <div className="form__form-group">
                  <span className="form__form-group-label">Business ID</span>
                  <div className="form__form-group-field">
                    <Field
                      name="bId"
                      component="input"
                      type="text"
                      placeholder="1334565-8"
                    />
                  </div>
                </div>

                <div className="form__form-group">
                  <span className="form__form-group-label">Phone number</span>
                  <div className="form__form-group-field">
                    <Field
                      name="phonenum"
                      component="input"
                      type="text"
                      placeholder="0442103390"
                    />
                  </div>
                </div>

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
