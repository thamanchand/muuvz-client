import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Card, CardBody, Col, ButtonToolbar, Table } from 'reactstrap';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation'
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
import EditPriceModal from './EditPrice';
import GallerySlideShow from '../../../shared/GalleySlideshow';
import messages from '../messages';

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
  coverDeleteHandler,
}) => {

  const [initialEditFormValues, setInitialEditFormValues] = React.useState(initialValues)
  const [pricingList, setPricinglist] = React.useState(initialValues && initialValues.pricing);
  const [isPriceEditModalOpen, setIsPriceEditModalOpen] = React.useState(false);
  const [isAddPriceModalOpen, setIsAddPriceModalOpen] = React.useState(false);
  const [selectedPriceItem, setSelectedPriceItem] = React.useState();
  const [showPriceWarning, setShowPriceWarning] = React.useState(false);
  const [coverPicsList, setCoverPicsList] = React.useState(initialValues.cover);
  const [coverPicMissingWarning, setCoverPicMissingWarning] = React.useState(false);
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
      perhrdayweek: newPrice.perhrdayweek.value,
    };

    setPricinglist([...pricingList, newItem]);
    // setInitialEditFormValues({...initialEditFormValues, pricing: [...pricingList, newItem]})
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
        ? {...priceItem, unit: priceItem.unit, price: priceItem.price, perhrdayweek: priceItem.perhrdayweek.value}
        : item
      ))
      setPricinglist(updatePriceItemFromAPI);
      // setInitialEditFormValues({...initialEditFormValues, pricing: updatePriceItemFromAPI() })
      setIsPriceEditModalOpen(false);

    } else {
      const updatePriceItemFromStore = () => pricingList.map(item => (item.id === priceItem.id ? {...priceItem} : item))
      setPricinglist(updatePriceItemFromStore);
      // setInitialEditFormValues({...initialEditFormValues, pricing: updatePriceItemFromStore() })
      setIsPriceEditModalOpen(false);
    }
  }

  const closeNotificationWarning = () => {
    setShowPriceWarning(false);
  }

  const updateVanInfoHandler = (values) => {
    if (!pricingList.length > 0) {
      setShowPriceWarning(true);
    }
    if(!coverPicsList.length) {
      setCoverPicMissingWarning(true);
    }
    if (!coverPicsList.length && !values.files) {
      setCoverPicMissingWarning(true);
    }
    else {
      onUpdateVanRecord(values, pricingList);
      setPricinglist([]);
      setIsPriceEditModalOpen()
      setShowPriceWarning(false);
      setCoverPicMissingWarning(false);
    }
  }

  const onCoverPicDelete = (coverId, formInitialValues) => {
    const filterUnDeletedcoverImages = coverPicsList.filter(coverItem => coverItem.id !== coverId);
    const resourceUpdatePayload = {
      ...formInitialValues, cover: [...filterUnDeletedcoverImages]
    };
    coverDeleteHandler(coverId, resourceUpdatePayload);
    setCoverPicsList(filterUnDeletedcoverImages);
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
            initialValues={initialEditFormValues}
            onSubmit={onSubmit}
            render={({ handleSubmit, pristine, values, submitting }) => (
              <form className="form form--vertical" onSubmit={handleSubmit}>
                <div className="container">
                  <h5 className="bold-text header_label">Business</h5>
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
                  </div>
                  <Error name="mileage" />
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
                        defaultValue={{ value: initialValues.fueltype, label: initialValues.fueltype}}
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
                        defaultValue={{ value: initialValues.transmission, label: initialValues.transmission}}
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
                        defaultChecked={initialValues.airbag || false}
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
                        defaultChecked={initialValues.airconditioning || false }
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
                        defaultChecked={initialValues.cruisecontrol || false}
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
                {coverPicsList && coverPicsList.length > 0 && (
                <>
                  <div className="container">
                    <h5 className="bold-text header_label">
                      <FormattedMessage {...messages.uploadedPictures} />
                    </h5>
                  </div>
                  <div className="container">
                    <div className="row justify-content-center">
                      <Col md={6} sm={6} className="col-md-offset-3">
                        <div className="slideshow">

                          <GallerySlideShow
                            input={coverPicsList}
                            ratio="3:2"
                            mode="manual"
                            source="resourceEdit"
                            coverDelete={(coverId) => onCoverPicDelete(
                              coverId,
                              initialValues
                            )}
                          />
                        </div>
                      </Col>
                    </div>
                  </div>
                </>
                )}
                <Col md={12} sm={12} >
                  <h3 className="header_label pricing">
                    <FormattedMessage {...messages.uploadPictures} />
                  </h3>
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
                  {coverPicMissingWarning && coverPicsList.length === 0 && (
                    <div className="alert--bordered alert alert-warning fade show" role="alert">
                      <div className="alert__content">
                        <p>
                          <span className="bold-text"><FormattedMessage {...messages.attentionInfo} /> </span>
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
                    onClick={addNePriceHandler}
                    className="btn rounded btn-success add__pricing-btn"
                  >
                    <FormattedMessage {...messages.addPrice} />
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
                          <span className="bold-text"><FormattedMessage {...messages.attentionInfo} /> </span>
                          <FormattedMessage {...messages.priceDefinitionAlert} />
                        </p>
                        <p className="page-subhead subhead">
                          <FormattedMessage {...messages.priceInfo} />
                        </p>
                      </div>
                    </div>
                  }
                  {pricingList && !pricingList.length > 0
                    ?
                    ( <>
                        <h5 className="page-subhead subhead">
                          <FormattedMessage {...messages.noInfo} />
                        </h5>
                        <p className="validation__error">Please add van pricing options </p>
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
                            {pricingList && pricingList.map(item => (
                              <tr key={item.id}>
                                <td>{item.perhrdayweek}</td>
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
                        disabled={submitting || pristine }
                      >
                        <FormattedMessage {...messages.updateVanBtn} />
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
  coverDeleteHandler: PropTypes.func,
}

export default React.memo(EditVanForm);
