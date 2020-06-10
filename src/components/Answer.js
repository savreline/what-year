import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answer extends Component {
    handleSubmit = (event) => {
      event.preventDefault();
      this.props.nextState();
    };
    
    render() {
      return (
        <div className="answer">
          <ul className="points">
            <li>The correct answer is {this.props.answer}!</li>
            <li>You have lost {this.props.points} points!</li>
          </ul>     
          <form onSubmit={this.handleSubmit}>
            <button type="submit" className="btn">
              OK    
            </button>
          </form>
        </div>
      );
    }
}

Answer.propTypes = {
  answer: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  nextState: PropTypes.func.isRequired,
};

export default Answer;
