import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answer extends Component {
    handleSubmit = (event) => {
      event.preventDefault();
      this.props.nextState();
    };
    handleEnter = (event) => {
      if (event.which === 13) {
        this.handleSubmit(event);
      }
    };
    componentDidMount(){
      document.addEventListener('keydown', this.handleEnter, false);
    }
    componentWillUnmount(){
      document.removeEventListener('keydown', this.handleEnter, false);
    }
    
    isAnswerCorrect = (isCorrect) => {
      if (isCorrect) {
        return 'You got it right on! ';
      } else {
        return 'Out of tries! ';
      }
    }
    
    render() {
      return (
        <div className="border shadow text-justify my-4 p-3">
          <p> {this.isAnswerCorrect(this.props.isCorrect)}
            The correct answer is <strong>{this.props.answer}</strong>. </p>
          <p> You earned {this.props.points} points on this question. </p>   
          <form onSubmit={this.handleSubmit}>
            <button type="submit" className="btn btn-block btn-lg btn-secondary m-1">
              Next Question    
            </button>
          </form>
        </div>
      );
    }
}

Answer.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  answer: PropTypes.number.isRequired,
  answers: PropTypes.array.isRequired,
  points: PropTypes.number.isRequired,
  nextState: PropTypes.func.isRequired,
};

export default Answer;
