import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';
import PropTypes from 'prop-types';

const Autocomplete = (props) => {
  console.log({ props });

  const [value, setValue] = useState(props.currentRefinement);

  const onChange = (_, { newValue }) => {
    if (!newValue) {
      props.onSuggestionCleared();
    }

    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    props.refine(value);
  };

  const onSuggestionsClearRequested = () => {
    props.refine();
  };

  const getSuggestionValue = (hit) => {
    return hit.title;
  };

  const renderSuggestion = (hit) => {
    return (
      <Link to={`/posts/${hit.objectID}`}>
        <Highlight attribute='title' hit={hit} tagName='mark' />
    </Link>
    );
  };

  const { hits, onSuggestionSelected } = props;
  const inputProps = {
    placeholder: 'Search for a book...',
    onChange: onChange,
    value,
  };

  return (
    <AutoSuggest
      suggestions={hits}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

Autocomplete.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired,
  onSuggestionCleared: PropTypes.func.isRequired,
};

export default connectAutoComplete(Autocomplete);
