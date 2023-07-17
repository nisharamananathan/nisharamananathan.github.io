// chart #1: pie chart

async function fetchData() {
    var response = await fetch("Titanic-Dataset.csv");
    var data = await response.text();
    data = d3.csvParse(data);

    data.forEach(function(d) {
        d.Survived = +d.Survived;
    });

    var color = ['green', 'red'];

    var survived = d3.sum(data, function(d) { return d.Survived; });
    var not_survived = data.length - survived;

    var pieData = [
        { label: "Survived", count: survived },
        { label: "Not Survived", count: not_survived }
    ];

    var width = 400;
    var height = 400;
    var radius = 200;

    var pie = d3.pie().value(function(d) { return d.count; });
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append("g").attr("transform", "translate(200,200)")

    g.selectAll("arc")
        .data(pie(pieData))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", function(d, i) { return color[i]; });
}
fetchData();