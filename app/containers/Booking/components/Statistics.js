import React from 'react';

import Rating from './Rating';
import TotalCustomers from './TotalCustomers';
import TotalBookings from './TotalBookings';
import Favourite from './Favourite';

const Statistics = () => (
  <React.Fragment>
    <Rating />
    <TotalBookings />
    <TotalCustomers />
    <Favourite />
  </React.Fragment>
);

export default Statistics;
