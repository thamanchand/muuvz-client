/**
 *
 * Auth
 * Higher Order Component that blocks navigation when the user is not logged in
 * and redirect the user to login page
 *
 * Wrap your protected routes to secure your container
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import auth from 'utils/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} render={props => (
      auth.getToken() !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: 'auth/login',
            state: { from: props.location }
          }}
        />
      )
    )} />
);

ProtectedRoute.propTypes = {
  component: PropTypes.node,
  location: PropTypes.string,
};

export default ProtectedRoute;
