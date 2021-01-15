import React, { Component } from 'react';
import Categories from '../src/components/Categories';
import BarChart from '../src/components/BarChart';
import * as api from '../src/api';

class Charts extends Component {
  state = {
    questions: []
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.state.questions = [];
    this.renderCharts(event.currentTarget);
  };
  renderCharts(event) {
    api.fetchQuestions()
      .then(questions => {
        if (event.innerHTML != "All Categories") {
          questions = questions.filter(question =>
            question.category == event.innerHTML);
        }
        this.setState({ questions: questions });
      });
  }
  render() { 
    return (
    <div className="container">
      <div className="display-4 text-center border shadow 
         bg-secondary text-light my-4 p-3">
         Result Charts
      </div>
      <form className="text-center">
        <Categories 
          handleSubmit={this.handleSubmit} /> 
      </form>
      <div className="border shadow my-4 p-3">
        {this.state.questions.map((question, id) =>
          <div key={id} className="mb-2">
            <strong style={{fontSize: "1.2rem"}}>{question.question}
              &nbsp;({question.answer})</strong>
            <BarChart
              id={id}
              answer={question.answer}
              answers={question.answers}/>
          </div>
        )}
      </div>
    </div>
  )};
}

export default Charts;
