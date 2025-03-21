import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const SidebarLink = ({ title, icon, newLink, route, onClick, selected }) => (

  <NavLink to={route} onClick={onClick} className={selected ? "sidebar__link-active" : null }>
    <li className="sidebar__link">
      {icon ? <span className={`sidebar__link-icon lnr lnr-${icon}`} /> : ''}
      <p className="sidebar__link-title">
        {title}
        {newLink ? (
          <Badge className="sidebar__link-badge">
            <span>New</span>
          </Badge>
        ) : (
          ''
        )}
      </p>
    </li>
  </NavLink>
);

SidebarLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  newLink: PropTypes.bool,
  route: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.string,
};

SidebarLink.defaultProps = {
  icon: '',
  newLink: false,
  route: '/',
  onClick: () => {},
};

export default SidebarLink;
