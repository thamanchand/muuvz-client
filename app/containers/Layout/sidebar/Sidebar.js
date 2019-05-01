import React from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SidebarContent from './SidebarContent';

const Sidebar = ({ changeMobileSidebarVisibility, sidebar }) => {
  const sidebarClass = classNames({
    sidebar: true,
    'sidebar--show': sidebar.show,
    'sidebar--collapse': sidebar.collapse,
  });

  return (
    <div className={sidebarClass}>
      <button
        type="button"
        className="sidebar__back"
        onClick={changeMobileSidebarVisibility}
      />
      <Scrollbar className="sidebar__scroll scroll">
        <div className="sidebar__wrapper sidebar__wrapper--desktop">
          <SidebarContent onClick={() => {}} />
        </div>
        <div className="sidebar__wrapper sidebar__wrapper--mobile">
          <SidebarContent onClick={changeMobileSidebarVisibility} />
        </div>
      </Scrollbar>
    </div>
  );
};

Sidebar.propTypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  sidebar: PropTypes.shape({
    show: PropTypes.bool,
    collapse: PropTypes.bool,
  }).isRequired,
};

export default Sidebar;
