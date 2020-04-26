import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import auth from '../../utils/auth';

import { onBookingLoad, onResourceLoad } from './action';
import { selectBookingSelector, resourceListSelector } from './selector';

import saga from './saga';
import reducer from './reducer';

import Layout from '../Layout/index';
import Statistics from './components/Statistics';
import BigCalendar from './components/BigCalendar';
import EventLabels from './components/VanLabels';

import { filterCurrentBookings, filterResourcesBelongsToUser } from '../utils';

const key = 'bookingPage';

const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;


class BookingDashboard extends React.PureComponent {

  componentDidMount() {
    this.props.onBookingLoad();
    this.props.onResourceLoad();
  }

  render() {
    const { bookingList, resourceList } = this.props;
    const userId = auth.get('userInfo') && auth.get('userInfo').id;

    // filter resources blongs to currently logged in user
    const getUserResources = filterResourcesBelongsToUser(
      resourceList,
      userId
    );

    // filter current bookings belongs to user and booking start time is
    // greater than current date and time
    const getUserCurrentBookings = filterCurrentBookings(bookingList, userId);

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
            {isProfileCompleted && (
              <Row>
                <Statistics />
              </Row>
            )}
            <Row>
              <div className="container dashboard">
                <Row>
                  <BigCalendar bookingList={getUserCurrentBookings} />
                  <EventLabels
                    resourceList={getUserResources}
                    currentBookings={getUserCurrentBookings}
                  />
                </Row>
              </div>
            </Row>
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
}

const mapStateToProps = createStructuredSelector({
  bookingList: selectBookingSelector(),
  resourceList: resourceListSelector(),
});

const mapDispatchToProps = (dispatch) => ({
  onBookingLoad: bindActionCreators(onBookingLoad, dispatch),
  onResourceLoad: bindActionCreators(onResourceLoad, dispatch),
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
