import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Categories from './Categories';

class Finish extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.nextState(null, event.currentTarget.value);
  };
  
  render() {
    return (
      <div className="body">
        <p> You reached the end of this game session and earned <strong>
          {this.props.currentScore} </strong> points. Would you like to
          play again and try another category? </p>
        <form>
          <Categories 
            handleSubmit={this.handleSubmit} />
        </form>
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
  scores: PropTypes.array.isRequired,
};
  
export default Finish;
