import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Categories from './Categories';
import { playerStatus } from './App';

class Finish extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.nextState(null, event.currentTarget.value);
  };
  fetchMessage = () => {
    if (this.props.playerStatus === playerStatus.COMPLETED_NONE) {
      return <p> You reached the end of this game session and earned <strong>
        {this.props.currentScore} </strong> points. Would you like to
      play again and try another category? </p>;
    } else if (this.props.playerStatus === playerStatus.COMPLETED_CAT) {
      return <p> You completed all questions in this category. You current score is <strong>
        {this.props.currentScore} </strong> points. Would you like to
      play again and try another category? </p>;
    } else {
      return <p> You completed all questions in this game. You final score is <strong>
        {this.props.currentScore} </strong> points. Please check back later as 
      more categories and questions could be added. </p>;
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
  
  render() {
    return (
      <div className="body">
        {this.fetchMessage()}
        {this.fetchButtons()}
        <div className="scoreboard">
          <table>
            <caption>Current Scoreboard</caption>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {this.props.scores.map((score, id) =>
                <tr key={id} >
                  <td>{id + 1}</td>
                  <td>{score.playerName}</td>
                  <td>{score.score}</td>
                </tr>  
              )}
            </tbody>
          </table>
          <form>
            <button value='-1' className='quit' onClick={this.handleSubmit}> 
              QUIT GAME 
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Finish.propTypes = {
  nextState: PropTypes.func.isRequired,
  currentScore: PropTypes.number.isRequired,
  playerStatus: PropTypes.number.isRequired,
  scores: PropTypes.array.isRequired,
};
  
export default Finish;
