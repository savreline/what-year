import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ currentScore }) => {
  return (
    <div className="header">
      <h1><div className="title"> 
          What Year Was That? 
      </div></h1>
      <div className="score-bar">
        <div className="points-player">
          <span><strong>Player:</strong> Sasha </span> &nbsp;
          <span><strong>Points:</strong> {currentScore} </span> 
        </div>
      </div>
    </div>        
  );
};

Header.propTypes = {
  currentScore: PropTypes.number
};

export default Header;
