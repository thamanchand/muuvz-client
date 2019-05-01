import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import burgerIcon from '../../../assets/images/topbar/burger.svg';

class TopbarSidebarButton extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
  };

  render() {
    const {
      changeMobileSidebarVisibility,
      changeSidebarVisibility,
    } = this.props;

    return (
      <div>
        <button
          type="button"
          className="topbar__button topbar__button--desktop"
          onClick={changeSidebarVisibility}
        >
          <img src={burgerIcon} alt="" className="topbar__button-icon" />
        </button>
        <button
          type="button"
          className="topbar__button topbar__button--mobile"
          onClick={changeMobileSidebarVisibility}
        >
          <img src={burgerIcon} alt="" className="topbar__button-icon" />
        </button>
      </div>
    );
  }
}

export default TopbarSidebarButton;
