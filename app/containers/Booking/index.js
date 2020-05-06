import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';



import { onBookingLoad, onResourceLoad, onBookingAccept, onBookingCancel } from './action';
import { selectBookingSelector, resourceListSelector } from './selector';

import saga from './saga';
import reducer from './reducer';

import Layout from '../Layout';
// import Statistics from './components/Statistics';
import BigCalendar from './components/BigCalendar';
import EventLabels from './components/VanLabels';
import UserBooking from './components/UserBooking';

import { filterCustomerCurrentBookings, filterBusinessCurrentBookings, filterResourcesBelongsToUser } from '../utils';

// Utils
import auth from '../../utils/auth';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

const key = 'bookingPage';

class BookingDashboard extends React.Component {

  componentDidMount() {
    const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;
    if (auth.getToken() && isProfileCompleted) {
      this.props.onBookingLoad();
      this.props.onResourceLoad();
    }
  }

  acceptBookingHandler = (bookingId, resourceId) => {
    this.props.onBookingAccept(bookingId, resourceId);
  }

  cancelBookingHandler = (bookingId, resourceId) => {
    this.props.onBookingCancel(bookingId, resourceId);
  }

  render() {
    // const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;
    const { bookingList, resourceList } = this.props;
    const userId = auth.get('userInfo') && auth.get('userInfo').id;
    const isBusiness = auth.get('userInfo') && auth.get('userInfo').isbusiness;

    // filter resources blongs to currently logged in user
    const getUserResources = filterResourcesBelongsToUser(
      resourceList,
      userId
    );

    // filter current bookings belongs to user and booking start time is
    // greater than current date and time
    const getUserCurrentBookings = isBusiness
      ? filterBusinessCurrentBookings(bookingList, userId)
      : filterCustomerCurrentBookings(bookingList, userId);

    return (
      <div>
        <Layout />
        <div className="container__wrap">
          <Container className="dashboard container">
            <Row>
              <Col md={12}>
                <h3 className="page-title">Booking</h3>
              </Col>
            </Row>
            {/* isProfileCompleted && (
              <Row>
                <Statistics />
              </Row>
            ) */}
            {isBusiness ? (
              <Row>
                <div className="container dashboard">
                  <Row>
                    <BigCalendar bookingList={getUserCurrentBookings} />
                    <EventLabels
                      resourceList={getUserResources}
                      currentBookings={getUserCurrentBookings}
                      acceptBookingHandler={this.acceptBookingHandler}
                      cancelBookingHandler={this.cancelBookingHandler}
                    />
                  </Row>
                </div>
              </Row>
            ) : (
              <UserBooking currentBookings={getUserCurrentBookings} />
            )}
          </Container>
        </div>
      </div>
    )
  }
};

BookingDashboard.propTypes = {
  onBookingLoad: PropTypes.func,
  bookingList: PropTypes.array,
  onResourceLoad: PropTypes.func,
  resourceList: PropTypes.array,
  onBookingAccept: PropTypes.func,
  onBookingCancel: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  bookingList: selectBookingSelector(),
  resourceList: resourceListSelector(),
});

const mapDispatchToProps = (dispatch) => ({
  onBookingLoad: bindActionCreators(onBookingLoad, dispatch),
  onResourceLoad: bindActionCreators(onResourceLoad, dispatch),
  onBookingAccept: bindActionCreators(onBookingAccept, dispatch),
  onBookingCancel: bindActionCreators(onBookingCancel, dispatch),
});



const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BookingDashboard);
