import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import LanguageSwitcher from '../../../shared/LanguageSwitcher';

const Topbar = ({ changeMobileSidebarVisibility, changeSidebarVisibility, userProfile }) => (
  <div className="topbar">
    <div className="topbar__wrapper">
      <div className="topbar__left">
        <TopbarSidebarButton
          changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          changeSidebarVisibility={changeSidebarVisibility}
        />
        <Link className="topbar__logo" to="/" />
      </div>
      <div className="topbar__right">
        <TopbarProfile userAvatar={userProfile}/>
        <span className="dashboard_lang">
          <LanguageSwitcher />
        </span>
      </div>
    </div>
  </div>
);

Topbar.propTypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
  userProfile: PropTypes.object,
};

export default Topbar;
