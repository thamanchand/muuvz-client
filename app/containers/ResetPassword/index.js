import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import PasswordResetForm from './components/PasswordResetForm';
import Footer from '../HomePage/components/Footer';
import logo from '../../assets/images/logo-mini.svg';

import { onPasswordReset } from './actions';
import { isPasswordResetSelector, isPasswordResttingSelector } from './selectors';

import reducer from './reducer';
import saga from './saga';

class PasswordResetPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  showPasswordHandler = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  onPasswordResetHandler = payload => {
    console.log("payload", payload);
    const { location }  = this.props;
    const resetCode = location.search.split('=')[1];

    const resetPayload = { ...payload, code: resetCode };
    this.props.onPasswordReset(resetPayload);
  }

  render() {
    const { isPasswordReset, isPasswordResetting } = this.props;

    return (
      <div className="account account--photo">
        <div className="account__wrapper">
          <div className="account__card">
            <Link to="/">
              <img src={logo} alt="muverz" className="account__register-logo" />
            </Link>

            <div>
              <div className="account__head">
                <h2 className="account__subhead subhead">Reset password </h2>
              </div>
              {isPasswordReset ?
                (
                  <p>Your password is being reset! Please
                    <Link to="/auth/login"> Sign In</Link> to start using MUUVZ
                  </p>
                ) : (
                  <PasswordResetForm
                    showPasswordHandler={this.showPasswordHandler}
                    onPasswordResetHandler={this.onPasswordResetHandler}
                    showPassword={this.state.showPassword}
                    isPasswordResetting={isPasswordResetting}
                  />
                )
              }
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

PasswordResetPage.propTypes = {
  onPasswordReset: PropTypes.func,
  isPasswordResetting: PropTypes.bool,
  isPasswordReset: PropTypes.bool,
  location: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  onPasswordReset: bindActionCreators(onPasswordReset, dispatch),
});

const mapStateToProps = createStructuredSelector({
  isPasswordReset: isPasswordResetSelector(),
  isPasswordResetting: isPasswordResttingSelector()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'resetPage', reducer });
const withSaga = injectSaga({ key: 'resetPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PasswordResetPage);
