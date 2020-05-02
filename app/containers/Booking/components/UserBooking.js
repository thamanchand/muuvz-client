import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, Col, Table } from 'reactstrap';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import PlusCircleIcon from 'mdi-react/PlusCircleIcon';

import { formatDate } from '../../utils';

const iconStyles = {
  marginRight: '10px',
  cursor: 'pointer'
};

const UserBooking = ({ currentBookings }) => (
  <Col md={12} lg={12} xl={12}>
    <Card>
      <CardBody>
        <div className="header__section container">
          <div className="col-md-2 header__button">
          </div>
          <div className="col-md-4 header__filter">
            {/* <span className="filter__wrapper">Filter</span> */}
            <button
              className="icon icon--right btn rounded btn-success btn-sm add__resource"
              onClick={() => console.log("clicked")}
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
                <th>Van Name</th>
                <th>Licence plate</th>
                <th>Pick & Drop off location</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings && currentBookings.map(item => (
                <tr key={item.id}>
                  <td>{item.resource.brand} ({item.resource.brand})</td>
                  <td>{item.resource.platenum}</td>
                  <td>{formatDate(item.bookedStartDateTime)} {formatDate(item.bookedEndDateTime)}</td>
                  <td>
                    Turku - Helsinki
                  </td>
                  <td>
                    <span style={iconStyles}>
                      <DeleteForeverIcon
                        size="25" color="#ff4861"
                        onClick={() => console.log("clicked")}
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

UserBooking.propTypes = {
  currentBookings: PropTypes.object,
}
export default UserBooking;
