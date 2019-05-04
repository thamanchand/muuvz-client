/*
 * HomePage
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

// Utils
import auth from 'utils/auth';

import Header from './components/Header';
import Features from './components/Features';

import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import logo from '../../assets/images/muverz.svg';


class HomePage extends React.Component {
  state = { isLoggedIn: false }

  componentDidMount() {
    if (auth.getToken()) {
      this.setState({ isLoggedIn: true });
    }
  }

  logout = (e) => {
    e.preventDefault();
    auth.clearAppStorage();
    this.setState({ isLoggedIn: false });
  }

  render() {
    console.log("isLoggedIn", this.state.isLoggedIn)
    return (
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
                        {this.state.isLoggedIn ?
                          (<React.Fragment>
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
                          </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <li className="nav-item landing__navbar-item">
                                <Link className="btn btn-danger btn-sm" to="/logout">
                                  Logout
                                </Link>
                              </li>
                            </React.Fragment>
                          )
                        }

                        <li className="nav-item landing__navbar-item">
                          <span className="nav-link lang__label">EN</span>
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
  }
}

export default HomePage;
