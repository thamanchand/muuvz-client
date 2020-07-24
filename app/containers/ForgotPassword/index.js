import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import ForgotPasswordForm from './components/ForgotPaswordForm';
import Footer from '../HomePage/components/Footer';
import logo from '../../assets/images/logo-mini.svg';

import { onPasswordForgot, clearForgotPasswordState } from './actions';
import { isPasswordSendSelector, isLoadingSelector } from './selectors';

import reducer from './reducer';
import saga from './saga';

class ForgotPasswordPage extends React.PureComponent {
  componentDidMount() {
    this.props.clearForgotPasswordState()
  }

  onForgotPasswordHandler = (payload) => {
    const forgotPasswordPayload = {
      url:'http://localhost:3000/auth/reset-password',
      email: payload.email
    }
    this.props.onPasswordForgot(forgotPasswordPayload);
  }

  render() {
    const { isPasswordSendToEmail, isLoading } = this.props;

    return (
      <div className="account account--photo">
        <div className="account__wrapper">
          <div className="account__card">
            <Link to="/">
              <img src={logo} alt="muverz" className="account__register-logo" />
            </Link>

            <div>
              <div className="account__head">
                <h3>Reset your password</h3>
                <h4 className="account__subhead subhead">
                  Lost your password? Pleast enter your email address below and submit.
                  You will receive a link to create a new password via email.
                </h4>
              </div>
              {isPasswordSendToEmail ? (
                <p>Please check your email inbox for a link to complete a password reset </p>
              ) : (
                <ForgotPasswordForm
                  onForgotPasswordHandler={this.onForgotPasswordHandler}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

ForgotPasswordPage.propTypes = {
  onPasswordForgot: PropTypes.func,
  isPasswordSendToEmail: PropTypes.func,
  isLoading: PropTypes.func,
  clearForgotPasswordState: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onPasswordForgot: bindActionCreators(onPasswordForgot, dispatch),
  clearForgotPasswordState: bindActionCreators(clearForgotPasswordState, dispatch),
});

const mapStateToProps = createStructuredSelector({
  isPasswordSendToEmail: isPasswordSendSelector(),
  isLoading: isLoadingSelector(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'passwordForgotPage', reducer });
const withSaga = injectSaga({ key: 'passwordForgotPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForgotPasswordPage);
