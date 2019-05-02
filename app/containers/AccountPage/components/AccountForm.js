import React from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar } from 'reactstrap';
import { Form, Field } from 'react-final-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const AccountForm = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Settings</h5>
          <h5 className="subhead">Fill all fields</h5>
        </div>
        <Form
          onSubmit={onSubmit}
          initialValues={{ bname: 'xyz oy', bId: '1334565-8' }}
          render={({ handleSubmit }) => (
            <form className="form form--vertical" onSubmit={handleSubmit}>
              <div className="form__half">
                <div className="form__form-group">
                  <span className="form__form-group-label">Email</span>
                  <div className="form__form-group-field">
                    <Field
                      name="email"
                      component="input"
                      type="email"
                      placeholder="abc@pakettioy.fi"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Phone</span>
                  <div className="form__form-group-field">
                    <Field
                      name="phonenum"
                      component="input"
                      type="text"
                      placeholder="03737373"
                    />
                  </div>
                </div>
              </div>

              <div className="form__half">
                <div className="form__form-group">
                  <span className="form__form-group-label">Password</span>
                  <div className="form__form-group-field">
                    <Field name="password" component="input" type="password" />
                  </div>
                </div>

                <div className="form__form-group">
                  <span className="form__form-group-label">Repassword</span>
                  <div className="form__form-group-field">
                    <Field
                      name="repassword"
                      component="input"
                      type="password"
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

export default AccountForm;
