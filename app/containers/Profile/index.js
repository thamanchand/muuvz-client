import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Statistics from '../Booking/components/Statistics';
import Layout from '../Layout/index';
import ProfileForm from './components/ProfileForm';

class Profile extends React.PureComponent {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Layout />
        <div className="container__wrap">
          <Container className="dashboard container">
            <Row>
              <Col md={12}>
                <h3 className="page-title">Profile</h3>
              </Col>
            </Row>
            <Row>
              <Statistics />
            </Row>
            <Row>
              <ProfileForm />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Profile;
