import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SidebarLink from './SidebarLink';
import auth from '../../../utils/auth';

class SidebarContent extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = (selectedNav, mobileNavHandler) => {
    const { onClick } = this.props;
    onClick(selectedNav || mobileNavHandler);
  };

  render() {
    const { selectedNav } = this.props;
    const isBusiness = auth.get('userInfo') && auth.get('userInfo').isbusiness;
    const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;

    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          {isBusiness && !isProfileCompleted &&
          <SidebarLink
            title="Booking"
            icon="calendar-full"
            route="/dashboard/booking"
            onClick={() => this.hideSidebar('Booking')}
            selected={selectedNav === 'Booking'}
          />}
          {isBusiness && isProfileCompleted &&
          <SidebarLink
            title="Booking"
            icon="calendar-full"
            route="/dashboard/booking"
            onClick={() => this.hideSidebar('Booking')}
            selected={selectedNav === 'Booking'}
          />}
          {!isBusiness && isProfileCompleted &&
          <SidebarLink
            title="Booking"
            icon="calendar-full"
            route="/dashboard/booking"
            onClick={() => this.hideSidebar('Booking')}
            selected={selectedNav === 'Booking'}
          />}
          {isBusiness && !isProfileCompleted &&
          <SidebarLink
            title="Booking"
            icon="calendar-full"
            route="/dashboard/booking"
            onClick={() => this.hideSidebar('Booking')}
            selected={selectedNav === 'Booking'}
          />}
          {isBusiness && isProfileCompleted &&
          <SidebarLink
            title="Vans"
            icon="car"
            route="/dashboard/resources"
            onClick={() => this.hideSidebar('Vans')}
            selected={selectedNav === 'Vans'}
          />
          }
          <SidebarLink
            title="Profile"
            icon="user"
            route="/dashboard/profile"
            onClick={() => this.hideSidebar('Profile')}
            selected={selectedNav === 'Profile'}
          />
          <SidebarLink
            title="Account"
            icon="cog"
            route="/dashboard/account"
            onClick={() => this.hideSidebar('Account')}
            selected={selectedNav === 'Account'}
          />
          <SidebarLink
            title="Logout"
            icon="exit"
            selected={selectedNav === 'Logout'}
            onClick={() => this.hideSidebar('Logout')}
          />
        </ul>
      </div>
    );
  }
}

SidebarContent.propTypes = {
  selectedNav: PropTypes.string
};

export default SidebarContent;
