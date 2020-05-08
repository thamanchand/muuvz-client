/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage';
import Booking from 'containers/Booking';
import Resources from 'containers/Resources';
import ProfilePage from 'containers/Profile';
import AccountPage from 'containers/AccountPage';

import PrivateRoute from 'containers/PrivateRoute';
import ConnectPage from 'containers/ConnectPage';
// import SecurePage from 'containers/SecurePage';
// import ProtectedRoute from 'containers/ProtectedRoute';
import LoginPage from 'containers/LoginPage';
import RegisterPage from 'containers/RegisterPage';
import PasswordReset from 'containers/ResetPassword';

import ForgotPassword from 'containers/ForgotPassword';

import VanListing from '../Listing';
import BookingConfirmation from '../BookingConfirmation';
import MainWrapper from '../../components/Wrapper';

export default function App() {
  return (
    <MainWrapper>
      <ToastContainer
        autoClose={5000}
        position="top-center"
        className="toast-container"
        toastClassName="dark-toast"
      />
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/listing" component={VanListing} />
          <Route
            exact
            path="/listing/bookingconfirmation"
            render={props => {
              const searchParam = props.location.search;
              if(searchParam.startsWith('?')) {
                return (
                  <BookingConfirmation {...props} />
                )
              }
              return <Redirect to='/' />
            }}
          />
          <PrivateRoute exact path="/dashboard/booking" component={Booking} />
          <PrivateRoute exact path="/dashboard/resources" component={Resources} />
          <PrivateRoute exact path="/dashboard/profile" component={ProfilePage} />
          <PrivateRoute exact path="/dashboard/account" component={AccountPage} />
          <Route exact path="/connect/:provider" component={ConnectPage} />
          <Route exact path="/auth/reset-password" component={PasswordReset} />

          <Route exact path="/auth/forgot-password" component={ForgotPassword} />
          <Route exact path="/auth/login" component={LoginPage} />
          <Route exact path="/auth/register" component={RegisterPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </MainWrapper>
  );
}

App.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  })
}
