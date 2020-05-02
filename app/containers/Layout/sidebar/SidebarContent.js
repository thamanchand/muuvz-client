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
    const isBusiness = auth.get('userInfo') && auth.get('userInfo').isbusiness;
    const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;

    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          {isBusiness && !isProfileCompleted &&
          <SidebarLink
            id= '1'
            title="Booking"
            icon="calendar-full"
            route="/dashboard/booking"
            onClick={this.hideSidebar}
          />}
          {isBusiness && isProfileCompleted &&
          <SidebarLink
            id= '1'
            title="Booking"
            icon="calendar-full"
            route="/dashboard/booking"
            onClick={this.hideSidebar}
          />}
          {!isBusiness && isProfileCompleted &&
          <SidebarLink
            id= '1'
            title="Booking"
            icon="calendar-full"
            route="/dashboard/booking"
            onClick={this.hideSidebar}
          />}
          {isBusiness && !isProfileCompleted &&
          <SidebarLink
            id= '1'
            title="Booking"
            icon="calendar-full"
            route="/dashboard/booking"
            onClick={this.hideSidebar}
          />}
          {isBusiness && isProfileCompleted &&
          <SidebarLink
            id= '2'
            title="Vans"
            icon="car"
            route="/dashboard/resources"
            onClick={this.hideSidebar}
          />
          }
          <SidebarLink
            id= '3'
            title="Profile"
            icon="user"
            route="/dashboard/profile"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            id= '4'
            title="Account"
            icon="cog"
            route="/dashboard/account"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            id= '5'
            title="Logout"
            icon="exit"
            onClick={() => auth.clearAppStorage()}
          />
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
