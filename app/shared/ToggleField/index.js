import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ToggleButtonField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]).isRequired,
  };

  static defaultProps = {
    defaultChecked: false,
    disabled: false,
  };

  componentDidMount() {
    const { onChange, defaultChecked } = this.props;
    onChange(defaultChecked);
  }

  render() {
    const {
      name, disabled, value, onChange,
    } = this.props;

    return (
      <div className='ToggleSwitch ToggleSwitch__rounded'>
			   <div className='ToggleSwitch__wrapper'>
          <div
            role="checkbox"
            aria-checked="false"
            className={`Slider ${value && 'isChecked'}`}
            onClick={() => onChange(!value)}
            onKeyPress={() => onChange(!value)}
            value={value}
            name={name}
            disabled={disabled}
          >
          </div>
        </div>
      </div>
    );
  }
}

const renderToggleButtonField = (props) => {
  const { input, defaultChecked, disabled } = props;

  return (
    <ToggleButtonField
      {...input}
      defaultChecked={defaultChecked}
      disabled={disabled}
    />
  );
};

renderToggleButtonField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
};

renderToggleButtonField.defaultProps = {
  defaultChecked: false,
  disabled: false,
};

export default renderToggleButtonField;
