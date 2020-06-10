import React, { Component } from 'react';
import Start from './Start';
import ScoreBar from './ScoreBar';
import Question from './Question';
import TryAgain from './TryAgain';
import Answer from './Answer';
import * as api from '../api';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const INITIAL_TRIES = 3;

const states = {
  START: 0,
  QUESTION: 1,
  TRYAGAIN: 2,
  ANSWER: 3,
  FINISH: 4
};

export const categories = ['All Categories', 'Technology', 'Computer Science', 
  'World History', 'Canadian History', 'US History'];

class App extends Component {
  constructor(props) {
    super(props);
    this.allCategories = false;
    this.currentCategory = 0;
    this.currentName = '';
    this.currentDiff = 0;
    this.numberOfTries = INITIAL_TRIES;
    this.completedQuestions = [];
  }

  state = {
    currentState: states.START,
    currentScore: 0,
  };

  /* Determine the next state after some form been submitted.
  * Set the category if in the starting state.
  * Compute difference and adjust tries if an answer is submitted. */
  nextState = (answer, category) => {
    if (typeof answer === 'number') {
      this.currentDiff = answer - this.currentQuestion.answer;
      this.numberOfTries--;
    }

    switch (this.state.currentState) {
      case states.START: {
        if (Number(category) === 0) {
          this.allCategories = true;
        }
        this.currentName = answer;
        this.currentCategory = category;
        this.fetchQuestion();
        this.setState({
          currentState: states.QUESTION
        });
        break;
      }
      case states.QUESTION: {
        if (this.currentDiff === 0) {
          this.setState({
            currentScore: this.state.currentScore + this.calculateScore(),
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
    let score = 1000 - 100 * (INITIAL_TRIES - this.numberOfTries - 1) 
                     - 10 * Math.abs(this.currentDiff);
    return Math.max(score, 0);
  }

  /* Pick a random category if in the "all categories mode".
  * Pick a question ID not seen before.
  * Fetch the question from the API and put it on the state.
  * Reset differences and the number of tries. */
  fetchQuestion = () => {
    if (this.allCategories === true) {
      this.currentCategory = getRandomArbitrary(1, 5);
    }

    let questionId;
    do { questionId = Math.ceil(Math.random() * 10) 
      + this.currentCategory * 100; }
    while (this.completedQuestions.includes(questionId));

    api.fetchQuestion(questionId)
      .then(questionObj => {
        this.currentQuestion = questionObj;
        this.setState({
          currentState: states.QUESTION,
        });
        this.currentDiff = 0;
        this.numberOfTries = INITIAL_TRIES;
        this.completedQuestions.push(questionObj.id);
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
      case states.START:
        return <Start 
          nextState={this.nextState} />;
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

  /* Should the score bar be rendered? */
  lookupScoreBar = () => {
    if (this.state.currentState !== states.START) {
      return <ScoreBar 
        currentName={this.currentName}
        currentScore={this.state.currentScore} />;
    }
  }

  render() {
    return (
      <div className="App">
        <h1><div className="title"> 
          What Year Was That? 
        </div></h1>
        {this.lookupScoreBar()}
        {this.lookupBody()}
      </div>
    );
  }
}

export default App;
