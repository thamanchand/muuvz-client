import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

class TimePickerField extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: 'theme-light',
  };

  state = {
    open: false,
    startTime: moment(),
  };

  setOpen = ({ open }) => {
    this.setState({ open });
  };

  toggleOpen = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ open: !prevState.open }));
  };

  onTimeChange = (changedTime) => {
    const { endTimeChanged, startTimeChanged, input } = this.props;

    this.setState({
      startTime: changedTime,
    });

    if (input.name === 'pickupTime') {
      input.onChange(changedTime);
      startTimeChanged(changedTime);
    }
    else if (input.name === 'dropOffTime') {
      input.onChange(changedTime);
      endTimeChanged(changedTime)
    }
  }

  render() {
    const {
      name, theme, source,
    } = this.props;
    const { open } = this.state;

    const { startTime } = this.state;
    const { disabled, input } = this.props;
    const initialDate = input.value ? input.value : startTime;

    return (
      <div className="form__form-group-field">
        {source === 'main' ? (
          <TimePicker
            open={open}
            selected={moment(initialDate)}
            onOpen={this.setOpen}
            onClose={this.setOpen}
            name={name}
            onChange={this.onTimeChange}
            showSecond={false}
            popupClassName={theme === 'theme-dark' ? 'theme-dark' : 'theme-light'}
            disabled={disabled}
          />
        ) : (
          <TimePicker
            open={open}
            selected={moment(initialDate)}
            onOpen={this.setOpen}
            onClose={this.setOpen}
            name={name}
            onChange={this.onTimeChange}
            showSecond={false}
            popupClassName={theme === 'theme-dark' ? 'theme-dark' : 'theme-light'}
            disabled={disabled}
            value={moment(initialDate)}
          />
        )}
      </div>
    );
  }
}

TimePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  theme: PropTypes.string,
  disabled: PropTypes.bool,
  endTimeChanged: PropTypes.func,
  startTimeChanged: PropTypes.func,
  source: PropTypes.string,
};

const renderTimePickerField = (props) => {
  // const { input, timeMode, theme } = props;
  const {
    input,
    timeMode,
    disabled,
    theme,
    meta,
    endTimeChanged,
    startTimeChanged,
    source,
  } = props;

  return (
    <TimePickerField
      timeMode={timeMode}
      theme={theme}
      input={input}
      disabled={disabled}
      meta={meta}
      endTimeChanged={endTimeChanged}
      startTimeChanged={startTimeChanged}
      source={source}
    />
  );
};

renderTimePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  timeMode: PropTypes.bool,
  theme: PropTypes.string,
  disabled: PropTypes.bool,
  endTimeChanged: PropTypes.func,
  startTimeChanged: PropTypes.func,
  meta: PropTypes.object,
  source: PropTypes.string,
};

renderTimePickerField.defaultProps = {
  timeMode: false,
  theme: null,
};

export default renderTimePickerField;
