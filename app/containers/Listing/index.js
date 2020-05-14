import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Form, Field } from 'react-final-form';
import ClockOutlineIcon from 'mdi-react/ClockOutlineIcon';
import EventIcon from 'mdi-react/EventIcon';
import CityIcon from 'mdi-react/CityIcon';

import moment from 'moment';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import auth from '../../utils/auth';

import { onSearch, onBooking } from './actions';
import {
  selectResourcesSelector,
  isSearchLoadingSelector,
  isBookedSelector,
  selectedResourceIdSelector,
} from './selectors';

import Footer from '../HomePage/components/Footer';
import VanListing from './components/VanListing';
import saga from './saga';
import reducer from './reducers';

import HeaderNav from '../../shared/Header';
// import renderDateTimePickerField from '../../shared/DateTimePicker/index';
import renderDatePickerField from '../../shared/Datepicker';
import renderTimePickerFied from '../../shared/TimePicker';

// import renderCheckBoxField from '../../shared/Checkbox/index';
import Error from '../../shared/ErrorField';
import Modal from '../../shared/Modal'
import LoginPage from '../LoginPage';

import { filterAvailableResources } from '../utils';

const humanizeDuration = require('humanize-duration');

const key = 'listingPage';

class VanListPage extends PureComponent {
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.location.search === "?loginSuccess") {
      return ({ showLoginPage: false, isEdit: false })
    }
    return null;
  }

  state = {
    isEdit: false,
    showLoginPage: false,
    duration: null,
    bookingStartDateTime: null,
    bookingEndDateTime: null,
    isStartDateTimeGreater: null,
  }

  componentDidMount() {
    const searchQuery = JSON.parse(window.localStorage.getItem('searchQuery'));
    this.props.onSearch(searchQuery);
  }

  onSearchEditToggle = () => {
    const { isEdit } = this.state;
    this.setState({ isEdit: !isEdit})
  }

  LoginModalToggle = () => {
    this.setState((prevState) => ({
      showLoginPage: !prevState.showLoginPage
    }))
  }

  closeLoginModal = () => {
    this.setState((prevState) => ({
      showLoginPage: !prevState.showLoginPage
    }))
  };

  bookingHandler = (resourceId, resourceAddress) => {
    const userId = auth.get('userInfo') && auth.get('userInfo').id;
    const searchQuery = JSON.parse(window.localStorage.getItem('searchQuery'));

    if (userId && searchQuery) {
      const combinedStartDateTime = moment(`${searchQuery.pickupDate}${'T'}${searchQuery.pickupTime}${':00Z]'}`, 'YYYY-MM-DDTHH:mm:ssZ');
      const combinedEndDateTime = moment(`${searchQuery.dropOffDate}${'T'}${searchQuery.dropOffTime}${':00Z]'}`, 'YYYY-MM-DDTHH:mm:ssZ');
      const payload = {
        resource: resourceId,
        user: userId,
        bookedStartDateTime: combinedStartDateTime,
        bookedEndDateTime: combinedEndDateTime,
        address: resourceAddress,
        status: 'Requested',
      }
      this.props.onBooking(payload, resourceId);
    } else {
      this.setState({showLoginPage: true})
    }

  }

  modelToggle = () => {
    this.setState((prevState) => ({
      showLoginPage: !prevState.showLoginPage
    }))
  };

  startDateChanged = (startDate) => {
    this.setState(() =>
      ({ bookingStartDateTime: moment(startDate).format('YYYY-MM-DD') })
    );
  }

  endDateChanged = (endDate) => {
    this.setState(() => (
      { bookingEndDateTime: moment(endDate).format('YYYY-MM-DD') })
    );
  }

  endTimeChanged = (endTime) => {
    const { bookingEndDateTime, bookingStartDateTime } = this.state;
    // format End Time
    const formatEndTime = moment(endTime).format('HH:mm');
    // combined EndDate with endTime
    const combinedWithEndDate = moment(`${moment(bookingEndDateTime).format('YYYY-MM-DD')}${formatEndTime}`, 'YYYY-MM-DDTHH:mm:ss');
    this.setState(() => ({
      bookingEndDateTime: moment(combinedWithEndDate).format('YYYY-MM-DDTHH:mm')
    }));

    // check if startDateTime is greater than endDateTime
    this.setState((prevState) =>
      ({ isStartDateTimeGreater: moment(prevState.bookingStartDateTime).isAfter(prevState.bookingEndDateTime)})
    );

    // calculate number of hours
    const bookingHours = moment(bookingEndDateTime)
      .diff(moment(bookingStartDateTime, 'YYYY-MM-DDTHH:mm'));
    this.setState(() => ({ duration: bookingHours }));
  }

  startTimeChanged = (startTime) => {
    const { bookingEndDateTime, bookingStartDateTime } = this.state;
    // format startTime HH:mm
    const formatStartTime = moment(startTime).format('HH:mm');
    // combined startDate with startTime
    const combinedWithStartDate = moment(`${moment(bookingStartDateTime).format('YYYY-MM-DD')}${formatStartTime}`, 'YYYY-MM-DDTHH:mm');
    this.setState(() =>
      ({
        bookingStartDateTime: moment(combinedWithStartDate).format('YYYY-MM-DDTHH:mm')
      })
    );

    this.setState((prevState) =>
      ({
        isStartDateTimeGreater: moment(prevState.bookingStartDateTime).isAfter(prevState.bookingEndDateTime)
      })
    );

    // calculate number of hours
    const bookingHours = moment(bookingEndDateTime)
      .diff(moment(bookingStartDateTime, 'YYYY-MM-DDTHH:mm'));
    this.setState(() => ({duration: bookingHours}));
  }

  render() {
    const { resourceList, isSearchLoading, isBooked, selectedResourceId } = this.props;

    const { isEdit } = this.state;
    const storedValues = JSON.parse(window.localStorage.getItem('searchQuery'));
    const availableResources = filterAvailableResources(resourceList);
    return (
      <>
        <Modal
          color="primary"
          title="Login to continue booking"
          header
          md
          openModel={this.state.showLoginPage}
          onClose={this.closeLoginModal}
          modelToggle={this.modelToggle}
        >
          <LoginPage source="listingPage" />
        </Modal>
        <HeaderNav source="listing" />

        <div className="Listing__page">
          <div className="col-lg-12">

            <div className="row">
              <div
                className="editbtn__wrapper"
              >
                <span
                  role="button"
                  tabIndex="0"
                  onClick={this.onSearchEditToggle}
                  onKeyDown={this.onSearchEditToggle}
                  className="edit-btn"
                >
                  Edit search
                </span>
              </div>
              <Form
                validate={values => { // validate both passowrds are same
                  const errors = {};
                  if (!values.location) {
                    errors.location = 'Location is required';
                  }
                  if (!values.pickupDate) {
                    errors.pickupDate = 'Pick up date is required';
                  }
                  if (!values.pickupTime) {
                    errors.pickupTime = 'Pikup time is required';
                  }
                  if (!values.dropOffDate) {
                    errors.dropOffDate = 'Drop off date is required';
                  }
                  if (!values.dropOffTime) {
                    errors.dropOffTime = 'Drop off time is required';
                  }
                  return errors
                }}
                onSubmit={(values) => onSearch(values)}
                initialValues={storedValues}
                render={({ handleSubmit, values }) => (
                  <form className="form" onSubmit={handleSubmit} style={{backgroundColor: '#FFF'}}>
                    <Col className="col-lg-2 col-md-6  col-sm-6 col-12 resource__searchbar">
                      <div className="form__form-group">
                        <span className="form__form-group-label">City</span>
                        <div className="form__form-group-field">
                          <Field
                            name="location"
                            component="input"
                            type="text"
                            placeholder="Helsinki"
                            required
                            disabled={!isEdit}
                          />
                          <div className="form__form-group-icon">
                            <CityIcon />
                          </div>
                        </div>
                        <Error name="location" />
                      </div>
                    </Col>

                    <Col className="col-lg-2 col-md-6  col-sm-6 col-12">
                      <div className="form__form-group">
                        <span className="form__form-group-label">Pickup date</span>
                        <div className="form__form-group-field">
                          <Field
                            name="pickupDate"
                            component={renderDatePickerField}
                            disabled={!isEdit}
                            startDateChanged={(startDate) => this.startDateChanged(startDate)}
                            className="search__field_input"
                          />
                          <div className="form__form-group-icon">
                            <EventIcon />
                          </div>
                        </div>
                        <Error name="pickupDate" />
                      </div>
                    </Col>
                    <Col className="col-lg-2 col-md-6  col-sm-6 col-12">
                      <div className="form__form-group form-pickuptime">
                        <span className="form__form-group-label">Pickup time</span>
                        <div className="form__form-group-field">
                          <Field
                            name="pickupTime"
                            component={renderTimePickerFied}
                            disabled={!isEdit}
                            startTimeChanged={(startTime) => this.startTimeChanged(startTime)}
                            className="search__field_input"
                          />
                          <div className="form__form-group-icon">
                            <ClockOutlineIcon />
                          </div>
                        </div>
                        <Error name="pickupTime" />
                      </div>
                    </Col>
                    <Col className="col-lg-2 col-md-6  col-sm-6 col-12">
                      <div className="form__form-group">
                        <span className="form__form-group-label">Drop-off date</span>
                        <div className="form__form-group-field">
                          <Field
                            name="dropOffDate"
                            component={renderDatePickerField}
                            disabled={!isEdit}
                            endDateChanged={(endDate) => this.endDateChanged(endDate)}
                          />
                          <div className="form__form-group-icon">
                            <EventIcon />
                          </div>
                        </div>
                        <Error name="dropOffDate" />
                      </div>
                    </Col>
                    <Col className="col-lg-2 col-md-6 col-sm-6 col-12">
                      <div className="form__form-group form-pickuptime">
                        <span className="form__form-group-label">Drop-off time</span>
                        <div className="form__form-group-field">
                          <Field
                            name="dropOffTime"
                            component={renderTimePickerFied}
                            disabled={!isEdit}
                            endTimeChanged={(endTime) => this.endTimeChanged(endTime)}
                            className="search__field_input"
                          />
                          <div className="form__form-group-icon">
                            <ClockOutlineIcon />
                          </div>
                        </div>
                        <Error name="dropOffTime" />
                      </div>
                    </Col>
                    <Col className="col-lg-2 col-md-6  col-sm-6 col-12" >
                      <button
                        className="rounded btn btn-success search-btn"
                        type="button"
                        onClick={() => handleSubmit(values)}
                      >
                      Search van
                      </button>
                    </Col>
                    <Col className="col-md-12 col-sm-12">
                      {this.state.isStartDateTimeGreater && (
                        <div className="search__error">
                          Please select date, hour and minute
                        </div>
                      )
                      }
                      {this.state.startDateTime
                        && this.state.endDateTimethis.state.duration < '7200000' && (
                        <div className="search__error">
                          You can not book less than 2 hrs
                        </div>
                      )}
                      <p className="booking__duration">
                        {this.state.startDateTime && this.state.endDateTime && (
                          humanizeDuration(this.state.duration,  { language: 'fi' })
                        )}
                      </p>
                    </Col>
                  </form>
                )}
              />
            </div>
          </div>
          <div>
            <Col md={12} className="van__content">
              <div className="van__list">
                <VanListing
                  vanList={availableResources}
                  bookingHandler={this.bookingHandler}
                  isSearchLoading={isSearchLoading}
                  isBooked={isBooked}
                  selectedResourceId={selectedResourceId}
                />
              </div>
              <Footer />
            </Col>
          </div>
        </div>
      </>
    );
  }
}

