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
              {this.props.scores.map((score, id) =>
                <tr key={id} >
                  <td>{id + 1}</td>
                  <td>{score.playerName}</td>
                  <td>{score.score}</td>
                </tr>  
              )}
            </tbody>
          </table>
        </div>
        <form>
          <button value='-1' className='quit' onClick={this.handleSubmit}
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
  scores: PropTypes.array.isRequired,
};
  
export default Finish;
