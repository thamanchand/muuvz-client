import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: '#f2f2f2',
    borderRadius: '0',
    height: 32,
    minHeight: 32,
    marginTop: 0,
    // Overwrittes the different states of border
    borderColor: state.isFocused ? '#F2F2F2' : '#F2F2F2',
    // Removes weird border around container
    boxShadow: `0 0 0 1px 'orange'`,
    '&:hover': {
      background: state.isFocused ? '#F2F2F2' : '#F2F2F2',
      // Overwrittes the different states of border
      borderColor: state.isFocused ? '#F2F2F2' : '#F2F2F2',
    },
  }),
  menu: base => ({
    ...base,
    // kill the gap
    marginTop: 0,
    border: '1px solid #F2F2F2',
    borderRadius: '0'
  }),
  singleValue: (provided, state) => {
    const marginLeft = '8px';
    const bottom = '-8px';
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const color = '#646777';

    return {
      ...provided, opacity, transition, marginLeft, bottom, color
    };
  },
  placeholder: (provided) => {
    const marginLeft = '15px';
    const color = '#646777';
    const bottom = '-8px';
    return { ...provided, marginLeft, bottom, color };
  },

  option: (styles, state) => ({
    ...styles,
    color: state.isSelected ? "#FFF" : styles.color,
    backgroundColor: state.isSelected ? "#646777" : styles.color,
    borderBottom: "1px solid rgba(0, 0, 0, 0.125)",
    "&:hover": {
      color: "#646777",
      backgroundColor: "#f2f4f7"
    }
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: '#646777',
    marginTop: '-10px',
    transition: 'all .2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
  }),
};

const theme = selectTheme => ({
  ...selectTheme,
  colors: {
    ...selectTheme.colors,
    primary25: '#f2f2f2',
    primary: '#8cc63f',
  },
});

class SelectField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ]).isRequired,
  };

  static defaultProps = {
    placeholder: '',
    options: [],
  };

  handleChange = selectedOption => {
    const { onChange } = this.props;
    onChange(selectedOption);
  };

  render() {
    const { value, name, placeholder, options } = this.props;


    return (
      <Select
        styles={customStyles}
        theme={theme}
        name={name}
        value={value}
        onChange={this.handleChange}
        options={options}
        clearable={false}
        className="react-select"
        placeholder={placeholder}
        classNamePrefix="react-select"
      />
    );
  }
}

const renderSelectField = props => {
  const { input, meta, options, placeholder } = props;
  return (
    <div className="form__form-group-input-wrap">
      <SelectField {...input} options={options} placeholder={placeholder} />
      {meta.touched && meta.error && (
        <span className="form__form-group-error">{meta.error}</span>
      )}
    </div>
  );
};

renderSelectField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  placeholder: PropTypes.string,
};

renderSelectField.defaultProps = {
  meta: null,
  options: [],
  placeholder: '',
};

export default renderSelectField;
