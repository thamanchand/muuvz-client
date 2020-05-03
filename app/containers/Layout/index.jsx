import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';

import auth from '../../utils/auth';

import {
  changeMobileSidebarVisibility,
  changeSidebarVisibility,
  changeSideNav,
} from './action';

class Layout extends Component {

  changeSidebarVisibility = () => {
    const { dispatch } = this.props;
    dispatch(changeSidebarVisibility());
  };

  changeMobileSidebarVisibility = (selectedLink) => {
    const { dispatch } = this.props;
    if (selectedLink === 'Logout') {
      dispatch(changeMobileSidebarVisibility('Booking'));
      auth.clearAppStorage();
    } else {
      dispatch(changeMobileSidebarVisibility(selectedLink));
    }
  };

  changeSideNav = (selectedLink) => {
    const { dispatch } = this.props;
    if (selectedLink === 'Logout') {
      dispatch(changeSideNav('Booking'));
      auth.clearAppStorage();
    } else {
      dispatch(changeSideNav(selectedLink));
    }
  }

  render() {
    const { sidebar } = this.props;
    const layoutClass = classNames({
      layout: true,
      'layout--collapse': sidebar.collapse,
    });

    return (
      <React.Fragment>
        <div className={layoutClass}>
          <Topbar
            changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
            changeSidebarVisibility={this.changeSidebarVisibility}
          />
          <Sidebar
            sidebar={sidebar}
            changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
            changeSideNav={this.changeSideNav}
          />
        </div>
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  sidebar: PropTypes.shape({
    show: PropTypes.bool,
    collapse: PropTypes.bool,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect(state => ({
  sidebar: state.sidebar,
}))(Layout));
