import React from 'react';
import PropTypes from 'prop-types';
import { Row, Card, CardBody, Col, ButtonToolbar } from 'reactstrap';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation';

import Error from '../../../shared/ErrorField';
import renderSelectField from '../../../shared/SelectField';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const onSubmit = async values => {
  await sleep(300)
  console.log("submitted", values)
}

const isNumber = value => Number.isNaN(Number(value));

const parse = value => (Number.isNaN(parseFloat(value)) ? "" : parseFloat(value));


const AddPrice = ({ onPriceInfoSave, currentlyEditedPriceItem }) => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <Form
          validate={values => { // validate both passowrds are same
            const errors = {};
            if (!values.perhrdayweek) {
              errors.perhrdayweek = 'This field is required!';
            }
            if (!values.unit) {
              errors.unit = 'This field is required!';
            }
            if (isNumber(values.unit)) {
              errors.unit = 'Must be a number';
            }
            if (isNumber(values.price)) {
              errors.price = 'Must be a number';
            }
            if (!values.price) {
              errors.price = 'This field is required';
            }
            return errors
          }}
          initialValues={currentlyEditedPriceItem}
          onSubmit={onSubmit}
          render={({ handleSubmit, pristine, values, submitting, invalid}) => (
            <form className="form form--vertical" onSubmit={handleSubmit}>
              <Col md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Select an option</span>
                  <div className="form__form-group-field">
                    <Field
                      name='perhrdayweek'
                      component={renderSelectField}
                      options={[
                        {value: 'Hour', label: 'Hour'},
                        {value: 'Day', label: 'Day'},
                        {value: 'Weekend', label: 'Weekend'},
                      ]}
                      defaultValue={{value: 'hour', label: 'Hour'}}
                    />
                  </div>
                  <Error name="perhrdayweek" />
                </div>
              </Col>
              <Col md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Number</span>
                  <div className="form__form-group-field">
                    <Field
                      name="unit"
                      component="input"
                      type="text"
                      placeholder="1"
                      parse={parse}
                    />
                  </div>
                  <Error name="unit" />
                </div>
              </Col>

              <Col md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Price</span>
                  <div className="form__form-group-field">
                    <Field
                      name="price"
                      component="input"
                      type="text"
                      placeholder="€15"
                      parse={parse}
                    />
                  </div>
                  <Error name="price" />
                </div>
              </Col>


              <Row>
                <div className="add__pricing_btn">
                  <ButtonToolbar className="form__button-toolbar">
                    <button
                      className="square btn btn-success rounded"
                      type="submit"
                      disabled={submitting || pristine || invalid}
                      onClick={() => onPriceInfoSave(values)}
                    >
                      Add price
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
  currentlyEditedPriceItem: PropTypes.object
}
export default AddPrice;
