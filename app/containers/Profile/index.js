import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { Col, Container, Row } from 'reactstrap';
import Statistics from '../Booking/components/Statistics';
import Layout from '../Layout/index';
import ProfileForm from './components/ProfileForm';

import auth from '../../utils/auth';

// Utils
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import saga from './saga';
import reducer from './reducer';

import { onProfileSave, onProfileLoad, onProfileEdit } from './action';
import { userProfileSelector } from './selector';

const key = 'profilePage';

class Profile extends React.PureComponent {

  componentDidMount() {
    const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;
    if (isProfileCompleted) {
      this.props.onProfileLoad(auth.get('userInfo').id);
    }
  }

  profileSaveHandler = (profilePayload) => {
    this.props.onProfileSave(profilePayload);
  }

  profileEditHandler = (profilePayload, profileId) => {
    this.props.onProfileEdit(profileId, profilePayload);
  }

  render() {
    const { userProfile } = this.props;
    console.log("Profile component", userProfile);
    const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;
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

              <ProfileForm
                onProfileFormSave={this.profileSaveHandler}
                onProfileFormEdit={this.profileEditHandler}
                initialValues={userProfile || {}}
              />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  onProfileLoad: PropTypes.func,
  onProfileSave: PropTypes.func,
  onProfileEdit: PropTypes.func,
  userProfile: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  userProfile: userProfileSelector(),
});

const mapDispatchToProps = (dispatch) => ({
  onProfileSave: bindActionCreators(onProfileSave, dispatch),
  onProfileLoad: bindActionCreators(onProfileLoad, dispatch),
  onProfileEdit: bindActionCreators(onProfileEdit, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Profile);
