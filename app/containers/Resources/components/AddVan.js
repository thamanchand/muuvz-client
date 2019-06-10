import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Card, CardBody, Col, ButtonToolbar, Table } from 'reactstrap';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation'

import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';

import Error from '../../../shared/ErrorField';
import toggleField from '../../../shared/ToggleField';
import renderDropZoneMultipleField from '../../../shared/DropzoneMultipleFiles';

import AddPrice from './AddPrice';
import Modal from '../../../shared/Modal';

const iconStyles = {
  marginRight: '10px',
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const onSubmit = async values => {
  await sleep(300)
  console.log("van info submitted", values)
}

const AddVanForm = ({
  onSaveVan,
  onPriceInfoSave,
  openPriceModalHandler,
  showPriceModal,
  closePriceModal,
  priceList,
  showPriceWarning,
  closeNotificationWarning,
}) => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <Form
          validate={values => { // validate both passowrds are same
            const errors = {};
            if (!values.brand) {
              errors.unit = 'Required';
            }
            if (!values.model) {
              errors.model = 'Required';
            }
            if (!values.platenum) {
              errors.platenum = 'Required';
            }
            if (!values.passengernum) {
              errors.passengernum = 'Required';
            }
            return errors
          }}
          onSubmit={onSubmit}
          render={({ handleSubmit, pristine, values, submitting, invalid }) => (
            <form className="form form--vertical" onSubmit={handleSubmit}>
              <div className="container">
                <h5 className="bold-text header_label">Business</h5>
              </div>
              <Col md={3} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Brand</span>
                  <div className="form__form-group-field error">
                    <Field
                      name="brand"
                      component="input"
                      type="text"
                      placeholder="Renault"
                      required
                    />
                  </div>
                  <Error name="brand" />
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
                  <Error name="model" />
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
                      customHeight
                    />
                  </div>
                </div>
              </Col>

              <div className="container">
                <h5 className="bold-text header_label pricing">Pricing</h5>
                <Button
                  color='success'
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
                  showConfirm={priceList && priceList.length > 0 && true }
                >
                  <AddPrice
                    onPriceInfoSave={onPriceInfoSave}
                    closePriceModal={() => closePriceModal()}
                  />
                </Modal>
              </div>
              <div className="container">
                {showPriceWarning &&
                  <div className="alert--bordered alert alert-warning fade show" role="alert">
                    <button className="close" type="button" onClick={() => closeNotificationWarning()}>
                      <span className="lnr lnr-cross"></span>
                    </button>
                    <div className="alert__content">
                      <p>
                        <span className="bold-text">Attention! </span>
                          Atleast one price schema needs to be define
                      </p>
                      <p className="page-subhead subhead">E.g: 1hr van booking will cost €20 </p>
                    </div>
                  </div>
                }
                {priceList && !priceList.length > 0
                  ?
                  (
                    <h5 className="page-subhead subhead">No data </h5>

                  )
                  : (
                    <div className="table-responsive">
                      <Table striped responsive>
                        <thead>
                          <tr>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {priceList && priceList.map(item => (
                            <tr key={item.id}>
                              <td>{item.unit}</td>
                              <td>{item.price}</td>
                              <td>
                                <span style={iconStyles}>
                                  <DeleteForeverIcon size="20" color="#ff4861" />
                                </span>
                                <span>
                                  <SquareEditOutlineIcon size="20" color="#555555" />
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )
                }
              </div>
              <Row>
                <div className="addEditModal__footer">
                  <ButtonToolbar className="form__button-toolbar">
                    <button
                      className="square btn btn-primary"
                      type="submit"
                      onClick={() => onSaveVan(values)}
                      disabled={submitting || pristine || invalid}
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

AddVanForm.propTypes = {
  onSaveVan: PropTypes.func,
  onPriceInfoSave: PropTypes.func,
  openPriceModalHandler: PropTypes.func,
  showPriceModal: PropTypes.bool,
  closePriceModal: PropTypes.func,
  priceList: PropTypes.arrayOf(PropTypes.shape({
    unit: PropTypes.number,
    price: PropTypes.number,
  })),
  showPriceWarning: PropTypes.bool,
  closeNotificationWarning: PropTypes.func,
}
export default AddVanForm;
