import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Col, Container, Row, ButtonToolbar } from 'reactstrap';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import ResourceList from './components/ResourceList';
import Statistics from '../Booking/components/Statistics';
import Layout from '../Layout/index';
import Modal from '../../shared/Modal'
import DeleteResourceModal from './components/DeleteResourceModal';

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
      priceList: [],
      confirmModal: false,
      showPriceWarning: false,
      isDeleteModalShow: false,
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

  deleteResourceHandler = () => {
    this.setState({
      isDeleteModalShow: true,
    });
  };

  deleteModalCloseHandler = () => {
    this.setState({
      isDeleteModalShow: false,
    });
  };

  deleteResourceAction = () => {
    this.setState({ isDeleteModalShow: false });
  };

  render() {
    const { vanList } = this.props;
    const Icon = <span className="lnr lnr-cross-circle modal__title-icon" />;
    return (
      <div>
        <Layout />
        <DeleteResourceModal
          show={this.state.isDeleteModalShow}
          onClose={this.deleteModalCloseHandler}
          deleteResourceAction={this.deleteResourceAction}
        />
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
                priceInfoSaveHandler={this.priceInfoSaveHandler}
                priceList={this.state.priceList}
                showPriceWarning={this.state.showPriceWarning}
                closeNotificationWarning={this.onCloseNotificationWarning}
                deleteResourceHandler={this.deleteResourceHandler}
              />
            </Row>
          </Container>
          <Modal
            openModel={this.state.confirmModal}
            modelToggle={() => this.toggleConfirm()}
            className="modal-dialog--danger"
            color="danger"
          >
            <div className="modal__header">
              <button
                className="lnr lnr-cross modal__close-btn"
                type="button"
                onClick={() => this.setState({confirmModal: false })} />
              {Icon}
              <h4 className="bold-text  modal__title">Do you want to close?</h4>
            </div>
            <div className="modal__body">
              <p>Unsaved data</p>
            </div>
            <Row>
              <div className="addEditModal__footer">
                <ButtonToolbar className="form__button-toolbar">
                  <button
                    className="square btn btn-primary"
                    type="submit"
                    onClick={() => this.setState({confirmModal: false,  openModel: false, priceList: []})}
                  >
                    Confirm
                  </button>
                </ButtonToolbar>
              </div>
            </Row>
          </Modal>
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
