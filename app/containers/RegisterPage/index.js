import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

// Utils
import injectSaga from 'utils/injectSaga';
// import injectReducer from 'utils/injectReducer';


import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import RegisterForm from './components/RegisterForm';
import Footer from '../HomePage/components/Footer';
import logo from '../../assets/images/muverz.svg';

import { onRegisterSubmit } from './actions';
import saga from './saga';

class RegisterPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  showPasswordHandler = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  onRegisterHandler = (e) => {
    console.log("e", e)
    this.props.onRegisterSubmit(e);
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
            <RegisterForm
              showPasswordHandler={this.showPasswordHandler}
              onRegisterHandler={this.onRegisterHandler}
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

RegisterPage.propTypes = {
  onRegisterSubmit: PropTypes.func,
};

// const mapStateToProps = makeSelectAuthPage();

const mapDispatchToProps = (dispatch) => ({
  onRegisterSubmit: bindActionCreators(onRegisterSubmit, dispatch)
});

const withConnect = connect(null, mapDispatchToProps);

// const withReducer = injectReducer({ key: 'RegisterPage', reducer });
const withSaga = injectSaga({ key: 'RegisterPage', saga });

export default compose(
  // withReducer,
  withSaga,
  withConnect,
)(RegisterPage);
