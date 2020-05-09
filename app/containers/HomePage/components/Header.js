import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Container } from 'reactstrap';

import Search from '../../../shared/SearchForm';

import bgImage from '../../../assets/images/landing/header_bg.png';
import move from '../../../assets/images/landing/move.svg';

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
                SEARCH<span className="landing__header-dot"></span>
              COMPARE<span className="landing__header-dot"></span>
            BOOK<span className="landing__header-dot"></span>
              </b>
            </h1>
            <p className="landing__header-subhead">MOVING VAN IN <span className="city_highlight">HESLINKI</span></p>
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
