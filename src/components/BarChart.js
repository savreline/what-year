import React, {Component} from 'react';
import * as d3 from 'd3';

// https://blog.logrocket.com/data-visualization-in-react-using-react-d3-c35835af16d0/#settingupd3js
class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }
  drawChart() {
    const h = 150;
    const data = [12, 5, 6, 6, 9, 10];
    const svg = d3.select("#chart")
    .append("svg")
    .attr("width", 420)
    .attr("height", h)
                  
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "#6c757d")
    
    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - (10 * d) - 3)
  }
  render() {
    return <div className="d-flex justify-content-center">
        <div id="chart"></div>
      </div>
  }
}

export default BarChart;
