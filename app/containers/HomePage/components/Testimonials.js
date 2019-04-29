/* eslint-disable max-len */
import React from 'react';
import { Col, Row, Container, Card, CardBody } from 'reactstrap';
import StarIcon from 'mdi-react/StarIcon';

const Testimonials = () => (
  <section className="landing__section">
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="landing__section-title">Our customers say</h3>
        </Col>
      </Row>
      <Row className="landing__testimonials">
        <Col lg={4} md={6}>
          <Card>
            <CardBody className="landing__testimonial">
              <p className="landing__testimonial-name">by Toni Hakinnen</p>
              <div className="landing__testimonial-stars">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <p className="landing__testimonial-review">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col lg={4} md={6}>
          <Card>
            <CardBody className="landing__testimonial">
              <p className="landing__testimonial-name">by Sofi Attonen</p>
              <div className="landing__testimonial-stars">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <p className="landing__testimonial-review">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col lg={{ size: 4, offset: 0 }} md={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody className="landing__testimonial">
              <p className="landing__testimonial-name">by Kamal</p>
              <div className="landing__testimonial-stars">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <p className="landing__testimonial-review">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Testimonials;
