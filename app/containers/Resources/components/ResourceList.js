import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, Col, Badge, Table } from 'reactstrap';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import PlusCircleIcon from 'mdi-react/PlusCircleIcon';

import Modal from '../../../shared/Modal';
import { formatDate } from '../../utils';
import AddVan from './AddVan';

const iconStyles = {
  marginRight: '10px',
  cursor: 'pointer'
};

const AddIcon = <PlusCircleIcon className="addIcon" size="30" color="#555555"/>;

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
              />
            </Modal>
          </div>
          <div className="col-md-2 header__filter">
            <span className="filter__wrapper">Filter</span>
            <span
              className="add__resource"
              role="presentation"
              onKeyPress={showVanModelHandler}
              onClick={showVanModelHandler}>
              {AddIcon}
            </span>
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
                    {item.status ==='Available' && <Badge color="success">{item.status}</Badge>}
                    {item.status ==='Booked' && <Badge color="badge badge-primary">{item.status}</Badge>}
                    {item.status ==='Inuse' && <Badge color="badge badge-warning">In use</Badge>}
                  </td>
                  <td>
                    <span style={iconStyles}>
                      <DeleteForeverIcon
                        size="25" color="#ff4861"
                        onClick={() => deleteResourceHandler(item.id)}
                      />
                    </span>
                    <span style={iconStyles}>
                      <SquareEditOutlineIcon size="25" color="#555555" />
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
};

export default ResourceList;
