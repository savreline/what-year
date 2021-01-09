import React, { Component } from 'react';
import Start from './Start';
import ScoreBar from './ScoreBar';
import Question from './Question';
import TryAgain from './TryAgain';
import Answer from './Answer';
import Finish from './Finish';
import * as api from '../api';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const INITIAL_TRIES = 2;
const QUESTIONS_PER_SESSION = 10;
const NUM_OF_CATEGORIES = 5;

const states = {
  START: 0,
  QUESTION: 1,
  TRYAGAIN: 2,
  ANSWER: 3,
  FINISH: 4,
  QUIT: 5
};

export const playerStatus = {
  COMPLETED_NONE: 0,
  COMPLETED_CAT: 1,
  COMPLETED_ALL: 2
};

export const categories = ['All Categories', 'Technology', 'Computer Science', 
  'World History', 'Canadian History', 'Russian History'];

class App extends Component {
  constructor(props) {
    super(props);
    this.allCategories = false;
    this.currentCategory = 0;
    this.currentName = '';
    this.currentDiff = 0;
    this.isCorrect = false;
    this.numberOfTries = INITIAL_TRIES;
    this.questionsLeft = QUESTIONS_PER_SESSION;
    this.playerStatus = playerStatus.COMPLETED_NONE;
    this.answers = [];
    this.completedQuestions = [];
    this.completedCategories 
      = new Array(NUM_OF_CATEGORIES + 1).fill(false);
    // this.fetchScores();
  }

  state = {
    currentState: states.START,
    currentScore: 0,
    scores: []
  };

  /*** I. STATES SWITCH: 
   * Determine the next state after 
   * some form been submitted. Set the category if in the starting state.
   * Compute difference and adjust tries if an answer is submitted. ***/
  nextState = (answer, category) => {
    if (typeof answer === 'number') {
      this.currentDiff = answer - this.currentQuestion.answer;
      this.numberOfTries--;
      this.addAnswer(this.currentQuestion.id, answer);
    }

    switch (this.state.currentState) {

      /* START: Set category, set name.
      * Fetch question and go to QUESTION STATE. */
      case states.START: {
        if (answer === '') {
          window.alert('Please enter a name.');
          return;
        }
        this.fetchPlayer(answer).then(res => {
          if (res !== '') {
            this.completedQuestions = res.completedQuestions;
            this.completedCategories = res.completedCategories;
          } else {
            this.completedQuestions = [];
            this.completedCategories 
              = new Array(NUM_OF_CATEGORIES + 1).fill(false);
          }
          if (Number(category) === 0) {
            this.allCategories = true;
          }
          if (this.completedCategories[Number(category)]) {
            window.alert('You already answered all questions' +
               'in this category. Pick another one');
            return;
          }
          this.currentName = answer;
          this.currentCategory = category;
          this.fetchQuestion();
          this.setState({
            currentState: states.QUESTION
          });    
        });
        break;
      }

      /* QUESTION:
      * If the answer is correct, compute score and go to answer. 
      * If out of tries, go to answer. 
      * Else go to try again. */
      case states.QUESTION: {
        if (this.currentDiff === 0) {
          this.isCorrect = true;
        }
        
        if (this.currentDiff === 0 ||
           this.numberOfTries === 0) {
          api.fetchQuestion(this.currentQuestion.id)
            .then(questionObj => {
              this.answers = questionObj.answers;
              this.setState({
                currentScore: this.state.currentScore + this.calculateScore(),
                currentState: states.ANSWER
              });
            });
        } else {
          this.setState({
            currentState: states.TRYAGAIN
          });
        }
        break;
      }

      /* TRY AGAIN: Go back to question. */
      case states.TRYAGAIN: {
        this.setState({
          currentState: states.QUESTION
        });
        break;
      }

      /* ANSWER: If no more questions left, go to score board.
      * Else, get the next question. */
      case states.ANSWER: {
        this.questionsLeft--;
        if (this.questionsLeft === 0) {
          this.addPlayer();
        } else {
          this.fetchQuestion();
        }
        break;
      }

      /* FINISH: Reset and go to question.
      * Or quit if category is -1. */
      case states.FINISH: {
        if (Number(category) === -1) {
          this.setState({
            currentState: states.QUIT
          });
          return;
        }
        if (Number(category) === 0) {
          this.allCategories = true;
        } else {
          this.allCategories = false;
        }
        if (this.completedCategories[Number(category)]) {
          window.alert('You already answered all questions' +
           'in this category. Pick another one');
          return;
        }
        this.questionsLeft = QUESTIONS_PER_SESSION;
        this.currentCategory = category;
        this.fetchQuestion();
        this.setState({
          currentScore: 0
        });
      }
    }
  };

