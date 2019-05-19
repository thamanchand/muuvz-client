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
import { makeSelectVans, isVanInfoSavedSelector } from './selectors';
import saga from './saga';
import reducer from './reducers';

const key = 'resourcePage';


class ResourcesPage extends React.PureComponent {
  constructor(props){
  	super(props);
  	this.state = {
      openModel: false,
      showPriceModal: false,
    };
  }

  componentDidMount() {
    this.props.onVanListLoad();
  }

  vanInfoSaveHandler = (vanInfo) => {
    const payload = vanInfo;
    this.props.onVanInfoSave(payload);
  }

  showVanModelHandler = () => {
    this.setState((prevState) => ({
      openModel: !prevState.openModel
    }))
  }

  modelToggle = () => {
    this.setState((prevState) => ({
      openModel: !prevState.openModel
    }))
  }

  priceModalHandler = () => {
    this.setState((prevState) => ({
      showPriceModal: !prevState.showPriceModal
    }))
  }

  closePriceModal = () => {
    this.setState((prevState) => ({
      showPriceModal: !prevState.showPriceModal
    }))
  }

  componentWillReceiveProps(nextProps) {
    const { vanInfoSavedCompleted } = this.props;
    if (vanInfoSavedCompleted !== nextProps.vanInfoSavedCompleted) {
      this.setState({
        openModel: false
      })
    }
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
              {this.props.vanInfoSavedCompleted ? 'Saved' : null}
              <ResourceList
                vanList={vanList}
                onSaveVan={this.vanInfoSaveHandler}
                openModel={this.state.openModel}
                showVanModelHandler={this.showVanModelHandler}
                modelToggle={this.modelToggle}
                priceModalHandler={this.priceModalHandler}
                showPriceModal={this.state.showPriceModal}
                closePriceModal={this.closePriceModal}
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
    features: PropTypes.string,
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
  vanInfoSavedCompleted: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
  vanList: makeSelectVans(),
  vanInfoSavedCompleted: isVanInfoSavedSelector(),
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
