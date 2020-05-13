import React from 'react';
import PropTypes from 'prop-types';

// Utils
import auth from '../../utils/auth';


class Dashboard extends React.Component {

  componentDidMount() {
    this.checkAuthRedirect();

  }

  checkAuthRedirect = () => {
    console.log("checkAuthRedirect")
    const isProfileCompleted = auth.get('userInfo') && auth.get('userInfo').profileCompleted;
    if (auth.getToken() && isProfileCompleted) {
      this.props.history.push('/dashboard/booking')
    }
  }

  render() {
    return (
      <div>
        <p>loading....</p>
      </div>
    )
  }
};

Dashboard.propTypes = {
  history: PropTypes.object,
}
export default Dashboard;
