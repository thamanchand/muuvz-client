import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Col, Container, Row } from 'reactstrap';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import Statistics from '../Booking/components/Statistics';
import Layout from '../Layout/index';
import AccountForm from './components/AccountForm';

import auth from '../../utils/auth';

import { onPasswordChange } from './action';

const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;

class AccountPage extends React.PureComponent {
  componentDidMount() {}

  changePasswordHandler = (passPayload) => {
    const { id } = auth.get('userInfo');
    if (passPayload.password === passPayload.confirmPassword) {
      this.props.onPasswordChange(id, passPayload.password);
    }
  };

  render() {
    return (
      <div>
        <Layout />
        <div className="container__wrap">
          <Container className="dashboard container">
            <Row>
              <Col md={12}>
                <h3 className="page-title">Account</h3>
              </Col>
            </Row>
            {isProfileCompleted && (
              <Row>
                <Statistics />
              </Row>
            )}
            <Row>
              <AccountForm
                changePassword={this.changePasswordHandler}
              />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

AccountPage.propTypes = {
  onPasswordChange: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  onPasswordChange: bindActionCreators(onPasswordChange, dispatch),
});

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key: 'accountPage', reducer });
const withSaga = injectSaga({ key: 'accountPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountPage);
