import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.nextState(Number(this.yearEntered.value));
    this.yearEntered.value = '';
  };
  componentDidMount(){
    this.yearEntered.focus();
  }

  render() {
    return (
      <div className="body">
        <div className="question">
          <strong>Question {this.props.questionNo} out of 10. </strong>
          {this.props.question}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text"
            placeholder="Enter the year..."
            className="input-field"
            ref={(c) => { this.yearEntered = c; }} />
          <button type="submit" className="btn">
            Submit Answer    
          </button>
        </form>
      </div>
    );
  }
}

Question.propTypes = {
  questionNo: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  nextState: PropTypes.func.isRequired,
};

export default Question;
