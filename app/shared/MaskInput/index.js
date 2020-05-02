import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

const RenderMaskInput = ({
  input, placeholder, type, mask, className, guide = true, pipe, keepCharPositions = false,
}) => (
  <MaskedInput
    {...input}
    placeholder={placeholder}
    type={type}
    mask={mask}
    className={className}
    guide={guide}
    pipe={pipe}
    keepCharPositions={keepCharPositions}
  />
);

RenderMaskInput.propTypes = {
  input: PropTypes.shape().isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  mask: PropTypes.arrayOf(PropTypes.any).isRequired,
  className: PropTypes.string.isRequired,
  guide: PropTypes.bool.isRequired,
  keepCharPositions: PropTypes.bool.isRequired,
  pipe: PropTypes.func.isRequired,
};

RenderMaskInput.defaultProps = {
  placeholder: '',
  type: 'text',
};

export default RenderMaskInput;
