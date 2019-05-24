import React from 'react';
import PropTypes from 'prop-types';
import { Row, Card, CardBody, Col, ButtonToolbar } from 'reactstrap';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation';

import Error from '../../../shared/ErrorField';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const onSubmit = async values => {
  await sleep(300)
  console.log("submitted", values)
}

const isNumber = value => Number.isNaN(Number(value));

const AddPrice = ({ onPriceInfoSave }) => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <Form
          validate={values => { // validate both passowrds are same
            const errors = {};
            if (isNumber(values.unit)) {
              errors.unit = 'Must be a number';
            }
            if (isNumber(values.price)) {
              errors.price = 'Must be a number';
            }
            return errors
          }}
          onSubmit={onSubmit}
          render={({ handleSubmit, pristine, values, submitting, invalid}) => (
            <form className="form form--vertical" onSubmit={handleSubmit}>
              <Col md={6} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Unit</span>
                  <div className="form__form-group-field">
                    <Field
                      name="unit"
                      component="input"
                      type="number"
                      placeholder="2"
                    />
                  </div>
                  <Error name="unit" />
                </div>
              </Col>

              <Col md={6} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Price</span>
                  <div className="form__form-group-field">
                    <Field
                      name="price"
                      component="input"
                      type="number"
                      placeholder="v3"
                    />
                  </div>
                  <Error name="price" />
                </div>
              </Col>


              <Row>
                <div className="addEditModal__footer">
                  <ButtonToolbar className="form__button-toolbar">
                    <button
                      className="square btn btn-primary"
                      type="submit"
                      disabled={submitting || pristine || invalid}
                      onClick={() => onPriceInfoSave(values)}
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

AddPrice.propTypes = {
  onPriceInfoSave: PropTypes.func,
}
export default AddPrice;
