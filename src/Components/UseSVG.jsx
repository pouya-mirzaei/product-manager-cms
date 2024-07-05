import React from 'react';

function UseSVG({ path }) {
  return (
    <svg className="appIcon">
      <use xlinkHref={'#' + path}></use>
    </svg>
  );
}

export default UseSVG;
