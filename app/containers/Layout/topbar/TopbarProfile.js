import React from 'react';
import PropTypes from 'prop-types';

import avatar from '../../../assets/images/topbar/ava.png';
import auth from '../../../utils/auth';

const TopbarProfile = ({ userAvatar }) => {
  const userImage = userAvatar && userAvatar.avatar &&  userAvatar.avatar.url
    ? `${'http://localhost:1337'}${userAvatar.avatar.url}`
    : avatar
  const userEmail = auth.get('userInfo') && auth.get('userInfo').email;
  return (
    <div className="topbar__profile">
      <button type="button" className="topbar__avatar">
        <img className="topbar__avatar-img" src={userImage}  alt="avatar" />
        <p className="topbar__avatar-name">{userEmail}</p>
      </button>
    </div>
  )
}

TopbarProfile.propTypes = {
  userAvatar: PropTypes.object,
}

export default TopbarProfile;
