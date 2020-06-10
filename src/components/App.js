import React, { Component } from 'react';
import Header from './Header';
import Question from './Question';
import TryAgain from './TryAgain';
import Answer from './Answer';
import * as api from '../api';

// function getRandomArbitrary(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }

const INITIAL_TRIES = 3;

const states = {
  START: 0,
  QUESTION: 1,
  TRYAGAIN: 2,
  ANSWER: 3,
  FINISH: 4
};

class App extends Component {
  constructor(props) {
    super(props);
    this.currentDiff = 0;
    this.numberOfTries = INITIAL_TRIES;
    this.currentQuestion = this.fetchQuestion();
  }

  state = {
    currentState: states.QUESTION,
    currentScore: 0,
  };

  /* Determine the next state after some form been submitted. */
  nextState = (answer) => {
    if (answer) {
      this.currentDiff = answer - this.currentQuestion.answer;
      this.numberOfTries--;
    }

    switch (this.state.currentState) {
      case states.QUESTION: {
        if (this.currentDiff === 0) {
          this.setState({
            currentState: states.ANSWER
          });
        } else {
          this.setState({
            currentState: states.TRYAGAIN
          });
        }
        break;
      }
      case states.TRYAGAIN: {
        if (this.numberOfTries === 0) {
          this.setState({
            currentScore: this.state.currentScore + this.calculateScore(),
            currentState: states.ANSWER
          });
        } else {
          this.setState({
            currentState: states.QUESTION
          });
        }
        break;
      }
      case states.ANSWER: {
        this.fetchQuestion();
      }
    }
  };

  calculateScore = () => {
    let score = 1000 - 100 * (INITIAL_TRIES - this.numberOfTries) 
                     - 10 * Math.abs(this.currentDiff);
    return Math.max(score, 0);
  }

  /* Fetch the question from the API and put it on the state.
  * Reset differences and the number of tries. */
  fetchQuestion = () => {
    let questionID = Math.ceil(Math.random() * 10);
    api.fetchQuestion(questionID).then(questionObj => {
      this.currentQuestion = questionObj;
      this.setState({
        currentState: states.QUESTION,
      });
      this.currentDiff = 0;
      this.numberOfTries = INITIAL_TRIES;
    });
  };

  /* If a questions been fetched, return its text */
  lookupQuestionText = () => {
    if (this.currentQuestion)
      return this.currentQuestion.question;
    else
      return '...';
  };

  /* Render the correct app body given the current state */
  lookupBody = () => {
    switch (this.state.currentState) {
      case states.QUESTION:
        return <Question 
          question={this.lookupQuestionText()}
          nextState={this.nextState} />;
      case states.TRYAGAIN:         
        return <TryAgain
          currentDiff={this.currentDiff}
          numberOfTries={this.numberOfTries}
          nextState={this.nextState} />;
      case states.ANSWER:
        return <Answer
          answer={this.currentQuestion.answer}
          points={this.calculateScore()}
          nextState={this.nextState} />;
    }
  };

  render() {
    return (
      <div className="App">
        <Header 
          currentScore={this.state.currentScore} />
        {this.lookupBody()}
      </div>
    );
  }
}

export default App;
