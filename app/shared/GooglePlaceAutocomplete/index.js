import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

const GooglePlaceAutocomplete = ({ input, meta }) => {
  const [address, setAddress] = React.useState(input.value);

  const handleSelect = async value => {
    setAddress(value);
    input.onChange(value);
  };

  const onError = (status, clearSuggestions) => {
    clearSuggestions()
    return (
      <span>Error: {status} </span>
    )
  }

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        onError={onError}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{width: '100%'}}>
            <input
              {...getInputProps({ placeholder: address})}
              input
            />
            {meta.touched && meta.error && (
              <span className="form__form-group-error">{meta.error}</span>
            )}

            <div style={{border: '1px solid #dedede', marginTop: '-2px'}}>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#f2f2f2', padding: '5px', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', padding: '5px',cursor: 'pointer' };

                return (
                  <div {...getSuggestionItemProps(suggestion, { className, style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
}

GooglePlaceAutocomplete.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
}
export default GooglePlaceAutocomplete;
