import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TryAgain extends Component {
    handleSubmit = (event) => {
      event.preventDefault();
      this.props.nextState();
    };
    handleEnter = (event) => {
      if (event.which === 13) {
        this.handleSubmit(event);
      }
    };
    componentDidMount(){
      document.addEventListener('keydown', this.handleEnter, false);
    }
    componentWillUnmount(){
      document.removeEventListener('keydown', this.handleEnter, false);
    }

    hint() {
      let currentDiff = this.props.currentDiff;
      if (currentDiff >= 50) {
        return 'significantly over';
      } else if (currentDiff >= 20) {
        return 'over';
      } else if (currentDiff > 0) {
        return 'slightly over';  
      } else if (currentDiff >= -20) {
        return 'slightly under';
      } else if (currentDiff >= -50) {
        return 'under';    
      } else {
        return 'significantly under';  
      }
    }

    numOfTries() {
      switch(this.props.numberOfTries) {
        case 1: return <span><strong><em>one</em></strong> try </span>;
        case 2: return <span><strong><em>two</em></strong> tries </span>;
        case 3: return <span><strong><em>three</em></strong> tries </span>;
        default: return <span><strong><em>zero</em></strong> tries </span>;
      }
    }
  
    render() {
      return (
        <div className="body" onKeyPress={this.onKeyPress}>
          <div className="points">
            <p> Try again: your answer is <strong><em>{this.hint()}</em></strong>! </p>
            <p> You have {this.numOfTries()} left! </p>
          </div>     
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
