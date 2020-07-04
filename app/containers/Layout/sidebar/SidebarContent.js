import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import SidebarLink from './SidebarLink';
import auth from '../../../utils/auth';
import messages from './messages';

class SidebarContent extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = (selectedNav, mobileNavHandler) => {
    const { onClick } = this.props;
    onClick(selectedNav || mobileNavHandler);
  };

  render() {
    const {
      selectedNav,
      intl: {
        formatMessage,
      }
    } = this.props;

    const isBusiness = auth.get('userInfo') && auth.get('userInfo').isbusiness;
    const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;

    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          {isBusiness && !isProfileCompleted &&
          <SidebarLink
            title={`${formatMessage(messages.booking)}`}
            icon="calendar-full"
            route="/dashboard/booking"
            onClick={() => this.hideSidebar('Booking')}
            selected={selectedNav === 'Booking'}
          />}
          {isBusiness && isProfileCompleted &&
          <SidebarLink
            title={`${formatMessage(messages.booking)}`}
            icon="calendar-full"
            route="/dashboard/booking"
            onClick={() => this.hideSidebar('Booking')}
            selected={selectedNav === 'Booking'}
          />}
          {!isBusiness && isProfileCompleted &&
          <SidebarLink
            title={`${formatMessage(messages.booking)}`}
            icon="calendar-full"
            route="/dashboard/booking"
            onClick={() => this.hideSidebar('Booking')}
            selected={selectedNav === 'Booking'}
          />}
          {isBusiness && !isProfileCompleted &&
          <SidebarLink
            title={`${formatMessage(messages.booking)}`}
            icon="calendar-full"
            route="/dashboard/booking"
            onClick={() => this.hideSidebar('Booking')}
            selected={selectedNav === 'Booking'}
          />}
          {isBusiness && isProfileCompleted &&
          <SidebarLink
            title={`${formatMessage(messages.vans)}`}
            icon="car"
            route="/dashboard/resources"
            onClick={() => this.hideSidebar('Vans')}
            selected={selectedNav === 'Vans'}
          />
          }
          <SidebarLink
            title={`${formatMessage(messages.profile)}`}
            icon="user"
            route="/dashboard/profile"
            onClick={() => this.hideSidebar('Profile')}
            selected={selectedNav === 'Profile'}
          />
          <SidebarLink
            title={`${formatMessage(messages.account)}`}
            icon="cog"
            route="/dashboard/account"
            onClick={() => this.hideSidebar('Account')}
            selected={selectedNav === 'Account'}
          />
          <SidebarLink
            title={`${formatMessage(messages.logout)}`}
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
  selectedNav: PropTypes.string,
  intl: PropTypes.shape({
    messages: PropTypes.string,
  })
};

export default injectIntl(SidebarContent);
