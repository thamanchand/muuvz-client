/**
 *
 * PrivateRoute
 * Higher Order Component that blocks navigation when the user is not logged in
 * and redirect the user to login page
 *
 * Wrap your protected routes to secure your container
 */

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import auth from '../../utils/auth';

const PrivateRoute = ({ component: Component, path, ...rest }) => (
  <Route
    {...rest}
    path={path}
    render={props =>
      auth.getToken() !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: {
              from: props.location,
              authFailed: true,
            },
          }}
        />
      )
    }
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.element,
  location: PropTypes.string,
  path: PropTypes.string,
};

export default PrivateRoute;
