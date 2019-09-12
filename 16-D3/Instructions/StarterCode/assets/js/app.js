// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 80,
  right: 80,
  bottom: 80,
  left: 80
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);


// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
var xaxis = "poverty";


function xScale(healthData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(healthData, d => d[chosenXAxis]) * 0.8,
        d3.max(healthData, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, chartWidth]);
    return xLinearScale;
   }

   // create function to update x axis upon click on axis label
   function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
    return xAxis;
   }






// Load data from hours-of-tv-watched.csv
d3.csv("assets/data/data.csv")
.then(function (healthData) {
    
    healthData.forEach(function(data) {

        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.income = +data.income;

    });



    var xLinearScale = xScale(healthData, xaxis);
    var yLinearScale = yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.healthcare)+2])
        .range([chartHeight, 0]);
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3. axisLeft(yLinearScale);
    
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    
    chartGroup.append("g")
        .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[xaxis]))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 25)
        .attr("fill", "LightBlue")
        .attr("stroke", "white")




   var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);
    var povertyLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 25)
        .attr("value", "poverty")
        .classed("active", true)
        .text("Percent of State Population in Poverty");
        // create y-axis label
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left + 45)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .classed("active", true)
        .text("Percent of State Population Without Healthcare");

});