import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import { makeSelectLocale } from '../../containers/LanguageProvider/selectors';

import { changeLocale } from '../../containers/LanguageProvider/actions';

class LanguageSwitcher extends React.PureComponent {
  render() {
    return (
      <div className="lang__select">
        <select
          value={this.props.locale}
          onChange={(evt) => {
            this.props.changeLocale(evt.target.value);
            moment.locale(evt.target.value);
          }}
        >
          <option value="fi">FI</option>
          <option value="en">EN</option>
        </select>
        <div className="lang__select__arrow"></div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: locale => dispatch(changeLocale(locale)),
  };
}

LanguageSwitcher.propTypes = {
  locale: PropTypes.string,
  changeLocale: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageSwitcher);
