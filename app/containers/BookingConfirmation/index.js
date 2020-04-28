import React, { PureComponent} from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Card, CardBody, Col, Row
} from 'reactstrap';
import CheckboxMarkedCircleIcon from 'mdi-react/CheckboxMarkedCircleIcon';
import EmailIcon from 'mdi-react/EmailIcon';
import CellphoneIcon from 'mdi-react/CellphoneIcon';

import Footer from '../HomePage/components/Footer';
import HeaderNav from '../../shared/Header';

class EmailConfirmationCard extends PureComponent {

  componentDidMount() {
    // this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  // On browser back navigation redirect to home page
  routerWillLeave = () => {
    // this.props.history.push('/');
  };


  render() {
    const { location } = this.props;
    return (
      <>
        <HeaderNav source="listing" />
        <div className="Listing__page">
          <div className="container-md offset-md-3">
            <div className="emailconfirmation__wrapper">
              <Row>
                <Col md={8}>
                  <div className="email__content">
                    <Card>
                      <CardBody>
                        <div className="email-confirmation">
                          <div className="email-confirmation__icon">
                            <CheckboxMarkedCircleIcon className="email-confirmation__check" />
                          </div>
                          <h3 className="email-confirmation__title">Booking ID: {(location.search).split('=')[1]} </h3>
                          <p className="email-confirmation__sub">Your booking has been requested</p>
                          <p className="email-confirmation__sub">Please your check email for booking details</p>
                          <p className="email-confirmation__sub">If you have any questions please contact us at</p>
                          <div className="contact__list">
                            <ul className="list list--icon">
                              <li className="list__item">
                                <span className="contact_icon">
                                  <EmailIcon size="20" color="#ff4861" />
                                </span>
                                <span className="contact_label">
                                  support@muvzz.fi
                                </span>
                              </li>
                              <li className="list__item">
                                <span className="contact_icon">
                                  <CellphoneIcon size="20" color="#ff4861" />
                                </span>
                                <span className="contact_label">
                                  +358442106670
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

EmailConfirmationCard.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  })
}

export default compose(
  withRouter,
)(EmailConfirmationCard);
