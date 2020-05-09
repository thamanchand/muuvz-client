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
import renderSelectField from '../../../shared/SelectField';
import renderMaskInput from '../../../shared/MaskInput';

import AddPrice from './AddPrice';
import Modal from '../../../shared/Modal';
import EditPriceModal from './EditPrice';

const { uuid } = require('uuidv4');

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

const EditVanForm = ({
  onUpdateVanRecord,
  initialValues,
  editModalPriceDelete,
}) => {
  const [initialEditFormValues, setInitialEditFormValues] = React.useState(initialValues)
  const [pricingList, setPricinglist] = React.useState(initialValues && initialValues.pricing);
  const [isPriceEditModalOpen, setIsPriceEditModalOpen] = React.useState(false);
  const [isAddPriceModalOpen, setIsAddPriceModalOpen] = React.useState(false);
  const [selectedPriceItem, setSelectedPriceItem] = React.useState();
  const [showPriceWarning, setShowPriceWarning] = React.useState(false);
  // const [isDeleteConfirm, setIsDeleteConfirm] = React.useState(false);

  const deletePriceHandler = (priceId) => {
    // check if delete price is from api fetch. If it is then delete it by calling
    // editModalPriceDelete
    const isDeletedPriceFromAPI = pricingList.find(item => item.id === priceId);
    if (isDeletedPriceFromAPI.resource) {
      editModalPriceDelete(priceId);
    }
    const newPriceList = pricingList.filter(price => price.id !== priceId);
    setPricinglist(newPriceList);
    setInitialEditFormValues({...initialEditFormValues, pricings: newPriceList });

  }

  const editPriceHandler = (priceId) => {
    const findSelectedPrice = pricingList.find(item => item.id === priceId);
    setSelectedPriceItem(findSelectedPrice);
    setIsPriceEditModalOpen(true);
  }

  const onPriceAddHandler = (newPrice) => {
    // create a new item
    const newItem = {
      id: uuid(),
      unit: newPrice.unit,
      price: newPrice.price,
    };

    setPricinglist([...pricingList, newItem]);
    setInitialEditFormValues({...initialEditFormValues, pricing: [...pricingList, newItem]})
    setIsAddPriceModalOpen(false);
  }

  const addNePriceHandler = () => {
    setIsAddPriceModalOpen(true);
  }

  const closePriceModalHandler = () => {
    setIsAddPriceModalOpen(!isAddPriceModalOpen);
  }

  const togglePriceEditModal = () => {
    setIsPriceEditModalOpen(!isPriceEditModalOpen);
  }

  const onPriceUpdateHandler = (priceItem) => {
    const doesPriceIdExistInAPI = pricingList.find(item => item.id === priceItem.id && item.resource);

    if (doesPriceIdExistInAPI) {
      const updatePriceItemFromAPI = () => pricingList.map(item => (item.id === priceItem.id
        ? {...priceItem, unit: priceItem.unit, price: priceItem.price}
        : item
      ))
      setPricinglist(updatePriceItemFromAPI);
      setInitialEditFormValues({...initialEditFormValues, pricing: [updatePriceItemFromAPI] })
      setIsPriceEditModalOpen(false);

    } else {
      const updatePriceItemFromStore = () => pricingList.map(item => (item.id === priceItem.id ? {...priceItem} : item))
      setPricinglist(updatePriceItemFromStore);
      setInitialEditFormValues({...initialEditFormValues, pricing: [updatePriceItemFromStore] })
      setIsPriceEditModalOpen(false);
    }
  }

  const closeNotificationWarning = () => {
    setShowPriceWarning(false);
  }

  const updateVanInfoHandler = (values) => {
    if(!pricingList.length > 0) {
      setShowPriceWarning(true);
    } else {
      onUpdateVanRecord(values);
      setPricinglist([]);
      setIsPriceEditModalOpen()
      setShowPriceWarning(false);
    }
  }

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <EditPriceModal
            show={isPriceEditModalOpen}
            onClose={togglePriceEditModal}
            onPriceUpdate={onPriceUpdateHandler}
            currentlyEditedPriceItem={selectedPriceItem}
          />
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
            initialValues={initialEditFormValues}
            onSubmit={onSubmit}
            render={({ handleSubmit, pristine, values, submitting, invalid }) => (
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
                    <span className="form__form-group-label">License-plate <span> (IKS-314)</span></span>
                    <div className="form__form-group-field">
                      <Field
                        placeholder="IKS-314"
                        name="platenum"
                        component={renderMaskInput}
                        type="text"
                        required
                        mask={[all, all, all, '-', all, all, all]}
                      />
                    </div>
                    <Error name="platenum" />
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
                        name='fueltype'
                        component={renderSelectField}
                        options={[
                          {value: 'Diesel', label: 'Diesel'},
                          {value: 'Petrol', label: 'Petrol'},
                          {value: 'Hybrid', label: 'Hybrid'},
                          {value: 'Electric', label: 'Electric'},
                        ]}
                        defaultValue={{ value: initialValues.fueltype, label: initialValues.fueltype}}
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
                        defaultChecked={initialValues.airbag || false}
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
                        defaultChecked={initialValues.airconditioning || false }
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
                        defaultChecked={initialValues.cruisecontrol || false}
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
                    onClick={addNePriceHandler}
                    className="btn rounded btn-success add__pricing-btn"
                  >
                    Add pricing option
                  </Button>
                  <Modal
                    color="primary"
                    title="Add new price"
                    header
                    sm
                    openModel={isAddPriceModalOpen}
                    closePriceModal={closePriceModalHandler}
                    showConfirm={pricingList && pricingList.length > 0 && true }
                  >
                    <AddPrice
                      onPriceInfoSave={onPriceAddHandler}
                      closePriceModal={() => closePriceModalHandler()}
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
                  {pricingList && !pricingList.length > 0
                    ?
                    ( <>
                        <h5 className="page-subhead subhead">No data </h5>
                        <p className="validation__error">Please add van pricing options </p>
                      </>
                    )
                    : (
                      <div className="table-responsive price__table">
                        <Table striped responsive>
                          <thead>
                            <tr>
                              <th>Qty</th>
                              <th>Price</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pricingList && pricingList.map(item => (
                              <tr key={item.id}>
                                <td>{item.unit}</td>
                                <td>{item.price}</td>
                                <td>
                                  <span style={iconStyles}>
                                    <DeleteForeverIcon
                                      size="20"
                                      color="#ff4861"
                                      onClick={() => deletePriceHandler(item.id)}
                                    />
                                  </span>
                                  <span style={iconStyles}>
                                    <SquareEditOutlineIcon
                                      size="20"
                                      color="#555555"
                                      onClick={() => editPriceHandler(item.id)}
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
                <Row>
                  <div className="addEditModal__footer">
                    <ButtonToolbar className="form__button-toolbar">
                      <button
                        className="rounded btn btn-danger"
                        type="submit"
                        onClick={() => updateVanInfoHandler(values)}
                        disabled={submitting || pristine || invalid}
                      >
                        Update record
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
  )
};

EditVanForm.propTypes = {
  onUpdateVanRecord: PropTypes.func,
  initialValues: PropTypes.object,
  editModalPriceDelete: PropTypes.func,
}

export default EditVanForm;
