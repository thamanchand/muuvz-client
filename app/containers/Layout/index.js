import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';

// Utils
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import saga from './saga';
import reducer from './reducer';

import auth from '../../utils/auth';

import {
  changeMobileSidebarVisibility,
  changeSidebarVisibility,
  changeSideNav,
  onProfileLoad,
} from './action';

import {
  userProfileSelector,
  isSidebarCollapseSelector,
  isMobileSidebarSelector,
  selectedSideNavSelector,
} from './selectors';


const key = 'LayoutPage';

class Layout extends Component {

  componentDidMount() {
    const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;
    if (auth.getToken() && isProfileCompleted) {
      this.props.onProfileLoad(auth.get('userInfo').id);
    }
  }

  changeSidebarVisibility = () => {
    this.props.changeSidebarVisibility();
  };

  changeMobileSidebarVisibility = (selectedLink) => {
    if (selectedLink === 'Logout') {
      this.props.changeMobileSidebarVisibility('Booking');
      auth.clearAppStorage();
    } else {
      this.props.changeMobileSidebarVisibility(selectedLink);
    }
  };

  changeSideNav = (selectedLink) => {
    if (selectedLink === 'Logout') {
      this.props.changeSideNav('Booking');
      auth.clearAppStorage();
    } else {
      this.props.changeSideNav(selectedLink);
    }
  }

  render() {
    const { collapse, show, selected, userProfile } = this.props;
    const sidebar = {
      collapse,
      show,
      selected
    };

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
            userProfile={userProfile}
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
  changeMobileSidebarVisibility: PropTypes.func,
  changeSidebarVisibility: PropTypes.func,
  changeSideNav: PropTypes.func,
  userProfile: PropTypes.object,
  onProfileLoad: PropTypes.func,
  collapse: PropTypes.bool,
  show: PropTypes.bool,
  selected: PropTypes.string,
}


const mapDispatchToProps = (dispatch) => ({
  onProfileLoad: bindActionCreators(onProfileLoad, dispatch),
  changeSidebarVisibility: bindActionCreators(changeSidebarVisibility, dispatch),
  changeMobileSidebarVisibility: bindActionCreators(changeMobileSidebarVisibility, dispatch),
  changeSideNav: bindActionCreators(changeSideNav, dispatch),
});

const mapStateToProps = createStructuredSelector({
  userProfile: userProfileSelector(),
  collapse: isSidebarCollapseSelector(),
  show: isMobileSidebarSelector(),
  selected: selectedSideNavSelector(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Layout);
