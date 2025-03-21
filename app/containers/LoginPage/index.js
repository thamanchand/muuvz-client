import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import LogInForm from './components/LogInForm';
import Footer from '../HomePage/components/Footer';
import logo from '../../assets/images/logo-mini.svg';

import { loginErrorSelector, loginStateSelector } from './selectors';

import saga from './saga';
import reducer from './reducer';

import { onLoginSubmit, onLoginPageLoad } from './actions';

const key = 'loginPage';

class LoginPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  componentDidMount() {
    this.props.onLoginPageLoad();
  }

  showPasswordHandler = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  onLoginSubmitHandler = loginPayload => {
    const loginSource = this.props.source;
    if (loginPayload.identifier && loginPayload.password) {
      this.props.onLoginSubmit(loginPayload, loginSource);
    }
  };

  render() {
    const { isLoginSuccess, loginError, source } = this.props;

    return (
      <div>
        <div
          className="account account--photo"
          style={
            source === 'listingPage' ? { height: '0px, minHeight: 0px' } : null
          }
        >
          <div className="account__wrapper">
            <div
              className="account__card"
              style={source === 'listingPage' ? { padding: '19px 60px' } : null}
            >
              {/* {loginError
                && loginError.response
                && loginError.response.payload
                && loginError.response.payload.message
                && loginError.response.payload.message[0].messages[0]
                && loginError.response.payload.message[0].messages[0].message && (
                <div className="error">{loginError.response.payload.message[0].messages[0].message}</div>
              )} */}
              {source !== 'listingPage' && (
                <Link to="/">
                  <img
                    src={logo}
                    alt="muuvz"
                    className="account__register-logo"
                  />
                </Link>
              )}
              <div className="account__head">
                <h3 className="account__title">Login</h3>
              </div>
              <LogInForm
                showPasswordHandler={this.showPasswordHandler}
                onLoginSubmitHandler={this.onLoginSubmitHandler}
                showPassword={this.state.showPassword}
                isLoginSuccess={isLoginSuccess}
                loginError={loginError}
              />
              <div className="create__account_label">
                <p>
                  Need a Muverz account?{' '}
                  <Link to="/auth/register">Create an account </Link>
                </p>
              </div>
              <div className="account__or">
                <p>Or Login using</p>
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
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  onLoginSubmit: PropTypes.func,
  isLoginSuccess: PropTypes.bool,
  loginError: PropTypes.object,
  onLoginPageLoad: PropTypes.func,
  source: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  onLoginSubmit: bindActionCreators(onLoginSubmit, dispatch),
  onLoginPageLoad: bindActionCreators(onLoginPageLoad, dispatch),
});

const mapStateToProps = createStructuredSelector({
  loginError: loginErrorSelector(),
  isLoginSuccess: loginStateSelector(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key: 'authPage', saga });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(LoginPage);
