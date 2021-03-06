import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Categories from './Categories';

class Start extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.nextState(this.nameEntered.value, event.currentTarget.value);
  };
  componentDidMount(){
    this.nameEntered.focus();
  }

  render() {
    return (
      <div>
        <div className="border shadow my-4 p-3 text-justify">
          <p>
            Welcome to <em>what year was that</em> game. Enter your a name below, 
            pick a category and start playing! For each question, type in your best guess 
            as to in which year the given event took place. You get three tries! After each
            try you will be told if your guess over estimated or under estimated the correct
            answer and you can adjust your next guess based on this hint. You can earn up to 
            1000 points for each question, reduced by the amount of tries you used and by how
            far away your best attempt is from the correct answer. Each game session consists
            of 10 questions. Have fun!
          </p>
          <p><strong>N.B. </strong>
            At this time, if you enter the same name you used before, the points you earned 
            during the current game session will be added to your previous score. You also
            wouldn&apos;t be promted with the questions you already answered. In the future, 
            a username login system would be added to address this issue.
          </p>
          <form className="text-center">
            <input type="text"
              placeholder="Enter a name..."
              className="form-control form-control-lg my-3"
              ref={(c) => { this.nameEntered = c; }} />
            <Categories 
              handleSubmit={this.handleSubmit} />        
          </form>  
        </div>
      Created by <a href="https://savreline.com">Sasha Avreline</a>
      </div>
    );
  }
}

Start.propTypes = {
  nextState: PropTypes.func.isRequired,
};

export default Start;
