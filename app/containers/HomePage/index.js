/*
 * HomePage
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import logo from '../../assets/images/muverz.svg';

const HomePage = () => (
  <div className="landing">
    <div className="landing__menu">
      <Container>
        <Row>
          <Col md={12}>
            <div className="landing__menu-wrap">
              <p className="landing__menu-logo">
                <img src={logo} alt="" />
              </p>
              <nav className="landing__menu-nav">
                <Link to="/login">
                  <span
                    className="btn btn-primary btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register
                  </span>
                </Link>
              </nav>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default HomePage;
