import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Col, Container, Row } from 'reactstrap';
import { createStructuredSelector } from 'reselect';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

// import Statistics from '../Booking/components/Statistics';
import Layout from '../Layout';
import AccountForm from './components/AccountForm';
import toast from '../../shared/ToastNotify';

import auth from '../../utils/auth';

import { onPasswordChange } from './action';

import { isPasswordChangedSelector, isPasswordChangeLoadingSelector } from './selector'
// const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;

class AccountPage extends React.PureComponent {

  changePasswordHandler = (passPayload) => {
    const userId = auth.get('userInfo') && auth.get('userInfo').id;
    const userEmail = auth.get('userInfo') && auth.get('userInfo').email;
    const payload = {
      username: userEmail,
      email: userEmail,
      password: passPayload.password
    };

    if (
      passPayload.password === ""
      && passPayload.passwordConfirmation === ""
    ) {
      toast.error("Password is empty");
    } else if (passPayload.password !== passPayload.passwordConfirmation) {
      toast.error("Password didn't matched");
    }
    else if (!userId && !userEmail) {
      toast.error("Failed to fetch user and email");
    } else if( payload && userId && userEmail) {
      this.props.onPasswordChange(userId, payload);
    }
  };

  render() {
    const { isPasswordChangeButtonDisabled, isPasswordChanged } = this.props;
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
            {/* isProfileCompleted && (
              <Row>
                <Statistics />
              </Row>
            ) */}
            <Row>
              <AccountForm
                changePassword={this.changePasswordHandler}
                isPasswordChangeButtonDisabled={isPasswordChangeButtonDisabled}
                isPasswordChanged={isPasswordChanged}
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
  isPasswordChangeButtonDisabled: PropTypes.bool,
  isPasswordChanged: PropTypes.bool,
}

const mapDispatchToProps = (dispatch) => ({
  onPasswordChange: bindActionCreators(onPasswordChange, dispatch),
});


const mapStateToProps = createStructuredSelector({
  isPasswordChanged: isPasswordChangedSelector(),
  isPasswordChangeButtonDisabled: isPasswordChangeLoadingSelector()
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'accountPage', reducer });
const withSaga = injectSaga({ key: 'accountPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountPage);
