import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
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

import VanListing from './components/VanListing';
import saga from './saga';
import reducer from './reducers';

import HeaderNav from '../../shared/Header';
import renderDateTimePickerField from '../../shared/DateTimePicker/index';
import renderCheckBoxField from '../../shared/Checkbox/index';
import Error from '../../shared/ErrorField';

const key = 'listingPage';

class VanListPage extends PureComponent {
  state = { isEdit: false }

  componentDidMount() {
    const searchQuery = JSON.parse(window.localStorage.getItem('searchQuery'));
    this.props.onSearch(searchQuery);
  }

  onSearchEditToggle = () => {
    const { isEdit } = this.state;
    this.setState({ isEdit: !isEdit})
  }

  bookingHandler = (resourceId) => {
    const searchQuery = JSON.parse(window.localStorage.getItem('searchQuery'));

    const payload = {
      resource: resourceId,
      user: auth.get('userInfo').id,
      bookedStartDateTime: searchQuery.pickupDateTime,
      bookedEndDateTime: searchQuery.dropOfftDateTime
    }
    this.props.onBooking(payload);
  }


  render() {
    const { resourceList, isSearchLoading, isBooked } = this.props;
    const { isEdit } = this.state;
    const storedValues = JSON.parse(window.localStorage.getItem('searchQuery'));

    return (
      <>
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
                    <div className="col-lg-3 col-md-3 col-sm-12 resource__searchbar">
                      <div className="form__form-group">
                        <span className="form__form-group-label">Pickup location</span>
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

                    <div className="col-lg-3 col-md-3 col-sm-12 resource__searchbar">
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

                    <div className="col-lg-3 col-md-3 col-sm-12 resource__searchbar">
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
                    <div className="col-lg-3 col-md-3 col-sm-12 resource__searchbar">
                      <div className="form__form-group">
                        <div className="form__form-group-field resource__page__checkbox">
                          <Field
                            name="dropAtPickUpLocation"
                            component={renderCheckBoxField}
                            color="#646777"
                            className="checkbox-btn  checkbox-btn--colored"
                            label="Drop-off at pickup location"
                            disabled={!isEdit}
                          />
                          <button
                            className="rounded btn btn-primary search-btn"
                            type="button"
                            onClick={() => handleSubmit(values)}
                            disabled={!isEdit}
                            storedValues={storedValues}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              />
            </div>
          </div>

          <Container>
            <Row>
              <Col md={12} className="van__content">
                <div className="van__list">
                  <VanListing
                    vanList={resourceList}
                    bookingHandler={this.bookingHandler}
                    isSearchLoading={isSearchLoading}
                    isBooked={isBooked}
                  />
                </div>
              </Col>
            </Row>
          </Container>
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
