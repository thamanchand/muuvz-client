import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Card, CardBody, Col, ButtonToolbar, Table } from 'reactstrap';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation';
import { FormattedMessage } from 'react-intl';

import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';

import Error from '../../../shared/ErrorField';
import toggleField from '../../../shared/ToggleField';
import renderDropZoneMultipleField from '../../../shared/DropzoneMultipleFiles';
import renderSelectField from '../../../shared/SelectField';
import renderMaskInput from '../../../shared/MaskInput';

import AddPrice from './AddPrice';

import Modal from '../../../shared/Modal';
import messages from '../messages';

const iconStyles = {
  marginRight: '10px',
  cursor: 'pointer',
};

const all = /[A-Za-z0-9]/;

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
  editPriceItem,
  deletePriceItem,
  showCoverPicWarning,
}) => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <Form
          validate={values => { // validate both passowrds are same
            const errors = {};
            if (!values.brand) {
              errors.brand = <FormattedMessage {...messages.requiredField} />;
            }
            if (!values.model) {
              errors.model = <FormattedMessage {...messages.requiredField} />;
            }
            if (!values.platenum) {
              errors.platenum = <FormattedMessage {...messages.requiredField} />;
            }
            if (!values.passengernum) {
              errors.passengernum = <FormattedMessage {...messages.requiredField} />;
            }
            if (!values.mileage) {
              errors.mileage = <FormattedMessage {...messages.requiredField} />;
            }
            if (!values.enginesize) {
              errors.enginesize = <FormattedMessage {...messages.requiredField} />;
            }
            if (!values.fueltype) {
              errors.fueltype = <FormattedMessage {...messages.requiredField} />;
            }
            if (!values.power) {
              errors.power = <FormattedMessage {...messages.requiredField} />;
            }
            if (!values.transmission) {
              errors.transmission = <FormattedMessage {...messages.requiredField} />;
            }
            if (!values.loadcapacity) {
              errors.loadcapacity = <FormattedMessage {...messages.requiredField} />;
            }
            return errors
          }}
          onSubmit={onSubmit}
          render={({ handleSubmit, pristine, values, submitting }) => (
            <form className="form form--vertical" onSubmit={handleSubmit}>
              <div className="container">
                <h5 className="bold-text header_label">Resource</h5>
              </div>
              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.brand} />
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name="brand"
                      component="input"
                      type="text"
                      placeholder="Renault"
                    />
                  </div>
                  <Error name="brand" />
                </div>
              </Col>

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.model} />
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name="model"
                      component="input"
                      type="text"
                      placeholder="v3"
                    />
                  </div>
                  <Error name="model" />
                </div>
              </Col>

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.plateNumber} />
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      placeholder="IKS-314"
                      name="platenum"
                      component={renderMaskInput}
                      type="text"
                      mask={[all, all, all, '-', all, all, all]}
                    />
                  </div>
                  <Error name="platenum" />
                </div>
              </Col>

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.mileage} />
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name="mileage"
                      component="input"
                      type="text"
                      placeholder="10000"
                    />
                  </div>
                  <Error name="mileage" />
                </div>
              </Col>

              <div className="container">
                <h5 className="bold-text header_label">
                  <FormattedMessage {...messages.features} />
                </h5>
              </div>

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.numberOfSeats} />
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name="passengernum"
                      component="input"
                      type="text"
                      placeholder="4"
                    />
                  </div>
                  <Error name="passengernum" />
                </div>
              </Col>

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.engineSize} />
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name="enginesize"
                      component="input"
                      type="text"
                      placeholder="1.8"
                    />
                  </div>
                  <Error name="enginesize" />
                </div>
              </Col>

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.fuelType} />
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name='fueltype'
                      component={renderSelectField}
                      options={[
                        {value: 'Diesel', label: <FormattedMessage {...messages.diesel} />},
                        {value: 'Petrol', label: <FormattedMessage {...messages.petrol} />},
                        {value: 'Hybrid', label: <FormattedMessage {...messages.hybrid} />},
                        {value: 'Electric', label: <FormattedMessage {...messages.electric} />},
                      ]}
                    />
                  </div>
                  <Error name="fueltype" />
                </div>
              </Col>

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.power} />
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name="power"
                      component="input"
                      type="text"
                      placeholder="100kw"
                    />
                  </div>
                  <Error name="power" />
                </div>
              </Col>

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.consumption} />
                  </span>
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

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.gear} />
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name='transmission'
                      component={renderSelectField}
                      options={[
                        {value: 'Automatic', label: <FormattedMessage {...messages.automatic} />},
                        {value: 'Manual', label: <FormattedMessage {...messages.manual} />},
                      ]}
                    />
                  </div>
                  <Error name="transmission" />
                </div>
              </Col>

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.exterirorsize} />
                  </span>
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

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.interiorsize} />
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name="interiordimensions"
                      component="input"
                      type="text"
                      placeholder="200 x 290 x 610"
                    />
                  </div>
                </div>
              </Col>

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.loadcapacity} />
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name="loadcapacity"
                      component="input"
                      type="text"
                      placeholder="3500kg"
                    />
                  </div>
                  <Error name="loadcapacity" />
                </div>
              </Col>

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.airbag} />
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name="airbag"
                      component={toggleField}
                    />
                  </div>
                </div>
              </Col>

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.airconditioning} />
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name="airconditioning"
                      component={toggleField}
                    />
                  </div>
                </div>
              </Col>

              <Col lg={3} md={4} sm={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.cruisecontrol} />
                  </span>
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
                  <span className="form__form-group-label">
                    <FormattedMessage {...messages.otherFeatures} />
                  </span>
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
                <h5 className="bold-text header_label">
                  <FormattedMessage {...messages.uploadPictures} />
                </h5>
              </div>

              <Col md={12} sm={12}>
                <h5 className="subhead">
                  <FormattedMessage {...messages.multipleFiles} />
                </h5>
                <div className="form__form-group">
                  <div className="form__form-group-field">
                    <Field
                      name='files'
                      component={renderDropZoneMultipleField}
                      customHeight
                    />
                  </div>
                </div>
                {showCoverPicWarning && (
                  <div className="alert--bordered alert alert-warning fade show" role="alert">
                    <div className="alert__content">
                      <p>
                        <span className="bold-text">
                          <FormattedMessage {...messages.attentionInfo} />
                        </span>
                          You need to upload cover picture of your van
                      </p>
                    </div>
                  </div>
                )}
              </Col>

              <div className="container">
                <h5 className="bold-text header_label pricing">
                  <FormattedMessage {...messages.prices} />
                </h5>
                <Button
                  color='success'
                  onClick={openPriceModalHandler}
                  className="btn rounded btn-success add__pricing-btn"
                >
                  <FormattedMessage {...messages.addPrice} />
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

                {priceList && !priceList.length > 0
                  ?
                  ( <>
                      <h5 className="page-subhead subhead">
                        <FormattedMessage {...messages.noInfo} />
                      </h5>
                    </>
                  )
                  : (
                    <div className="table-responsive price__table">
                      <Table striped responsive>
                        <thead>
                          <tr>
                            <th>Unit</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {priceList && priceList.map(item => (
                            <tr key={item.id}>
                              <td>{item.perhrdayweek}</td>
                              <td>{item.unit}</td>
                              <td>{item.price}</td>
                              <td>
                                <span style={iconStyles}>
                                  <DeleteForeverIcon
                                    size="20"
                                    color="#ff4861"
                                    onClick={() => deletePriceItem(item.id)}
                                  />
                                </span>
                                <span style={iconStyles}>
                                  <SquareEditOutlineIcon
                                    size="20"
                                    color="#555555"
                                    onClick={() => editPriceItem(item.id)}
                                  />
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
              <Col md={12} sm={12}>
                {showPriceWarning &&
                  <div className="alert--bordered alert alert-warning fade show" role="alert">
                    <button className="close" type="button" onClick={() => closeNotificationWarning()}>
                      <span className="lnr lnr-cross"></span>
                    </button>
                    <div className="alert__content">
                      <p>
                        <span className="bold-text"><FormattedMessage {...messages.attentionInfo} /> </span>
                        <FormattedMessage {...messages.priceDefinitionAlert} />
                      </p>
                      <p className="page-subhead subhead">
                        <FormattedMessage {...messages.priceInfo} />
                      </p>
                    </div>
                  </div>
                }
              </Col>
              <Row>
                <div className="addEditModal__footer">
                  <ButtonToolbar className="form__button-toolbar">
                    <button
                      className="rounded btn btn-danger"
                      type="submit"
                      onClick={() => onSaveVan(values)}
                      disabled={submitting || pristine }
                    >
                      <FormattedMessage {...messages.saveVan} />
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
  deletePriceItem: PropTypes.func,
  editPriceItem: PropTypes.func,
  showCoverPicWarning: PropTypes.bool,
}
export default AddVanForm;
