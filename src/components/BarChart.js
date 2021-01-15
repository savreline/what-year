import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

// https://blog.logrocket.com/data-visualization-in-react-using-react-d3-c35835af16d0/#settingupd3js
// https://stackoverflow.com/questions/1669190/find-the-min-max-element-of-an-array-in-javascript
// https://stackoverflow.com/questions/37445495/binning-an-array-in-javascript-for-a-histogram
// https://stackoverflow.com/questions/17723916/how-to-create-elements-depending-on-data-in-d3
// https://stackoverflow.com/questions/20811131/javascript-remove-outlier-from-an-array
class BarChart extends Component {
  constructor(props) {
    super(props);
    this.id = "chart"+this.props.id;
  }
  componentDidMount() {
    this.drawChart();
  }
  drawChart() {
    /* chart sizes */
    const height = 300;
    const width = 450;
    const barWidth = 20;
    const noBins = 5;
    const margin = {top: 25, right: 30, bottom: 30, left: 40};

    /* data */
    let answer = this.props.answer;
    let data = this.props.answers;
    if (typeof data == 'undefined') { 
      data = []; 
    }
    data.push(answer);
    let min = Math.min(...data);
    let max = Math.max(...data);
    let factor = (max - min) / 4 < 2 ? 2 : (max - min) / 4;
    // console.log(answer); // !!!
    // console.log(data); // !!!

    /* 1: set-up canvas */
    let svg = d3.select("#"+this.id)
                .append("svg")
                .attr("height", height + margin.top + margin.bottom)
                .attr("width", width + margin.right + margin.left)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    /* 2a: bin the data */
    let histogram = d3.histogram()
                      .domain([min, max])
                      .thresholds(noBins);
    let bins = histogram(data);
    // console.log(bins); // !!!

    /* 2b: adjust the size of the first and last bins */
    if (bins.length > 1) {
      let delta = bins[1].x1-bins[1].x0;
      let len = bins.length - 1;
      bins[0].x0 = bins[0].x1 - delta;
      bins[len].x1 = bins[len].x0 + delta;
    } else {
      bins[0].x1 += 1;
    }

    /* 3: set the scales */
    let xMin = min - factor < 0 ? 0 : min - factor;
    let xMax = max + factor;
    let x = d3.scaleLinear()
              .domain([xMin, xMax])     
              .range([0, width]);
    let y = d3.scaleLinear()
              .range([height, 0])
              .domain([0, d3.max(bins, d => d.length + 1)]);

    /* 4: make the chart */
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("fill", d => d.includes(answer) ? "green" : "#6c757d")
        .attr("transform", d => "translate(" + x(d.x0) + "," + y(d.length) + ")")
        .attr("width", d => x(d.x1) - x(d.x0) - 1)
        .attr("height", d => height - y(d.length));

      /* 5: determine text's position and no of y ticks */
      let maxlen = 0;
      let x0 = 0, x1 = 0, ym = 0;
      for (let elem of bins) {
        if (elem.length > maxlen)
          maxlen = elem.length;
        if (elem.includes(answer)) {
          x0 = elem.x0;
          x1 = elem.x1;
          ym = elem.length;
        }
      }

    /* 6a: append the scales */
    let xAxis = d3.axisBottom(x)
                  .tickFormat(d3.format("d"))
                  .ticks(bins.length + 2);
    let yAxis = d3.axisLeft(y)
                  .tickFormat(d3.format("d"))
                  .ticks(maxlen);
    svg.append("g")
        .style("font", "17px sans-serif")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("g")
        .style("font", "17px sans-serif")
        .call(yAxis);

    /* 6b: append the text */
    let textArray = ['You','are','here'];
    svg.append("text").selectAll("tspan")
        .data(textArray)
        .enter().append("tspan")
        .attr("x", (x(x0) + x(x1)) / 2)
        .attr("y", (d, i) => y(ym) + (i - 2) * barWidth - 3)
        .attr("text-anchor", "middle")
        .attr("font-size", "20")
        .text( d => d );
  }

  render() {
    return <div className="d-flex justify-content-center">
        <div id={this.id}></div>
      </div>;
  }
}

BarChart.propTypes = {
  id: PropTypes.number.isRequired,
  answer: PropTypes.number.isRequired,
  answers: PropTypes.array,
};

export default BarChart;
