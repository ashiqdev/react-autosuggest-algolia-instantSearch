import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

const Hit = ({ hit }) => {
  return (
    <div className="card">
      <Highlight attribute='title' hit={hit} />
    </div>
  );
};

export default Hit;
