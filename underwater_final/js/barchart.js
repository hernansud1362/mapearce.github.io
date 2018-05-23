var width=900,
	height=300;

var svgBarChartBanks = d3.select("#barchart").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g");

var margin = {top: 20, right: 20, bottom: 30, left: 40};

var gBarChart = svgBarChartBanks.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .rangeRound([0, width - margin.left - margin.right])
    .paddingInner(0.2)
    .align(0.1);

var y = d3.scaleLinear()
    .rangeRound([height - margin.top - margin.bottom, 0]);

var z = d3.scaleOrdinal()
    .range(["#0A2F3F", "#275D74", "#74A1B4", "#A6D5E9", "#ffffff"]);

d3.csv("../data/stackdataBank10.csv", function (d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = data.columns.slice(1);

  data.sort(function(a, b) { return b.total - a.total; });
  x.domain(data.map(function(d) { return d.Bank; }));
  y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
  z.domain(keys)

  gBarChart.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.Bank); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth());

  gBarChart.append("g")
      .attr("class", "axisBarChart")
      .attr("transform", "translate(0, 250)")
      .call(d3.axisBottom(x));

  gBarChart.append("g")
      .attr("class", "axisBarChart")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#fff")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Total Loan Volume by Bank (B's USD)");

  var legend = gBarChart.append("g")
      .attr("font-family", "Karla")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .style("color", "#fff")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - margin.left - margin.right - 120)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - margin.left - margin.right - 150)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .attr("fill", "#fff")
      .text(function(d) { return d; });
});
