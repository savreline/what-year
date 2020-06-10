import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TryAgain extends Component {
    handleSubmit = (event) => {
      event.preventDefault();
      this.props.nextState();
    };
    hint() {
      let currentDiff = this.props.currentDiff;
      if (currentDiff >= 50) {
        return 'SIGNIFICANTLY OVER';
      } else if (currentDiff >= 20) {
        return 'OVER';
      } else if (currentDiff > 0) {
        return 'SLIGHTLY OVER';  
      } else if (currentDiff >= -20) {
        return 'UNDER';
      } else if (currentDiff >= -50) {
        return 'SLIGHTLY UNDER';    
      } else {
        return 'SIGNIFICANTLY UNDER';  
      }
    }

    numOfTries() {
      switch(this.props.numberOfTries) {
        case 1: return <span><strong><em>ONE</em></strong> try </span>;
        case 2: return <span><strong><em>TWO</em></strong> tries </span>;
        case 3: return <span><strong><em>THREE</em></strong> tries </span>;
        default: return <span><strong><em>ZERO</em></strong> tries </span>;
      }
    }
  
    render() {
      return (
        <div className="try-again">
          <ul className="points">
            <li>Try again: your answer is <strong><em>{this.hint()}</em></strong>!</li>
            <li>You have {this.numOfTries()} left!</li>
          </ul>     
          <form onSubmit={this.handleSubmit}>
            <button type="submit" className="btn">
              OK    
            </button>
          </form>
        </div>
      );
    }
}

TryAgain.propTypes = {
  currentDiff: PropTypes.number.isRequired,
  numberOfTries: PropTypes.number.isRequired,
  nextState: PropTypes.func.isRequired,
};

export default TryAgain;
