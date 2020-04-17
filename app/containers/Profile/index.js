import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Statistics from '../Booking/components/Statistics';
import Layout from '../Layout/index';
import ProfileForm from './components/ProfileForm';

import auth from '../../utils/auth';

class Profile extends React.PureComponent {
  componentDidMount() {}

  render() {
    const isProfileCompleted = auth.get('userInfo').profileCompleted;
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
            {isProfileCompleted && (
              <Row>
                <Statistics />
              </Row>
            )}
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
