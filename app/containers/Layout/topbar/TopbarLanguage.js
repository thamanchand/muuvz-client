import React, { PureComponent } from 'react';
import { Collapse } from 'reactstrap';
import DownIcon from 'mdi-react/ChevronDownIcon';

import Finn from '../../../assets/images/languages/finn.svg';
import En from '../../../assets/images/languages/en.svg';

const FinnLng = () => (
  <span className="topbar__language-btn-title">
    <img src={Finn} alt="fi" />
    <span>FI</span>
  </span>
);

const GbLng = () => (
  <span className="topbar__language-btn-title">
    <img src={En} alt="english" />
    <span>EN</span>
  </span>
);

class TopbarLanguage extends PureComponent {
  constructor() {
    super();
    this.state = {
      collapse: false,
      mainButtonContent: <FinnLng />,
    };
  }

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };

  changeLanguage = lng => {
    console.log('language', lng);
  };

  render() {
    const { mainButtonContent, collapse } = this.state;

    return (
      <div className="topbar__collapse topbar__collapse--language">
        <button className="topbar__btn" type="button" onClick={this.toggle}>
          {mainButtonContent}
          <DownIcon className="topbar__icon" />
        </button>
        <Collapse
          isOpen={collapse}
          className="topbar__collapse-content topbar__collapse-content--language"
        >
          <button
            className="topbar__language-btn"
            type="button"
            onClick={() => this.changeLanguage('en')}
          >
            <GbLng />
          </button>
        </Collapse>
      </div>
    );
  }
}

export default TopbarLanguage;
