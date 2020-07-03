import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Container } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import Search from '../../../shared/SearchForm';

import bgImage from '../../../assets/images/landing/header_bg.png';
import move from '../../../assets/images/landing/landing_page.svg';
import messages from '../messages';

const Header = ({ onSearch }) => (
  <div
    className="landing__header"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <Container>
      <Row>
        <Col md={6}>
          <div className="landing__intro">
            <h1 className="landing__header-title">
              <b>
                <FormattedMessage {...messages.headerSearchLabel} /><span className="landing__header-dot"></span>
                <FormattedMessage {...messages.headerCompareLabel} /><span className="landing__header-dot"></span>
                <FormattedMessage {...messages.headerBookLabel} /><span className="landing__header-dot"></span>
              </b>
            </h1>
            <div className="slider-wrapper">
              <FormattedMessage {...messages.headerMovingVan} />
              <div className="city__animate">
                <div className="city1"><FormattedMessage {...messages.cityHelsinki} /></div>
                <div className="city2"><FormattedMessage {...messages.cityEspoo} /></div>
                <div className="city3"><FormattedMessage {...messages.cityVantaa} /></div>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="search-wrapper">
            <div className="card">
              <div className="card-body">
                <Search
                  onSearch={onSearch}
                  disabled
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <img className="landing__header-img" src={move} alt="muuverz move" />
      </Row>
    </Container>
  </div>
);

Header.propTypes = {
  onSearch: PropTypes.func,
}
export default Header;
