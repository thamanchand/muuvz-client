import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import CheckboxMarkedCircleIcon from 'mdi-react/CheckboxMarkedCircleIcon';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';


import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import RegisterForm from './components/RegisterForm';
import Footer from '../HomePage/components/Footer';
import logo from '../../assets/images/logo-mini.svg';

import { onRegisterSubmit, onRegisterPageLoad } from './actions';
import { emailRegisteredSelector, registerErrorSelector } from './selectors';

import toast from '../../shared/ToastNotify';

import reducer from './reducer';
import saga from './saga';

class RegisterPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  componentDidMount() {
    this.props.onRegisterPageLoad();
  }

  showPasswordHandler = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  onRegisterHandler = (payload) => {
    console.log("payload", payload);
    if(payload.email && payload.password) {
      const registerPayload = { ...payload, username: payload.email}
      this.props.onRegisterSubmit(registerPayload);
    } else {
      toast.error("Provide email and password")
    }
  }

  render() {
    const { isEmailRegistered, registerError } = this.props;

    return (
      <div className="account account--photo">
        <div className="account__wrapper">
          <div className="account__card">
            {registerError
              && registerError.response
              && registerError.response.payload
              && registerError.response.payload.message
              && registerError.response.payload.message[0].messages[0]
              && registerError.response.payload.message[0].messages[0].message && (
              <div className="error">{registerError.response.payload.message[0].messages[0].message}</div>
            )}
            <Link to="/">
              <img src={logo} alt="muverz" className="account__register-logo" />
            </Link>
            {isEmailRegistered ? (
              <div className="confirmation__container">
                <div className="registration_confirmation">
                  <CheckboxMarkedCircleIcon className="email-confirmation__check" />
                </div>
                <p className="email-confirmation__sub">Your have registered in Muuvz</p>
                <p className="email-confirmation__sub">Please confirm your email!</p>
              </div>
            ) : (
              <div>
                <div className="account__head">
                  <h3 className="account__title">Register</h3>
                </div>
                <RegisterForm
                  showPasswordHandler={this.showPasswordHandler}
                  onRegisterHandler={this.onRegisterHandler}
                  showPassword={this.state.showPassword}
                  isEmailRegistered={isEmailRegistered}
                />
                <div className="create__account_label">
                  <p>Already got muuvz account? <Link to="/auth/login">Login </Link></p>
                </div>
                <div className="account__or">
                  <p>Or Sign up</p>
                </div>
                <div className="account__social">
                  <a
                    href="http://localhost:1337/connect/facebook"
                    className="account__social-btn account__social-btn--facebook"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href="http://localhost:1337/connect/google"
                    className="account__social-btn account__social-btn--google"
                  >
                    <GooglePlusIcon />
                  </a>
                </div>
                <div className="create__account_label">
                  <p>By signing up, I agree to the Terms of Service</p>
                </div>
              </div>
            )}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

RegisterPage.propTypes = {
  onRegisterSubmit: PropTypes.func,
  isEmailRegistered: PropTypes.bool,
  registerError: PropTypes.object,
  onRegisterPageLoad: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onRegisterSubmit: bindActionCreators(onRegisterSubmit, dispatch),
  onRegisterPageLoad: bindActionCreators(onRegisterPageLoad, dispatch)
});

const mapStateToProps = createStructuredSelector({
  isEmailRegistered: emailRegisteredSelector(),
  registerError: registerErrorSelector(),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'registerPage', reducer });
const withSaga = injectSaga({ key: 'registerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegisterPage);
