//Width and height
var w = 500;
var h = 300;
var padding = 30;

//Dynamic, random dataset
var dataset = []; //Initialize empty array
var numDataPoints = 50; //Number of dummy data points to create
var xRange = Math.random() * 1000; //Max range of new x values
var yRange = Math.random() * 1000; //Max range of new y values
for (var i = 0; i < numDataPoints; i++) { //Loop numDataPoints times
				var newNumber1 = Math.floor(Math.random() * xRange); //New random integer
				var newNumber2 = Math.floor(Math.random() * yRange); //New random integer
				dataset.push([newNumber1, newNumber2]); //Add new number to array
}
//Create scale functions
var xScale = d3
			.scale
			.linear()
			.domain([
				0,
				d3.max(dataset, function (d) {
								return d[0];
				})
			])
			.range([
				padding, w - padding * 2
			]);
var yScale = d3
			.scale
			.linear()
			.domain([
							0,
							d3.max(dataset, function (d) {
											return d[1];
							})
			])
			.range([
							h - padding,
							padding
			]);
var rScale = d3
			.scale
			.linear()
			.domain([
							0,
							d3.max(dataset, function (d) {
											return d[1];
							})
			])
			.range([2, 5]);
var formatAsPercentage = d3.format(".1%");
//Define X axis
var xAxis = d3
		.svg
		.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(5)
		.tickFormat(formatAsPercentage);
//Define Y axis
var yAxis = d3
		.svg
		.axis()
		.scale(yScale)
		.orient("left")
		.ticks(5)
		.tickFormat(formatAsPercentage);
//Create SVG element
var svg = d3
	.select(".svgArea")
	.append("svg")
	.attr("width", w)
	.attr("height", h)
	.style({
		"padding": "30px",
		"margin": "20px 50px"
	})
//Create circles
svg
	.selectAll("circle")
	.data(dataset)
	.enter()
	.append("circle")
	.attr("cx", function (d) {
					return xScale(d[0]);
	})
	.attr("cy", function (d) {
					return yScale(d[1]);
	})
	.attr("r", function (d) {
					return rScale(d[1]);
	});
/*
			//Create labels
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d[0] + "," + d[1];
			   })
			   .attr("x", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("y", function(d) {
			   		return yScale(d[1]);
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "red");
		  	*/

//Create X axis
svg
	.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + (h - padding) + ")")
	.call(xAxis);

//Create Y axis
svg
	.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + padding + ",0)")
	.call(yAxis);
