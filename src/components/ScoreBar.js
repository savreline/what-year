import React from 'react';
import PropTypes from 'prop-types';

const ScoreBar = ({ currentName, currentScore }) => {
  return (
    <div className="score-bar">
      <div className="points-player">
        <span><strong>Player:</strong> {currentName} </span> &nbsp;
        <span><strong>Points:</strong> {currentScore} </span> 
      </div>
    </div>
  );
};

ScoreBar.propTypes = {
  currentName: PropTypes.string.isRequired,
  currentScore: PropTypes.number.isRequired
};

export default ScoreBar;
