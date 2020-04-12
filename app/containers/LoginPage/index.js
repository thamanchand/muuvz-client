import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import LogInForm from './components/LogInForm';
import Footer from '../HomePage/components/Footer';
import logo from '../../assets/images/muverz.svg';

import saga from './saga';
import reducer from './reducer';

import { onLoginSubmit } from './actions';

const key = 'loginPage';

class LoginPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  showPasswordHandler = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  onLoginSubmitHandler = (e) => {
    this.props.onLoginSubmit(e);
  }

  render() {
    return (
      <div className="account account--photo">
        <div className="account__wrapper">
          <div className="account__card">
            <Link to="/">
              <img src={logo} alt="muverz" className="account__register-logo" />
            </Link>
            <div className="account__head">
              <h3 className="account__title">Join now</h3>
              <h4 className="account__subhead subhead">Start your business easily</h4>
            </div>
            <LogInForm
              showPasswordHandler={this.showPasswordHandler}
              onLoginSubmitHandler={this.onLoginSubmitHandler}
              showPassword={this.state.showPassword}
            />
            <div className="account__or">
              <p>Or Easily Using</p>
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
    )
  }
}

LoginPage.propTypes = {
  onLoginSubmit: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onLoginSubmit: bindActionCreators(onLoginSubmit, dispatch)
});

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key: 'authPage', saga });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(LoginPage);
