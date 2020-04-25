import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';


// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import auth from '../../utils/auth';

import { onSearch, onBooking } from './actions';
import { selectResourcesSelector, isSearchLoadingSelector } from './selectors';
import Search from '../../shared/SearchForm';
import VanListing from './components/VanListing';
import saga from './saga';
import reducer from './reducers';

import HeaderNav from '../../shared/Header';

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
    const { resourceList, isSearchLoading } = this.props;
    const { isEdit } = this.state;
    const storedValues = JSON.parse(window.localStorage.getItem('searchQuery'));

    return (
      <>
        <HeaderNav source="listing" />
        <div className="Listing__page">
          <Container>
            <Row>
              <Col md={3} className="van__search">
                <div className="van__list-nav">
                  <div
                    className="edit-btn"
                    role="button"
                    tabIndex="0"
                    onClick={this.onSearchEditToggle}
                    onKeyDown={this.onSearchEditToggle}
                  >
                    Edit search
                  </div>
                  <div className="search__wrapper">
                    <Search
                      onSearch={this.onSearch}
                      disabled={isEdit}
                      storedValues={storedValues}
                    />
                  </div>
                </div>
              </Col>
              <Col md={9} className="van__content">
                <div className="van__list">
                  <VanListing
                    vanList={resourceList}
                    bookingHandler={this.bookingHandler}
                    isSearchLoading={isSearchLoading}
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
  isSearchLoading: isSearchLoadingSelector()
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
