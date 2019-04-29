import React from 'react';
import { Col, Row, Container } from 'reactstrap';

import feat01 from '../../../assets/images/landing/features/01_new.png';
import feat02 from '../../../assets/images/landing/features/02_new.png';
import feat05 from '../../../assets/images/landing/features/05_new.png';
import feat07 from '../../../assets/images/landing/features/07_new.png';

const Features = () => (
  <section className="landing__section">
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="landing__section-title">Van owner</h3>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="landing__features-wrap">
            <div className="landing__feature">
              <div className="landing__feature-img-wrap">
                <img src={feat01} alt="" />
              </div>
              <p className="landing__feature-title">Booking and reservation</p>
              <p className="landing__feature-caption">
                Manage vans booking and reservation from easy to use dashboard
              </p>
            </div>
            <div className="landing__feature">
              <div className="landing__feature-img-wrap">
                <img src={feat05} alt="" />
              </div>
              <p className="landing__feature-title">Increase reveneue</p>
              <p className="landing__feature-caption">
                Make extra money for your business
              </p>
            </div>
            <div className="landing__feature">
              <div className="landing__feature-img-wrap">
                <img src={feat02} alt="" />
              </div>
              <p className="landing__feature-title">Grow</p>
              <p className="landing__feature-caption">
                We believe in growing together.
              </p>
            </div>
            <div className="landing__feature">
              <div className="landing__feature-img-wrap">
                <img src={feat07} alt="" />
              </div>
              <p className="landing__feature-title">Analytics</p>
              <p className="landing__feature-caption">
                Through our dashboard you can see how your business is doing
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Features;
