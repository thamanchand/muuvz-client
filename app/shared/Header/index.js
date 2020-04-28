import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import auth from 'utils/auth';

import logo from '../../assets/images/muuvz.svg';

const HeaderNav = ({ source }) => {
  const [isLoggedIn, setisLoggedIn] = React.useState(auth.getToken());
  const isBusiness = auth.get('userInfo') && auth.get('userInfo').isbusiness;
  const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;


  React.useEffect( () => {
    if( auth.getToken()){
      setisLoggedIn( true );
    } else {
      setisLoggedIn(false)
    }
  }, [ auth.getToken() ]);

  const logout = () => {
    auth.clearAppStorage();
    setisLoggedIn(false);
  }
  return (
    <div className={source === 'home' ? "landing__menu" : "landing__menu__listing"} >
      <Container>
        <Row>
          <Col md={12}>
            <nav className="navbar navbar-expand-md landing__menu-nav">
              <div className="landing__menu-wrap">
                <p className="landing__menu-logo">
                  <Link to="/">
                    <img src={logo} alt="" className="logo" />
                  </Link>
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
                    {isLoggedIn ?
                      (<React.Fragment>
                        <li className="nav-item landing__navbar-item">
                          {isBusiness && isProfileCompleted &&
                            <Link className="nav-link" to="/dashboard/booking">
                            Dashboard
                            </Link>
                          }
                          {isBusiness && !isProfileCompleted &&
                            <Link className="nav-link" to="/dashboard/profile" >
                            Dashboard
                            </Link>
                          }
                          {!isBusiness &&
                            <Link className="nav-link" to="/dashboard/booking" >
                            Dashboard
                            </Link>
                          }
                        </li>
                        <li className="nav-item landing__navbar-item">
                          <button className="btn rounded btn-outline-primary btn-sm" type="button" onClick={() => logout()}>
                          Logout
                          </button>

                        </li>
                      </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <li className="nav-item landing__navbar-item">
                            <Link className="nav-link" to="/auth/login">
                              Login
                            </Link>
                          </li>
                          <li className="nav-item landing__navbar-item">
                            <Link className="btn btn-success btn-sm rounded" to="/register">
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
  )
};

HeaderNav.propTypes = {
  source: PropTypes.string,
}

export default HeaderNav;
