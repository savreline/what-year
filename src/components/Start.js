import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { categories } from './App';

class Start extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.nextState(this.nameEntered.value, event.currentTarget.value);
    this.nameEntered.value = '';
  };
  componentDidMount(){
    this.nameEntered.focus();
  }

  render() {
    return (
      <div className="body">
        <p>
            Welcome to <em>what year was that?</em> game. Enter your nick name below, 
            pick a category and start playing! For each question, type in your best guess 
            as to in which year the given event took place. You get three tries! After each
            try you will be told if your guess over estimated or under estimated the correct
            answer and you can adjust your next guess based on this hint. You can earn up to 
            1000 points for each question, reduced by the amount of tries you used and by how
            far away your final attempt is from the correct answer. Have fun!
        </p>
        <form>
          <input type="text"
            placeholder="Enter a nickname..."
            className="name-input"
            ref={(c) => { this.nameEntered = c; }} />
          <div>
            {categories.map((category, id) =>
              <button key={id} value={id} onClick={this.handleSubmit} className="btn">
                {category}
              </button>  
            )}
          </div>         
        </form>  
      </div>
    );
  }
}

Start.propTypes = {
  nextState: PropTypes.func.isRequired,
};

export default Start;
