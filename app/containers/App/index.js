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
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </MainWrapper>
  );
}
