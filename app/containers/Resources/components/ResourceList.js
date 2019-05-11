import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, Col, Badge, Table } from 'reactstrap';

import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';

import Modal from '../../../shared/Modal';

const iconStyles = {
  marginRight: '10px',
};

const ResourceList = ({ vanList }) => (
  <Col md={12} lg={12} xl={12}>
    <Card>

      <CardBody>
        <div className="header__section container">
          <div className="col-md-2 header__button">
            <Modal
              color="primary"
              title="Add new van"
              header
              btn="Add new van"
              message="Hello "
            />
          </div>
          <div className="col-md-2 header__filter">
            <span>Filter</span>
          </div>
        </div>
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
              <tr>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.year}</td>
                <td>
                  <Badge color="success">Available</Badge>
                </td>
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
      </CardBody>
    </Card>

  </Col>
);

ResourceList.propTypes = {
  vanList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    createdAt: PropTypes.string,
    brand: PropTypes.string,
    cruisecontrol: PropTypes.bool,
    exteriordimensions: PropTypes.string,
    features: PropTypes.bool,
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
};

export default ResourceList;
