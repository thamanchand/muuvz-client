import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Form, Field } from 'react-final-form';
import TimetableIcon from 'mdi-react/TimetableIcon';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import auth from '../../utils/auth';

import { onSearch, onBooking } from './actions';
import {
  selectResourcesSelector,
  isSearchLoadingSelector,
  isBookedSelector,
} from './selectors';

import Footer from '../HomePage/components/Footer';
import VanListing from './components/VanListing';
import saga from './saga';
import reducer from './reducers';

import HeaderNav from '../../shared/Header';
import renderDateTimePickerField from '../../shared/DateTimePicker/index';
// import renderCheckBoxField from '../../shared/Checkbox/index';
import Error from '../../shared/ErrorField';
import Modal from '../../shared/Modal'
import LoginPage from '../LoginPage';

import { filterAvailableResources } from '../utils';

const key = 'listingPage';

class VanListPage extends PureComponent {
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.location.search === "?loginSuccess") {
      return ({ showLoginPage: false, isEdit: false })
    }
    return null;
  }

  state = { isEdit: false, showLoginPage: false, }

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
      const payload = {
        resource: resourceId,
        user: userId,
        bookedStartDateTime: searchQuery.pickupDateTime,
        bookedEndDateTime: searchQuery.dropOfftDateTime,
        address: resourceAddress,
        status: 'Requested',
      }
      this.props.onBooking(payload);
    } else {
      this.setState({showLoginPage: true})
    }

  }

  modelToggle = () => {
    this.setState((prevState) => ({
      showLoginPage: !prevState.showLoginPage
    }))
  };

  render() {
    const { resourceList, isSearchLoading, isBooked } = this.props;
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
                  if (!values.pickupDateTime) {
                    errors.pickupDateTime = 'Pick up datetime is required';
                  }
                  if (!values.dropOfftDateTime) {
                    errors.dropOfftDateTime = 'Drop off datetime is required';
                  }
                  return errors
                }}
                onSubmit={(values) => onSearch(values)}
                initialValues={storedValues}
                render={({ handleSubmit, values }) => (
                  <form className="form" onSubmit={handleSubmit} style={{backgroundColor: '#FFF'}}>
                    <div className="col-lg-3 col-md-6 col-sm-6 resource__searchbar">
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
                        </div>
                        <Error name="location" />
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6 resource__searchbar">
                      <div className="form__form-group">
                        <span className="form__form-group-label">Pickup date & time</span>
                        <div className="form__form-group-field">
                          <Field
                            name="pickupDateTime"
                            component={renderDateTimePickerField}
                            disabled={!isEdit}
                          />
                          <div className="form__form-group-icon">
                            <TimetableIcon />
                          </div>
                        </div>
                        <Error name="pickupDateTime" />
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6 resource__searchbar">
                      <div className="form__form-group">
                        <span className="form__form-group-label">Drop-off date & time</span>
                        <div className="form__form-group-field">
                          <Field
                            name="dropOfftDateTime"
                            component={renderDateTimePickerField}
                            disabled={!isEdit}
                          />
                          <div className="form__form-group-icon">
                            <TimetableIcon />
                          </div>
                        </div>
                        <Error name="dropOfftDateTime" />
                      </div>

                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 resource__searchbar">
                      <div className="form__form-group">
                        <button
                          className="rounded btn btn-success search-btn"
                          type="button"
                          onClick={() => handleSubmit(values)}
                          disabled={!isEdit}
                          storedValues={storedValues}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                    {/* <div className="col-lg-3 col-md-6 col-sm-6 resource__searchbar">
                      <div className="form__form-group">
                        <div className="form__form-group-field resource__page__checkbox">
                          <span className="dropoff__label">Drop off</span>
                          <Field
                            name="dropAtPickUpLocation"
                            component={renderCheckBoxField}
                            color="#646777"
                            className="checkbox-btn  checkbox-btn--colored resource__checkbox"
                            label="Pickup location"
                            disabled={!isEdit}
                          />
                          <button
                            className="rounded btn btn-success search-btn"
                            type="button"
                            onClick={() => handleSubmit(values)}
                            disabled={!isEdit}
                            storedValues={storedValues}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div> */}
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
  })
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
