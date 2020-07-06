import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, Col, Badge, Table } from 'reactstrap';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import PlusCircleIcon from 'mdi-react/PlusCircleIcon';
import { FormattedMessage } from 'react-intl';

import Modal from '../../../shared/Modal';
import { formatDate, useMedia } from '../../utils';
import AddVan from './AddVan';
import EditVanForm from './EditVan';
import messages from '../messages';

const iconStyles = {
  marginRight: '10px',
  cursor: 'pointer'
};

const ResourceList = ({
  vanList,
  onSaveVan,
  openModel,
  modelToggle,
  priceInfoSaveHandler,
  priceModalHandler,
  closePriceModal,
  showPriceModal,
  showVanModelHandler,
  showPriceWarning,
  priceList,
  closeNotificationWarning,
  deleteResourceHandler,
  editResourceHandler,
  editItem,
  openEditModal,
  editModalToggle,
  editPriceItem,
  deletePriceItem,
  onUpdateVanRecord,
  editModalPriceDelete,
  coverDeleteHandler,
  showCoverPicWarning,
}) => {
  // for small devices
  const isDeviceSize900px = useMedia("(min-width: 900px)");
  const isDeviceSize750px = useMedia("(min-width: 750px)");
  const isDeviceSize610px = useMedia("(max-width: 610px)");
  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardBody>
          <div className="header__section container">
            <div className="col-md-2 header__button">


              <Modal
                color="primary"
                title=<FormattedMessage {...messages.addModalHeader} />
                header
                md
                openModel={openModel}
                modelToggle={() => modelToggle()}
              >
                <AddVan
                  onSaveVan={onSaveVan}
                  onPriceInfoSave={priceInfoSaveHandler}
                  openPriceModalHandler={priceModalHandler}
                  showPriceModal={showPriceModal}
                  closePriceModal={() => closePriceModal()}
                  priceList={priceList}
                  showPriceWarning={showPriceWarning}
                  closeNotificationWarning={closeNotificationWarning}
                  editPriceItem={editPriceItem}
                  deletePriceItem={deletePriceItem}
                  showCoverPicWarning={showCoverPicWarning}
                />
              </Modal>

              <Modal
                color="primary"
                title=<FormattedMessage {...messages.editModalHeader} />
                header
                md
                openModel={openEditModal}
                modelToggle={() => editModalToggle()}
              >
                <EditVanForm
                  onUpdateVanRecord={onUpdateVanRecord}
                  initialValues={editItem}
                  editModalPriceDelete={editModalPriceDelete}
                  coverDeleteHandler={coverDeleteHandler}
                />
              </Modal>

            </div>
            <div className="col-md-4 header__filter">
              {/* <span className="filter__wrapper">Filter</span> */}
              <button
                className="icon icon--right btn rounded btn-success add__resource"
                onClick={showVanModelHandler}
                type="button"
              >

                <FormattedMessage {...messages.addVan} />
                <PlusCircleIcon className="resource__add_icon" size="30" color="#555555"/>

              </button>
            </div>
          </div>
          <div className="table-responsive">
            <Table striped responsive>
              <thead>
                <tr>
                  <th><FormattedMessage {...messages.brand} /></th>
                  {isDeviceSize750px && <th><FormattedMessage {...messages.model} /></th>}
                  {isDeviceSize900px && <th><FormattedMessage {...messages.year} /></th>}
                  <th><FormattedMessage {...messages.status} /></th>
                  <th><FormattedMessage {...messages.action} /></th>
                </tr>
              </thead>
              <tbody>
                {vanList && vanList.map(item => (
                  <tr key={item.id}>
                    <td>{item.brand}</td>
                    {isDeviceSize750px && <td>{item.model}</td>}
                    {isDeviceSize900px && <td>{formatDate(item.year)}</td>}
                    <td>
                      {item.status ==='Available' && <Badge color="success">AVAILABLE</Badge>}
                      {item.status ==='Booked' && <Badge color="badge badge-primary">BOOKED</Badge>}
                      {item.status ==='Inuse' && <Badge color="badge badge-warning">IN USE</Badge>}
                      {item.status ==='Waiting' && <Badge color="badge badge-danger">WAITING</Badge>}
                      {item.status ==='Cancelled' && <Badge color="badge badge-info">CANCELLED</Badge>}
                      {item.status ==='Requested' && <Badge color="badge badge-info">WAITING</Badge>}
                    </td>
                    <td>
                      <span style={iconStyles}>
                        <DeleteForeverIcon
                          size={isDeviceSize610px ? "20" : "22"}
                          color="#ff4861"
                          onClick={() => deleteResourceHandler(item.id)}
                        />
                      </span>
                      <span style={iconStyles}>
                        <SquareEditOutlineIcon
                          size={isDeviceSize610px ? "20" : "22"}
                          color="#555555"
                          onClick={() => editResourceHandler(item.id)}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

    </Col>
  )
};


ResourceList.propTypes = {
  showVanModelHandler: PropTypes.func,
  openModel: PropTypes.bool,
  modelToggle: PropTypes.func,
  priceInfoSaveHandler: PropTypes.func,
  priceModalHandler: PropTypes.func,
  closePriceModal: PropTypes.func,
  showPriceModal: PropTypes.bool,
  onSaveVan: PropTypes.func,
  vanList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    createdAt: PropTypes.string,
    brand: PropTypes.string,
    cruisecontrol: PropTypes.bool,
    exteriordimensions: PropTypes.string,
    features: PropTypes.string,
    fueltype: PropTypes.string,
    interiordimensions: PropTypes.string,
    licensetype: PropTypes.string,
    located: PropTypes.string,
    mileage: PropTypes.number,
    model: PropTypes.string,
    passengernum: PropTypes.string,
    transmission: PropTypes.string,
    year: PropTypes.string,
  })).isRequired,
  priceList: PropTypes.arrayOf(PropTypes.shape({
    unit: PropTypes.number,
    price: PropTypes.number,
  })),
  closeNotificationWarning: PropTypes.func,
  showPriceWarning: PropTypes.bool,
  deleteResourceHandler: PropTypes.func,
  editResourceHandler: PropTypes.func,
  editItem: PropTypes.array,
  openEditModal: PropTypes.func,
  editModalToggle: PropTypes.bool,
  deletePriceItem: PropTypes.func,
  editPriceItem: PropTypes.object,
  onUpdateVanRecord: PropTypes.func,
  editModalPriceDelete: PropTypes.func,
  coverDeleteHandler: PropTypes.func,
  showCoverPicWarning: PropTypes.bool,
};

export default ResourceList;
