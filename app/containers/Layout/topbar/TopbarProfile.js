import React from 'react';
import avatar from '../../../assets/images/topbar/ava.png';

import auth from '../../../utils/auth';

const TopbarProfile = () => {
  const userEmail = auth.get('userInfo') && auth.get('userInfo').email;
  return (
    <div className="topbar__profile">
      <button type="button" className="topbar__avatar">
        <img className="topbar__avatar-img" src={avatar} alt="avatar" />
        <p className="topbar__avatar-name">{userEmail}</p>
      </button>
    </div>
  )
}

export default TopbarProfile;
