import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

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

import {
  onProfileSave,
  onProfileLoad,
  onProfileEdit,
  onUserProfileDelete,
} from './action';

import { userProfileSelector } from './selector';

const key = 'profilePage';

class Profile extends React.PureComponent {

  componentDidMount() {
    const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;
    if (auth.getToken() && isProfileCompleted) {
      this.props.onProfileLoad(auth.get('userInfo').id);
    }
  }

  profileSaveHandler = async profilePayload => {
    const results = await geocodeByAddress(profilePayload.address);
    const latLong = await getLatLng(results[0]);
    this.props.onProfileSave({...profilePayload, latLong });
  }

  profileEditHandler = async (profilePayload, profileId) => {
    const results = await geocodeByAddress(profilePayload.address);
    const latLong = await getLatLng(results[0]);
    this.props.onProfileEdit(profileId, {...profilePayload, latLong });
  }

  onAvatarDelete = (avatarId, profileId) => {
    this.props.onUserProfileDelete(avatarId, profileId);
  }

  render() {
    const { userProfile } = this.props;
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
                initialValues={userProfile}
                onAvatarDelete={this.onAvatarDelete}
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
  onUserProfileDelete: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  userProfile: userProfileSelector(),
});

const mapDispatchToProps = (dispatch) => ({
  onProfileSave: bindActionCreators(onProfileSave, dispatch),
  onProfileLoad: bindActionCreators(onProfileLoad, dispatch),
  onProfileEdit: bindActionCreators(onProfileEdit, dispatch),
  onUserProfileDelete: bindActionCreators(onUserProfileDelete, dispatch)
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
