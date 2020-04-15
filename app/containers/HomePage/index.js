/*
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Features from './components/Features';

import Footer from './components/Footer';
import Testimonials from './components/Testimonials';

import HeaderNav from '../../shared/Header';

class HomePage extends React.Component {

  onSearch = (seachParams) => {
    const { history } = this.props;
    history.push('/listing');
    window.localStorage.setItem('searchQuery', JSON.stringify(seachParams));

  }

  render() {
    return (
      <div className="landing">
        <div className="landing__menu">
          <HeaderNav />
        </div>
        <Header
          onSearch={this.onSearch}
        />
        <Features />
        <Testimonials />
        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object,
}

export default HomePage;
