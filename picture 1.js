// clean and create data
var response = await fetch("Titanic-Dataset.csv");
var data = await response.text();
data = d3.csvParse(data);

data.forEach(function(d) {
    d.Survived = +d.Survived 
});

// variables and initiate pie chart
var survived = d3.sum(data, function(d) {return d.Survived; });
var not_survived = data.length - survived;

var color = ['green', 'red'];

var pieData = [
    {label: "Survived", count: survived},
    {label: "Not Survived", count: not_survived }
];

// pie chart 
var width = 400;
var height = 400;
var radius = 200;

var pie = d3.pie().value(function(d) {return d.count; });
var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

var g = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(200,200)");

g.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("d", "arc")
    .attr("d", arc)
    .attr("fill", function(d,i) {return color[i]; })