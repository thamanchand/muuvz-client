import React from 'react';
import avatar from '../../../assets/images/topbar/ava.png';

const TopbarProfile = () => (
  <div className="topbar__profile">
    <button type="button" className="topbar__avatar">
      <img className="topbar__avatar-img" src={avatar} alt="avatar" />
      <p className="topbar__avatar-name">Roman Johanson</p>
    </button>
  </div>
);

export default TopbarProfile;
