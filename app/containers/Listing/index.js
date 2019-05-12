import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Container, Row, Col } from 'reactstrap';
import { createStructuredSelector } from 'reselect';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { onVanListLoad } from './actions';
import { makeSelectVans } from './selectors';
import Search from '../HomePage/components/Search';
import VanListing from './components/VanListing';
import saga from './saga';
import reducer from './reducers';

const key = 'listingPage';

class VanListPage extends PureComponent {

  componentDidMount() {
    this.props.onVanListLoad();
  }

  render() {
    const { vanList } = this.props;
    return (
      <div className="Listing__page">
        <Container>
          <Row>
            <Col md={3} className="van__search">
              <div className="van__list-nav">
                <Search />
              </div>
            </Col>
            <Col md={9} className="van__content">
              <div className="van__list">
                <VanListing vanList={vanList} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

VanListPage.propTypes = {
  onVanListLoad: PropTypes.func,
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
  vanList: makeSelectVans(),
});

const mapDispatchToProps = (dispatch) => ({
  onVanListLoad: bindActionCreators(onVanListLoad, dispatch)
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
