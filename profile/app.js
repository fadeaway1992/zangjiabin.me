const text = require('./text.txt')
import Typer from './typer.js'
const typer = new Typer({interval: 0.2})
const typeContainer = document.querySelector('.type-container')
typer.type(typeContainer, text)

var data = [
  {key: 'HTML5', value: 8},
  {key: 'CSS3', value: 8},
  {key: 'JavaScript', value: 9},
  {key: 'Vue.js', value: 8},
  {key: 'Webpack', value: 5},
  {key: 'Babel', value: 7},
  {key: 'Node.js', value: 5},
  {key: 'MongoDB', value: 6},
  {key: 'HTTP', value: 7},
  {key: 'Express', value: 5},
  {key: 'Linux', value: 6},
  {key: 'Git', value: 8}
]

var height = 400;
var width = 600;

var xScale = d3.scaleLinear()
  .domain([0, 10])
  .range([0, width]);

var yScale = d3.scaleBand()
  .domain(data.map(function (d) {return d.key}))
  .range([0, height])
  .paddingInner(0.5)

var svg = d3.select(".chart")
  .style('width', width + 'px')
  .style('height', height + 'px');

var bar = svg.selectAll('g')
  .data(data)
  .enter()
  .append('g')

bar.append('rect')
  .attr('class', 'bar')
  .attr('rx', '1%')
  .attr('ry', '1%')
  .attr("x", function (d, i) {
    return 0;
  })
  .attr("y", function (d, i) {
    return yScale(d.key);
  })
  .attr("height", function (d, i) {
    return yScale.bandwidth()
  })
  .attr("fill", function (d, i) {
    return 'rgb(256, ' + Math.round(i / 2) + ', ' + i + ')'
  })
  .attr("width", 0)
  .transition()
  .duration(800)
  .delay(function (d, i) {
    return i * 800;
  })
  .attr("x", function (d, i) {
    return 0;
  })
  .attr("width", function (d, i) {
    return xScale(d.value);
  });
  
bar.append('text')
  .attr('class', 'text')
  .attr('x', function (d, i) {
    return xScale(d.value);
  })
  .attr('y', function (d, i) {
    return yScale(d.key)
  })
  .style('opacity', 0)
  .text(function (d) {return d.key})
  .transition()
  .duration(800)
  .delay(function (d, i) {
    return i * 800;
  })
  .style('opacity', 1)

var xAxis = d3.axisBottom(xScale)

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (height) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .append('path')
    .attr('d', 'M0 0 V' + height + 'H 1 V 0 L0 0')