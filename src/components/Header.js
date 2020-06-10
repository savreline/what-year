import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ currentScore }) => {
  return (
    <div className="header">
      <h1 className="title">
            What Year Was That?
      </h1>
      <div className="score-bar">
        <ul className="points">
          <li>Points: {currentScore} </li>
          <li>Player: Sasha</li>
        </ul>
      </div>
    </div>        
  );
};

Header.propTypes = {
  currentScore: PropTypes.number
};

export default Header;