VanListPage.propTypes = {
  // onVanListLoad: PropTypes.func,
  resourceList: PropTypes.object,
  onSearch: PropTypes.func,
  isSearchLoading: PropTypes.bool,
  isBooked: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  selectedResourceId: PropTypes.number,
  // vanList: PropTypes.arrayOf(PropTypes.shape({
  //   _id: PropTypes.string,
  //   createdAt: PropTypes.string,
  //   brand: PropTypes.string,
  //   cruisecontrol: PropTypes.bool,
  //   exteriordimensions: PropTypes.string,
  //   features: PropTypes.bool,
  //   fueltype: PropTypes.string,
  //   interiordimensions: PropTypes.string,
  //   licensetype: PropTypes.string,
  //   located: PropTypes.string,
  //   mileage: PropTypes.number,
  //   model: PropTypes.string,
  //   passengernum: PropTypes.string,
  //   transmission: PropTypes.string,
  //   year: PropTypes.string,
  // })).isRequired,
}

VanListPage.propTypes = {
  onBooking: PropTypes.func,
}
const mapStateToProps = createStructuredSelector({
  resourceList: selectResourcesSelector(),
  isSearchLoading: isSearchLoadingSelector(),
  isBooked: isBookedSelector(),
  selectedResourceId: selectedResourceIdSelector(),
});

const mapDispatchToProps = (dispatch) => ({
  onSearch: bindActionCreators(onSearch, dispatch),
  onBooking: bindActionCreators(onBooking, dispatch),
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
)(VanListPage);
