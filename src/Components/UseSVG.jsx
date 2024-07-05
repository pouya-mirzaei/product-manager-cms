import React from 'react';

function UseSVG({ path }) {
  return (
    <svg className="w-full h-full text-current">
      <use xlinkHref={'#' + path}></use>
    </svg>
  );
}

export default UseSVG;
