import React from 'react';
import PropTypes from 'prop-types';

const ScoreBar = ({ currentName, currentScore }) => {
  return (
    <div className="score-bar
      display-4 lgtext text-center
      rounded float-lg-right
      bg-secondary text-light
      mt-lg-3 mx-lg-3 p-2">
      <span><strong>Player:</strong> {currentName} </span> &nbsp;
      <span><strong>Points:</strong> {currentScore} </span> 
    </div>
  );
};

ScoreBar.propTypes = {
  currentName: PropTypes.string.isRequired,
  currentScore: PropTypes.number.isRequired
};

export default ScoreBar;
