import React from 'react';

const ErrorBox = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 shadow-md rounded-lg px-6 py-4 text-red-700 font-medium ">
      {message}
    </div>
  );
};

export default ErrorBox;
