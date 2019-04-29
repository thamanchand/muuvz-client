import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import background from '../../../assets/images/landing/bottom_bg.png';

const Footer = () => (
  <footer className="landing__footer">
    <img className="landing__footer-background" src={background} alt="" />
    <Container>
      <Row>
        <Col md={12}>
          <p className="landing__footer-text">&copy; Muverz 2019</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
