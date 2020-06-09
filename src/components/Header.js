import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <h1 className="title">
            What Year Was That?
      </h1>
      <div className="score-bar">
        <ul className="points">
          <li>Points: 0</li>
          <li>Player: Sasha</li>
        </ul>
      </div>
    </div>        
  );
};

export default Header;
