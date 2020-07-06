import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, CardBody, Col, Table, Badge } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';

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
                  <th><FormattedMessage {...messages.brand} /></th>
                  <th><FormattedMessage {...messages.plateNumber} /></th>
                  <th><FormattedMessage {...messages.bookingDateTime} /></th>
                  <th><FormattedMessage {...messages.pickupDropoffLocation} /></th>
                  <th><FormattedMessage {...messages.status} /></th>
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
                      {item.status ==='Booked' && <Badge color="badge badge-danger">
                        <FormattedMessage {...messages.booked} />
                      </Badge>}
                      {item.status ==='Cancelled' && <Badge color="badge badge-info">
                        <FormattedMessage {...messages.cancelled} />
                      </Badge>}
                      {item.status ==='Requested' && <Badge color="badge badge-info">
                        <FormattedMessage {...messages.waiting} />
                      </Badge>}
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
