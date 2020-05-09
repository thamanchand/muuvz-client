import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, Col, Badge, Table } from 'reactstrap';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import PlusCircleIcon from 'mdi-react/PlusCircleIcon';

import Modal from '../../../shared/Modal';
import { formatDate } from '../../utils';
import AddVan from './AddVan';
import EditVanForm from './EditVan';

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
  togglePriceEditModal,
  onPriceUpdateHandler,
}) => (
  <Col md={12} lg={12} xl={12}>
    <Card>
      <CardBody>
        <div className="header__section container">
          <div className="col-md-2 header__button">


            <Modal
              color="primary"
              title="Add new van"
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
              />
            </Modal>

            <Modal
              color="primary"
              title="Edit van info"
              header
              md
              openModel={openEditModal}
              modelToggle={() => editModalToggle()}
            >
              <EditVanForm
                editItem={editItem}
                openPriceModalHandler={priceModalHandler}
                showPriceModal={showPriceModal}
                closePriceModal={() => closePriceModal()}
                priceList={priceList}
                showPriceWarning={showPriceWarning}
                closeNotificationWarning={closeNotificationWarning}
                initialValues={editItem}
                togglePriceEditModal={togglePriceEditModal}
                onPriceUpdate={onPriceUpdateHandler}
              />
            </Modal>

          </div>
          <div className="col-md-4 header__filter">
            {/* <span className="filter__wrapper">Filter</span> */}
            <button
              className="icon icon--right btn rounded btn-success btn-sm add__resource"
              onClick={showVanModelHandler}
              type="button"
            >
              <p className="add__resource_label">
                Add van
                <PlusCircleIcon className="resource__add_icon" size="30" color="#555555"/>
              </p>
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <Table striped responsive>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Year</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vanList && vanList.map(item => (
                <tr key={item.id}>
                  <td>{item.brand}</td>
                  <td>{item.model}</td>
                  <td>{formatDate(item.year)}</td>
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
                        size="22" color="#ff4861"
                        onClick={() => deleteResourceHandler(item.id)}
                      />
                    </span>
                    <span style={iconStyles}>
                      <SquareEditOutlineIcon
                        size="22"
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
);


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
  togglePriceEditModal: PropTypes.func,
  onPriceUpdateHandler: PropTypes.func,
};

export default ResourceList;
