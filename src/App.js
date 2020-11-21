import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  Hits,
  connectSearchBox,
} from 'react-instantsearch-dom';

import Autocomplete from './components/Autocomplete';
import Hit from './components/Hit';
import './App.css';

const VirtualSearchBox = connectSearchBox(() => null);

function App() {
  const history = useHistory();
  const searchClient = algoliasearch(
    process.env.REACT_APP_APP_ID,
    process.env.REACT_APP_SEARCH_ONLY_KEY
  );

  const [query, setQuery] = useState('');

  const onSuggestionSelected = (e, { suggestion }) => {
    if (e.key === 'Enter') {
      const path = `/posts/${suggestion.objectID}`;

      history.push(path);
    }
    setQuery(suggestion.title);
  };

  const onSuggestionCleared = () => {
    setQuery('');
  };

  return (
    <div className='container'>
      <h1>React InstantSearch - Results page with autocomplete</h1>
      <InstantSearch
        indexName={process.env.REACT_APP_INDEX_NAME}
        searchClient={searchClient}
      >
        <Configure hitsPerPage={5} />

        <Autocomplete
          onSuggestionSelected={onSuggestionSelected}
          onSuggestionCleared={onSuggestionCleared}
        />
      </InstantSearch>

      <InstantSearch
        indexName={process.env.REACT_APP_INDEX_NAME}
        searchClient={searchClient}
      >
        <VirtualSearchBox defaultRefinement={query} />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
}

export default App;
