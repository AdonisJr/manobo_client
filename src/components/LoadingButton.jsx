import React, { useState } from 'react';

const LoadingButton = ({ onClick, isLoading, text }) => {
  return (
    <button
      type='submit'
      onClick={onClick}
      className={`bg-blue-500 text-white py-2 px-4 rounded focus:outline-none ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={isLoading}
    >
      {isLoading ? 'Please wait...' : text}
    </button>
  );
};

export default LoadingButton;
