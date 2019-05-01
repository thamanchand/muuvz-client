import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SidebarLink from './SidebarLink';

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
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
