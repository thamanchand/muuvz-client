import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, Col, Row
} from 'reactstrap';
import CheckboxMarkedCircleIcon from 'mdi-react/CheckboxMarkedCircleIcon';

import Footer from '../HomePage/components/Footer';
import HeaderNav from '../../shared/Header';

const EmailConfirmationCard = (props) => (
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
                      <h3 className="email-confirmation__title">Booking ID: {(props.location.search).split('=')[1]} </h3>
                      <p className="email-confirmation__sub">You successfully created booking</p>
                      <p className="email-confirmation__sub">Please your check email for booking details</p>
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
);

EmailConfirmationCard.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  })
}
export default EmailConfirmationCard;
