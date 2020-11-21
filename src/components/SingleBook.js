import React from 'react';
import { useParams } from 'react-router-dom';

const SingleBook = () => {
  const { id } = useParams();

  return <div>I am single Book. Id: {id}</div>;
};

export default SingleBook;
