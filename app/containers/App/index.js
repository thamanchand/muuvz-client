/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage';
import Booking from 'containers/Booking';
import Resources from 'containers/Resources';
import ProfilePage from 'containers/Profile';
import AccountPage from 'containers/AccountPage';

import ConnectPage from 'containers/ConnectPage';
import SecurePage from 'containers/SecurePage';
import ProtectedRoute from 'containers/ProtectedRoute';
import LoginPage from 'containers/LoginPage';
import RegisterPage from 'containers/RegisterPage';
import VanListing from '../Listing';
import MainWrapper from '../../components/Wrapper';

export default function App() {
  return (
    <MainWrapper>
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/listing" component={VanListing} />
          <Route exact path="/dashboard/booking" component={Booking} />
          <Route exact path="/dashboard/resources" component={Resources} />
          <Route exact path="/dashboard/profile" component={ProfilePage} />
          <Route exact path="/dashboard/account" component={AccountPage} />
          <Route exact path="/connect/:provider" component={ConnectPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <ProtectedRoute exact path="/:foo" component={SecurePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </MainWrapper>
  );
}
