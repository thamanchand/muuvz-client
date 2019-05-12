import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Col, Container, Row } from 'reactstrap';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import ResourceList from './components/ResourceList';
import Statistics from '../Booking/components/Statistics';
import Layout from '../Layout/index';


import { onVanListLoad, onVanInfoSave } from './actions';
import { makeSelectVans } from './selectors';
import saga from './saga';
import reducer from './reducers';

const key = 'resourcePage';


class ResourcesPage extends React.PureComponent {
  componentDidMount() {
    this.props.onVanListLoad();
  }

  vanInfoSaveHandler = (e) => {
    const payload = e;
    this.props.onVanInfoSave(payload);
  }

  render() {
    const { vanList } = this.props;
    return (
      <div>
        <Layout />
        <div className="container__wrap">
          <Container className="dashboard container">
            <Row>
              <Col md={12}>
                <h3 className="page-title">Resources</h3>
              </Col>
            </Row>
            <Row>
              <Statistics />
            </Row>
            <Row>
              <ResourceList
                vanList={vanList}
                onSaveVan={this.vanInfoSaveHandler}
              />
            </Row>
          </Container>
        </div>
      </div>
    );
  }

}


ResourcesPage.propTypes = {
  onVanListLoad: PropTypes.func,
  vanList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
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
  onVanInfoSave: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  vanList: makeSelectVans(),
});

const mapDispatchToProps = (dispatch) => ({
  onVanListLoad: bindActionCreators(onVanListLoad, dispatch),
  onVanInfoSave: bindActionCreators(onVanInfoSave, dispatch),
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
)(ResourcesPage);
