/*
 * HomePage
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import Header from './components/Header';
import Features from './components/Features';

import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import logo from '../../assets/images/muverz.svg';

const HomePage = () => (
  <div className="landing">
    <div className="landing__menu">
      <Container>
        <Row>
          <Col md={12}>
            <nav className="navbar navbar-expand-md landing__menu-nav">
              <div className="landing__menu-wrap">
                <p className="landing__menu-logo">
                  <img src={logo} alt="" />
                </p>

                <button
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarCollapse"
                  aria-controls="navbarCollapse"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  className="navbar-toggler"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div id="navbarCollapse" className="collapse navbar-collapse">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item landing__navbar-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item landing__navbar-item">
                      <Link className="btn btn-danger btn-sm" to="/register">
                        Register
                      </Link>
                    </li>

                    <li className="nav-item landing__navbar-item">
                      <span className="nav-link">EN</span>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </Col>
        </Row>
      </Container>
    </div>
    <Header />
    <Features />
    <Testimonials />
    <Footer />
  </div>
);

export default HomePage;
