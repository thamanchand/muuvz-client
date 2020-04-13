import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { selectResourcesSelector } from './selectors';
import Search from '../../shared/SearchForm';
import VanListing from './components/VanListing';
import saga from './saga';
import reducer from './reducers';

const key = 'listingPage';

class VanListPage extends PureComponent {
  state = { isEdit: false }

  onSearchEditToggle = () => {
    const { isEdit } = this.state;
    this.setState({ isEdit: !isEdit})
  }

  render() {
    const { vanList } = this.props;
    const { isEdit } = this.state;

    return (
      <div className="Listing__page">
        <Container>
          <Row>
            <Col md={3} className="van__search">
              <div className="van__list-nav">
                <span
                  role="button"
                  tabIndex="0"
                  onClick={this.onSearchEditToggle}
                  onKeyDown={this.onSearchEditToggle}
                >Edit</span>
                <Search
                  onSearch={this.onSearch}
                  disabled={isEdit}
                />
              </div>
            </Col>
            <Col md={9} className="van__content">
              <div className="van__list">
                <VanListing
                  vanList={vanList}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

VanListPage.propTypes = {
  // onVanListLoad: PropTypes.func,
  vanList: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    createdAt: PropTypes.string,
    brand: PropTypes.string,
    cruisecontrol: PropTypes.bool,
    exteriordimensions: PropTypes.string,
    features: PropTypes.bool,
    fueltype: PropTypes.string,
    interiordimensions: PropTypes.string,
    licensetype: PropTypes.string,
    located: PropTypes.string,
    mileage: PropTypes.number,
    model: PropTypes.string,
    passengernum: PropTypes.string,
    transmission: PropTypes.string,
    year: PropTypes.string,
  })).isRequired,
}

const mapStateToProps = createStructuredSelector({
  vanList: selectResourcesSelector(),
});


const withConnect = connect(
  mapStateToProps,
  null,
);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VanListPage);
