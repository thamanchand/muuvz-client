import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import MenuIcon from 'mdi-react/MenuIcon';
import CloseIcon from 'mdi-react/CloseIcon';

import auth from 'utils/auth';

import logo from '../../assets/images/muuvz.svg';
import { useMedia } from '../../containers/utils';

const HeaderNav = ({ source }) => {
  const [isLoggedIn, setisLoggedIn] = React.useState(auth.getToken());
  const [hamburgerMenuHover, setHamburgerMenuHover] = React.useState(false);

  const isBusiness = auth.get('userInfo') && auth.get('userInfo').isbusiness;
  const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;

  // for small devices
  const isSmallDevices = useMedia("(max-width: 768px)");

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

  const onMenuHover= () => {
    setHamburgerMenuHover(true)
  }

  const onMenuLeave = () => {
    setHamburgerMenuHover(false)
  }

  return (
    <div className={source === 'home' ? "landing__menu" : "landing__menu__listing"} >
      <Container>
        <Row>
          <Col md={6} sm={12}>
            <nav className="landing__menu-nav">
              <div className="landing__menu-wrap">
                <Link to="/">
                  <img src={logo} alt="" className="logo" />
                </Link>
              </div>
            </nav>
          </Col>
          <Col  md={6} sm={12}>
            <div className="landing__nav_item">
              {!isSmallDevices ? (
                <ul className="navbar">
                  {isLoggedIn ?
                    (<React.Fragment>
                      <li className="nav-item landing__navbar-item">
                        {isBusiness && isProfileCompleted &&
                          <Link className="nav-link nav__list underline__sliding" to="/dashboard/booking">
                            DASHBOARD
                          </Link>
                        }
                        {isBusiness && !isProfileCompleted &&
                          <Link className="nav-link nav__list underline__sliding" to="/dashboard/profile" >
                            DASHBOARD
                          </Link>
                        }
                        {!isBusiness &&
                          <Link className="nav-link nav__list underline__sliding" to="/dashboard/booking" >
                            DASHBOARD
                          </Link>
                        }
                      </li>

                      <li className="nav-item landing__navbar-item">
                        <span
                          role="presentation"
                          className="login_register" onClick={() => logout()}
                        >
                          LOGOUT
                        </span>
                      </li>
                    </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <li className="nav-item landing__navbar-item">
                          <Link className="nav-link nav__list underline__sliding" to="/auth/login">
                            LOGIN
                          </Link>
                        </li>
                        <li className="nav-item landing__navbar-item">
                          <Link className="login_register" to="/auth/register">
                            REGISTER
                          </Link>
                        </li>
                      </React.Fragment>
                    )
                  }
                  <li className="nav-item landing__navbar-item">
                    <span className="nav-link  nav__list lang__label underline__sliding">EN</span>
                  </li>
                </ul>
              ) : (
                <div className="nav_hamburger__icon">
                  {hamburgerMenuHover
                    ? (
                      <CloseIcon
                        size="25"
                        onClick={onMenuLeave}
                        className="mdi-icon__open"
                      />
                    ) : (
                      <MenuIcon
                        size="25"
                        onClick={onMenuHover}
                        className="mdi-icon__close"
                      />
                    )
                  }
                  <div className="hamburger__menu" style={hamburgerMenuHover ? {diplay: 'inline'} : {display: 'none'} }>
                    <ul className="navbar">
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
                            <button className="login_register" type="button" onClick={() => logout()}>
                              Logout
                            </button>
                          </li>
                        </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <li className="nav-item landing__navbar-item underline__sliding">
                              <Link className="nav-link" to="/auth/login">
                                Login
                              </Link>
                            </li>
                            <li className="nav-item landing__navbar-item">
                              <Link className="login_register" to="/register">
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
              )}
            </div>
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
