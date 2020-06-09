import React from 'react';

const Body = () => {
  return (
    <div className="body">
      <div className="question">
        What year was the first photograph taken in?
      </div>
      <form>
        <input type="text"
          placeholder="Enter the year..."
          className="input-field" />
        <button type="submit" className="btn">
          Submit Answer    
        </button>
      </form>
    </div>
  );
};

export default Body;
