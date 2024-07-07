import React from 'react';
import ErrorBox from '../Components/ErrorBox';

export default function Products() {
  return (
    <div>
      Products
      <ErrorBox message={'There is no product in the app right now'} />
    </div>
  );
}
