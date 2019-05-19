import React from 'react';
import PropTypes from 'prop-types';
import { Row, Card, CardBody, Col, ButtonToolbar } from 'reactstrap';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const onSubmit = async values => {
  await sleep(300)
  console.log("submitted", values)
}

const AddPrice = ({ onPriceInfoSave }) => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, pristine, values, submitting }) => (
            <form className="form form--vertical" onSubmit={handleSubmit}>
              <Col md={6} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Unit</span>
                  <div className="form__form-group-field">
                    <Field
                      name="unit"
                      component="input"
                      type="text"
                      placeholder="2"
                      required
                    />
                  </div>
                </div>
              </Col>

              <Col md={6} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Price</span>
                  <div className="form__form-group-field">
                    <Field
                      name="price"
                      component="input"
                      type="text"
                      placeholder="v3"
                      required
                    />
                  </div>
                </div>
              </Col>


              <Row>
                <div className="addEditModal__footer">
                  <ButtonToolbar className="form__button-toolbar">
                    <button
                      className="square btn btn-primary"
                      type="submit"
                      disabled={submitting || pristine}
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
