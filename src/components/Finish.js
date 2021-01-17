import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Categories from './Categories';
import { playerStatus } from './App';

const SCOREBOARD_LEN = 10;

class Finish extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.nextState(null, event.currentTarget.value);
  };
  fetchMessage = () => {
    if (this.props.playerStatus === playerStatus.COMPLETED_NONE) {
      return <p> You reached the end of this game session and earned <strong>
        {this.props.currentScore} </strong> points in this session. Your total
        score is shown below. Would you like to play again and try another category? </p>;
    } else if (this.props.playerStatus === playerStatus.COMPLETED_CAT) {
      return <p> You completed all questions in this category. You earned a total of 
        <strong> {this.props.currentScore} </strong> points in this session. Your total
        score is shown below. Would you like to play again and try another category? </p>;
    } else {
      return <p> You completed all questions in this game. You earned a total of 
        <strong> {this.props.currentScore} </strong> points in this session. 
        Your final score is shown below. Please check back later as more categories and 
        questions could be added. </p>;
    }
  }
  fetchButtons = () => {
    if (this.props.playerStatus !== playerStatus.COMPLETED_ALL) {
      return <form>
        <Categories 
          handleSubmit={this.handleSubmit} />
      </form>;
    }      
  }
  filterScores = () => {
    return this.props.scores.slice(0, SCOREBOARD_LEN);
  }
  addCurPlayer = () => {
    let len = this.props.scores.length - 1;
    if (len < SCOREBOARD_LEN) {
      return;
    }
    if (this.props.currentScore < this.props.scores[SCOREBOARD_LEN-1].score) {
      let idx = 0;
      for (let i = 0; i <= len; i++) {
        if (this.props.playerName == this.props.scores[i].playerName) {
          idx = i;
        }
      }
      return <tr style={{ backgroundColor: '#98FB98' }}>
        <td>{idx + 1}</td>
        <td>{this.props.playerName}</td>
        <td>{this.props.currentScore}</td>
      </tr>;
    }
  }
  
  render() {
    return (
      <div className="border shadow text-justify my-4 p-3">
        {this.fetchMessage()}
        {this.fetchButtons()}
        <div className="row justify-content-center">
          <h2 className="mt-3">Current Leaderboard</h2>
          <table className="table lgtext w-75">
            <thead className="thead-light">
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {this.filterScores(this.props.scores).map((score, id) =>
                <tr key={id} style={{
                  backgroundColor: this.props.playerName == score.playerName ?
                    '#98FB98' : 'none' }}>
                  <td>{id + 1}</td>
                  <td>{score.playerName}</td>
                  <td>{score.score}</td>
                </tr>  
              )}
              {this.addCurPlayer()}
            </tbody>
          </table>
        </div>
        <form>
          <button value='-1' onClick={this.handleSubmit}
            className="btn btn-block btn-lg btn-secondary m-1"> 
            QUIT GAME 
          </button>
        </form>
      </div>
    );
  }
}

Finish.propTypes = {
  nextState: PropTypes.func.isRequired,
  currentScore: PropTypes.number.isRequired,
  playerStatus: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  scores: PropTypes.array.isRequired,
};
  
export default Finish;
