import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SidebarLink from './SidebarLink';
import auth from '../../../utils/auth';

class SidebarContent extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarLink
            title="Booking"
            icon="calendar-full"
            route="/dashboard/booking"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="Vans"
            icon="car"
            route="/dashboard/resources"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="Profile"
            icon="user"
            route="/dashboard/profile"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="Account"
            icon="cog"
            route="/dashboard/account"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="Logout"
            icon="exit"
            onClick={auth.clearAppStorage()}
          />
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
