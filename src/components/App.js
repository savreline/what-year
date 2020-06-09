import React, { Component } from 'react';
import Header from './Header';
import Body from './Body';
import * as api from '../api';

class App extends Component {
    state = {
      currentQuestion: null
    };

    /* Fetch the question from the API and put it on the state */
    fetchQuestion = (questionID) => {
      api.fetchQuestion(questionID).then(questionObj => {
        this.setState({
          currentQuestion: questionObj
        });
      });
    };

    /* If there is a question on the state, return its text */
    lookupQuestionText = () => {
      if (this.state.currentQuestion)
        return this.state.currentQuestion.question;
      else
        return '...';
    };

    render() {
      return (
        <div className="App">
          <Header />
          <Body 
            fetchQuestion={this.fetchQuestion}
            lookupQuestion={this.lookupQuestionText} />
        </div>
      );
    }
}

export default App;