  calculateScore = () => {
    let score = 1000 - 100 * (INITIAL_TRIES - this.numberOfTries - 1) 
                     - 10 * Math.abs(this.currentDiff);
    return Math.max(score, 0);
  }

  /* Checks if there are any categories for which all questions
  * been answered for this particular user. If yes, sets the 
  * respective entry in the categories array to true. */
  checkCategories = () => {
    for (let i = 1; i < NUM_OF_CATEGORIES + 1; i++) {
      let arr = Array.from(Array(QUESTIONS_PER_SESSION).keys())
        .map(x => ++x + i * 100);
      if (arr.every(x => this.completedQuestions.includes(x))) {
        this.completedCategories[i] = true;
      }
    }
    if (this.completedCategories
      .slice(1, NUM_OF_CATEGORIES + 1)
      .every(x => x === true)) {
      this.completedCategories[0] = true;
    }
  }

  /*** II. FETCHES:
   * Pick a random category if in the "all categories mode".
   * Check that category still has some questions.
   * Pick a question ID not seen before.
   * Fetch the question from the API and put it on the state.
   * Reset differences and the number of tries. ***/
  fetchQuestion = () => {
    this.checkCategories();
    if (this.completedCategories[0] === true) {
      this.playerStatus = playerStatus.COMPLETED_ALL;
      this.addPlayer();
      return;
    } else if (this.allCategories !== true &&
      this.completedCategories[this.currentCategory] === true) {
      this.playerStatus = playerStatus.COMPLETED_CAT;
      this.addPlayer();
      return;
    }

    let questionId;
    do { 
      if (this.allCategories === true) {
        this.currentCategory = getRandomArbitrary(1, 5);
      }
      questionId = Math.ceil(Math.random() * 10) 
        + this.currentCategory * 100;
    } while (this.completedQuestions.includes(questionId));

    api.fetchQuestion(questionId)
      .then(questionObj => {
        this.currentQuestion = questionObj;
        this.setState({
          currentState: states.QUESTION,
        });
        this.currentDiff = 0;
        this.isCorrect = false;
        this.numberOfTries = INITIAL_TRIES;
        this.completedQuestions.push(questionObj.id);
      });
  };

  addAnswer = (questionId, answer) => {
    return api.addAnswer(questionId, {answer});
  }

  addPlayer = () => {
    this.checkCategories();
    let player = {
      playerName: this.currentName,
      score: this.state.currentScore,
      completedQuestions: this.completedQuestions,
      completedCategories: this.completedCategories
    };
    api.addPlayer(player).then(() => {
      this.fetchScores();
    });
  }

  fetchPlayer = (playerName) => {
    return api.fetchPlayer(playerName);
  }

  fetchScores = () => {
    api.fetchScores().then(res => {
      this.setState({
        currentState: states.FINISH,
        scores: res
      });
    });
  }

  /* If a questions been fetched, return its text */
  lookupQuestionText = () => {
    if (this.currentQuestion)
      return this.currentQuestion.question;
    else
      return '...';
  };

  lookupQuestionNo = () => {
    return 10 - this.questionsLeft + 1;
  }

  /*** III. RENDERING 
   * Render the correct app body given the current state ***/
  lookupBody = () => {
    switch (this.state.currentState) {
      case states.START:
        return <Start 
          nextState={this.nextState} />;
      case states.QUESTION:
        return <Question
          questionNo={this.lookupQuestionNo()} 
          question={this.lookupQuestionText()}
          nextState={this.nextState} />;
      case states.TRYAGAIN:         
        return <TryAgain
          currentDiff={this.currentDiff}
          numberOfTries={this.numberOfTries}
          nextState={this.nextState} />;
      case states.ANSWER:
        return <Answer
          isCorrect={this.isCorrect}
          answer={this.currentQuestion.answer}
          answers={this.answers}
          points={this.calculateScore()}
          nextState={this.nextState} />;
      case states.FINISH:
        return <Finish
          scores={this.state.scores}
          currentScore={this.state.currentScore}
          playerStatus={this.playerStatus}
          nextState={this.nextState} />;
      case states.QUIT:
        return <div className='body'> 
          <p> Thank you for playing! </p>
        </div>;
    }
  };

  /* Should the score bar be rendered? */
  lookupScoreBar = () => {
    if (this.state.currentState !== states.START
      && this.state.currentState !== states.FINISH
      && this.state.currentState !== states.QUIT) {
      return <ScoreBar 
        currentName={this.currentName}
        currentScore={this.state.currentScore} />;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="display-4 text-center border shadow 
          bg-secondary text-light my-4 p-3">
          What Year Was That?
        </div>
        {this.lookupScoreBar()}
        {this.lookupBody()}
      </div>
    );
  }
}

export default App;
