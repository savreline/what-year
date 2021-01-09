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
      <div className="border shadow text-justify my-4 p-3">
        <p>
          <strong>Question {this.props.questionNo} out of 10. </strong>
          {this.props.question}
        </p>
        <form className="row align-content-center" onSubmit={this.handleSubmit}>
          <div className="col-lg-6 pr-lg-2">
            <input type="text"
              placeholder="Enter the year..."
              className="form-control form-control-lg m-1"
              ref={(c) => { this.yearEntered = c; }} />
          </div>
          <div className="col-lg-6 pl-lg-2">
            <button type="submit" className="btn btn-block btn-lg btn-secondary m-1">
              Submit Answer    
            </button>
          </div>
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
