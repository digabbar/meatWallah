import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import classes from "./AddressAutoComplete.module.css";
import scriptLoader from "react-async-script-loader";
const AddressAutoComplete = (props) => {
  const handleChange = (address) => {
    props.handleChange(address);
  };

  const handleSelect = (address) => {
    props.handleSelect(address);
  };
  if (props.isScriptLoadSucceed && props.isScriptLoaded) {
    return (
      <PlacesAutocomplete
        value={props.address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <FloatingLabel
              controlId="floatingAddress"
              label="Address"
              className={classes.address}
            >
              <Form.Control
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />
            </FloatingLabel>
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? classes.suggestionItemActive
                  : classes.suggestionItem;

                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                    key={suggestion.placeId}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  } else {
    <FloatingLabel
      controlId="floatingAddress"
      label="Address"
      className={classes.address}
    >
      <Form.Control
        type="text"
        placeholder="Address"
        onChange={handleChange}
        value={props.address}
      />
    </FloatingLabel>;
  }
};

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=AIzaSyCOLBbmBjm_-9BpFRmGVtOumsXp5rtwkR0&libraries=places`,
])(AddressAutoComplete);
