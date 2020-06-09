import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Body extends Component {
  /* Lookup the first question once component did mount */  
  componentDidMount() {
    let questionID = Math.ceil(Math.random() * 10);
    this.props.fetchQuestion(questionID);
  }
  
  render() {
    return (
      <div className="body">
        <div className="question">
          {this.props.lookupQuestion()}
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
  }
}

Body.propTypes = {
  lookupQuestion: PropTypes.func.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
};

export default Body;
