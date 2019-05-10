import React from 'react';
import { Col, Row, Container } from 'reactstrap';

import Search from './Search';

import bgImage from '../../../assets/images/landing/header_bg.png';
import move from '../../../assets/images/landing/move.svg';

const Header = () => (
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
                SEARCH<span className="landing__header-dot">.</span>
                COMPARE<span className="landing__header-dot">.</span>
                BOOK<span className="landing__header-dot">.</span>
              </b>
            </h1>
            <p className="landing__header-subhead">Moving van with ease</p>
          </div>
        </Col>
        <Col md={6}>
          <div className="search-wrapper">
            <div className="card">
              <div className="card-body">
                <Search />
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

export default Header;
