/*
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// Utils
import auth from 'utils/auth';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Header from './components/Header';
import Features from './components/Features';

import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import logo from '../../assets/images/muverz.svg';

import { searchResultSelector } from './selectors';
import { onSearch } from '../Listing/actions';

import saga from './saga';
import reducer from './reducer';

const key = 'searchQuery';

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

  onSearch = (seachParams) => {
    this.props.onSearch(seachParams);
  }

  render() {
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
                              <button className="btn btn-danger btn-sm" type="button" onClick={this.logout}>
                              Logout
                              </button>

                            </li>
                          </React.Fragment>
                          ) : (
                            <React.Fragment>
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
        <Header
          onSearch={this.onSearch}
        />
        <Features />
        <Testimonials />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  resourceList: searchResultSelector(),
});

const mapDispatchToProps = (dispatch) => ({
  onSearch: bindActionCreators(onSearch, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

HomePage.propTypes = {
  onSearch: PropTypes.func,
}

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
