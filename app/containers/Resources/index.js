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
// import Statistics from '../Booking/components/Statistics';
import Layout from '../Layout';
import DeleteResourceModal from './components/DeleteResourceModal';
import UnsaveDataModal from './components/UnsavedDataModal';

import { onVanListLoad, onVanInfoSave, onResourceDelete } from './actions';
import { makeSelectVans, isVanInfoSavedSelector } from './selectors';
import saga from './saga';
import reducer from './reducers';

import auth from '../../utils/auth';
import { filterResourcesBelongsToUser } from '../utils';

const key = 'resourcePage';


class ResourcesPage extends React.PureComponent {
  constructor(props){
  	super(props);
  	this.state = {
      openModel: false,
      showPriceModal: false,
      priceList: [],
      confirmModal: false,
      showPriceWarning: false,
      isDeleteModalShow: false,
      deleteResourceId: null,
    };
  }

  componentDidMount() {
    this.props.onVanListLoad();
  }

  vanInfoSaveHandler = (vanInfo) => {
    if (!this.state.priceList.length > 0 ) {
      this.setState({
        showPriceWarning: true,
      })

    } else {
      const { priceList } = this.state;
      // Dispatch action
      this.props.onVanInfoSave(vanInfo, priceList);
      this.setState({ priceList: [], showPriceWarning: false });
    }
  }

  showVanModelHandler = () => {
    this.setState((prevState) => ({
      openModel: !prevState.openModel
    }))
  }

  modelToggle = () => {
    if (this.state.priceList && this.state.priceList.length > 0 ) {
      this.setState({confirmModal: true})
    } else {
      this.setState((prevState) => ({
        openModel: !prevState.openModel
      }))
    }
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
  };

  priceInfoSaveHandler = (e) => {
    // create a new item
    const newItem = {
      id: 1 + Math.random(),
      unit: e.unit,
      price: e.price,
    };

    this.setState((prevState) => ({
      priceList: [...prevState.priceList, newItem],
      showPriceModal: !prevState.showPriceModal
    }))
  };

  toggleConfirm = () => {
    this.setState({
      confirmModal: false
    })
  }

  onCloseNotificationWarning = () => {
    this.setState({showPriceWarning: false});
  }

  componentWillReceiveProps(nextProps) {
    const { vanInfoSavedCompleted } = this.props;
    if (vanInfoSavedCompleted !== nextProps.vanInfoSavedCompleted) {
      this.setState({
        openModel: false
      })
    }
  }

  deleteResourceHandler = (resourceId) => {
    this.setState({
      isDeleteModalShow: true,
      deleteResourceId: resourceId,
    });
  };

  deleteModalCloseHandler = () => {
    this.setState({
      isDeleteModalShow: false,
      deleteResourceId: null,
    });
  };

  deleteResourceAction = () => {
    this.setState({ isDeleteModalShow: false });
    this.props.onResourceDelete(this.state.deleteResourceId);
  };

  confirmClose = () => {
    this.setState({
      confirmModal: false,  openModel: false, priceList: []
    })
  }

  render() {
    // const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;

    const { vanList } = this.props;
    const resourceList = filterResourcesBelongsToUser(vanList, auth.get('userInfo').id)

    return (
      <div>
        <Layout />
        <DeleteResourceModal
          show={this.state.isDeleteModalShow}
          onClose={this.deleteModalCloseHandler}
          deleteResourceAction={this.deleteResourceAction}
        />
        <UnsaveDataModal
          show={this.state.confirmModal}
          onClose={this.toggleConfirm}
          confirmClose={this.confirmClose}
        />

        <div className="container__wrap">
          <Container className="dashboard container">
            <Row>
              <Col md={12}>
                <h3 className="page-title">Resources</h3>
              </Col>
            </Row>
            {/* isProfileCompleted && (
              <Row>
                <Statistics />
              </Row>
            ) */}
            <Row>
              <ResourceList
                vanList={resourceList}
                onSaveVan={this.vanInfoSaveHandler}
                openModel={this.state.openModel}
                showVanModelHandler={this.showVanModelHandler}
                modelToggle={this.modelToggle}
                priceModalHandler={this.priceModalHandler}
                showPriceModal={this.state.showPriceModal}
                closePriceModal={this.closePriceModal}
                priceInfoSaveHandler={this.priceInfoSaveHandler}
                priceList={this.state.priceList}
                showPriceWarning={this.state.showPriceWarning}
                closeNotificationWarning={this.onCloseNotificationWarning}
                deleteResourceHandler={this.deleteResourceHandler}
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
  onResourceDelete: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  vanList: makeSelectVans(),
  vanInfoSavedCompleted: isVanInfoSavedSelector(),
});

const mapDispatchToProps = (dispatch) => ({
  onVanListLoad: bindActionCreators(onVanListLoad, dispatch),
  onVanInfoSave: bindActionCreators(onVanInfoSave, dispatch),
  onResourceDelete: bindActionCreators(onResourceDelete, dispatch),
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
