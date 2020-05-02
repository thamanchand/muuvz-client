import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, CardBody, Col, Table } from 'reactstrap';

const UserBooking = ({ currentBookings }) => (
  <Col md={12} lg={12} xl={12}>
    <Card>
      <CardBody>
        {/* <div className="header__section container">
          <div className="col-md-2 header__button">
          </div>
          <div className="col-md-4 header__filter">

          </div>
        </div> */}
        {currentBookings && currentBookings.length ? (
          <div className="table-responsive">
            <Table striped responsive>
              <thead>
                <tr>
                  <th>Van Name</th>
                  <th>Licence plate</th>
                  <th>Date & time</th>
                  <th>Pick up & Drop off location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings && currentBookings.map(item => (
                  <tr key={item.id}>
                    <td>{item.resource.brand} ({item.resource.brand})</td>
                    <td>{item.resource.platenum}</td>
                    <td>{moment(item.bookedStartDateTime).format('MMMM d, YYYY HH:mm')} - {moment(item.bookedEndDateTime).format('MMMM d, YYYY HH:mm')}</td>
                    <td>
                      {item.address}
                    </td>
                    <td>
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>No booking yet!</p>
        )}
      </CardBody>
    </Card>

  </Col>
);

UserBooking.propTypes = {
  currentBookings: PropTypes.object,
}
export default UserBooking;
