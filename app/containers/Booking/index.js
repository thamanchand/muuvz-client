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

const key = 'bookingPage';

const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;


class BookingDashboard extends React.PureComponent {

  componentDidMount() {
    this.props.onBookingLoad();
    this.props.onResourceLoad();
  }

  render() {
    const { bookingList, resourceList } = this.props;

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
                  <BigCalendar bookingList={bookingList} />
                  <EventLabels resourceList={resourceList} />
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
  onResourceLoad: PropTypes.array,
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
