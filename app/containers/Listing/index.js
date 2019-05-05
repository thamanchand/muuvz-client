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

class VanListPage extends PureComponent {

  componentDidMount() {
    this.props.onVanListLoad();
  }

  render() {
    return (
      <div className="Listing__page">
        <Container>
          <Row>
            <Col md={3}>
              <div className="van__list-nav">
                <Search />
              </div>
            </Col>
            <Col md={9}>
              <div className="van__list">
                <VanListing />
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
}
const mapStateToProps = createStructuredSelector({
  vanList: makeSelectVans(),
});

const mapDispatchToProps = (dispatch) => ({
  onVanListLoad: bindActionCreators(onVanListLoad, dispatch)
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'vanListingPage', reducer });
const withSaga = injectSaga({ key: 'vanListingPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VanListPage);
