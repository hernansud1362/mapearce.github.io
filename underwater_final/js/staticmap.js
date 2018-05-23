var width=1000,
	height=600

var svg1 = d3.select("#stmap1").append("svg")
	.attr("width", width)
	.attr("height", height)
;
var svg2 = d3.select("#stmap2").append("svg")
	.attr("width", width)
	.attr("height", height)
;
var svg3 = d3.select("#stmap3").append("svg")
	.attr("width", width)
	.attr("height", height)
;
var svg4 = d3.select("#stmap4").append("svg")
	.attr("width", width)
	.attr("height", height)
;

var data = d3.map();

var albersProjection = d3.geoAlbers()
	.scale( 160000 )
	.rotate( [71.057,0] )
	.center( [0, 42.313] )
	.translate( [width/2,height/2] );

var path = d3.geoPath()
	.projection(albersProjection);

//  Create Tooltip
var tooltip = d3.select("body")
							.append("div")
							.attr("class","tooltip")
							.style("font-family", "'Karla', sans-serif")
							.style("font-size", ".8em")
							.style("z-index", "10")
							.style("padding", "5px")
							.style("background-color","#ffffff")
							.style("opacity", 0.9)
							.style("visibility", "hidden");
// Load data
d3.queue()
	.defer(d3.json, "../data/riskmap.json")
	.defer(d3.csv, "../data/bank_by_tract1.csv")
	.await(ready); // Run 'ready' when JSONs are loaded
	// Ready Function, runs when data is loaded

function ready(error, riskmap, bankrank) {
	if (error) throw error;

	svg1.append("g")
			.attr("class", "zones")
		.selectAll("path")
			.data(topojson.feature(riskmap, riskmap.objects.data).features)
		.enter().append("path")
			.attr("d", path)
			.style("fill", function color(d) {
				if (d.properties.percentage1 >= .25) {
					return "#99ccff"
				} else {
					return "#ffffff"
				}
			})
			// .style("opacity", .9)
			.style("stroke", "#bebebe")
			.on("mouseover", function(d, i){
				console.log(bankrank[i]['Rank1']);
				tooltip.style("visibility", "visible")
								.text("Census tract number: " + d.properties.TRACTCE10 + " | Area under flood risk: " + Math.round(d.properties.percentage1*100) + "% | Top 3 lenders in this tract: " + bankrank[i]['Rank1'] + ", " + bankrank[i]['Rank2'] + ", " + bankrank[i]['Rank3']);
				})
			.on("mousemove", function(d){
				tooltip.style("top", (d3.event.pageY-10)+"px")
								.style("left",(d3.event.pageX+10)+"px")
				})
			.on("mouseout", function(d){
				tooltip.style("visibility", "hidden");
			});

	svg1.append("rect")
      .attr("x", 0)
			.attr("y", 30)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "#99ccff");

	svg1.append("rect")
			.attr("x", 0)
			.attr("y", 60)
			.attr("width", 20)
			.attr("height", 20)
			.attr("fill", "#ffffff");

  svg1.append("text")
      .attr("x", 30)
      .attr("y", 40)
      .attr("dy", "0.32em")
			.attr("font-size", ".8em")
      .attr("fill", "#fff")
      .text("3 census tracts that are at least 25% affected by the 9-inch 10-year flood risk projection");

	svg1.append("text")
      .attr("x", 30)
      .attr("y", 70)
      .attr("dy", "0.32em")
			.attr("font-size", ".8em")
      .attr("fill", "#fff")
      .text("Unaffected census tracts");

	svg2.append("g")
			.attr("class", "zones")
		.selectAll("path")
			.data(topojson.feature(riskmap, riskmap.objects.data).features)
		.enter().append("path")
			.attr("d", path)
			.style("fill", function color(d) {
				if (d.properties.percentage2 >= .25) {
					return "#99ccff"
				} else {
					return "#ffffff"
				}
			})
			.style("stroke", "#bebebe")
			.on("mouseover", function(d){
				tooltip.style("visibility", "visible")
								.text("Census tract number: " + d.properties.TRACTCE10 + " | Area under flood risk: " + Math.round(d.properties.percentage2*100) + "% | Top 3 lenders in this tract: " + bankrank[i]['Rank1'] + ", " + bankrank[i]['Rank2'] + ", " + bankrank[i]['Rank3']);
				})
			.on("mousemove", function(d){
				tooltip.style("top", (d3.event.pageY-10)+"px")
								.style("left",(d3.event.pageX+10)+"px")
				})
			.on("mouseout", function(d){
				tooltip.style("visibility", "hidden");
			});

		svg2.append("rect")
	      .attr("x", 0)
				.attr("y", 30)
	      .attr("width", 20)
	      .attr("height", 20)
	      .attr("fill", "#99ccff");

		svg2.append("rect")
				.attr("x", 0)
				.attr("y", 60)
				.attr("width", 20)
				.attr("height", 20)
				.attr("fill", "#ffffff");

	  svg2.append("text")
	      .attr("x", 30)
	      .attr("y", 40)
	      .attr("dy", "0.32em")
				.attr("font-size", ".8em")
	      .attr("fill", "#fff")
	      .text("12 census tracts that are at least 25% affected by the 9-inch 100-year flood risk projection");

		svg2.append("text")
	      .attr("x", 30)
	      .attr("y", 70)
	      .attr("dy", "0.32em")
				.attr("font-size", ".8em")
	      .attr("fill", "#fff")
	      .text("Unaffected census tracts");

	svg3.append("g")
			.attr("class", "zones")
		.selectAll("path")
			.data(topojson.feature(riskmap, riskmap.objects.data).features)
		.enter().append("path")
			.attr("d", path)
			.style("fill", function color(d) {
				if (d.properties.percentage3 >= .25) {
					return "#99ccff"
				} else {
					return "#ffffff"
				}
			})
			.style("stroke", "#bebebe")
			.on("mouseover", function(d){
				tooltip.style("visibility", "visible")
								.text("Census tract number: " + d.properties.TRACTCE10 + " | Area under flood risk: " + Math.round(d.properties.percentage3*100) + "% | Top 3 lenders in this tract: " + bankrank[i]['Rank1'] + ", " + bankrank[i]['Rank2'] + ", " + bankrank[i]['Rank3']);
				})
			.on("mousemove", function(d){
				tooltip.style("top", (d3.event.pageY-10)+"px")
								.style("left",(d3.event.pageX+10)+"px")
				})
			.on("mouseout", function(d){
				tooltip.style("visibility", "hidden");
				});

	svg3.append("rect")
      .attr("x", 0)
			.attr("y", 30)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "#99ccff");

	svg3.append("rect")
			.attr("x", 0)
			.attr("y", 60)
			.attr("width", 20)
			.attr("height", 20)
			.attr("fill", "#ffffff");

  svg3.append("text")
      .attr("x", 30)
      .attr("y", 40)
      .attr("dy", "0.32em")
			.attr("font-size", ".8em")
      .attr("fill", "#fff")
      .text("17 census tracts that are at least 25% affected by the 21-inch 10-year flood risk projection");

	svg3.append("text")
      .attr("x", 30)
      .attr("y", 70)
      .attr("dy", "0.32em")
			.attr("font-size", ".8em")
      .attr("fill", "#fff")
      .text("Unaffected census tracts");

	svg4.append("g")
			.attr("class", "zones")
		.selectAll("path")
			.data(topojson.feature(riskmap, riskmap.objects.data).features)
		.enter().append("path")
			.attr("d", path)
			.style("fill", function color(d) {
				if (d.properties.percentage4 >= .25) {
					return "#99ccff"
				} else {
					return "#ffffff"
				}
			})
			.style("stroke", "#bebebe")
			.on("mouseover", function(d){
				tooltip.style("visibility", "visible")
								.text("Census tract number: " + d.properties.TRACTCE10 + " | Area under flood risk: " + Math.round(d.properties.percentage4*100) + "% | Top 3 lenders in this tract: " + bankrank[i]['Rank1'] + ", " + bankrank[i]['Rank2'] + ", " + bankrank[i]['Rank3']);
				})
			.on("mousemove", function(d){
				tooltip.style("top", (d3.event.pageY-10)+"px")
								.style("left",(d3.event.pageX+10)+"px")
				})
			.on("mouseout", function(d){
				tooltip.style("visibility", "hidden");
				});

	svg4.append("rect")
      .attr("x", 0)
			.attr("y", 30)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "#99ccff");

	svg4.append("rect")
			.attr("x", 0)
			.attr("y", 60)
			.attr("width", 20)
			.attr("height", 20)
			.attr("fill", "#ffffff");

  svg4.append("text")
      .attr("x", 30)
      .attr("y", 40)
      .attr("dy", "0.32em")
			.attr("font-size", ".8em")
      .attr("fill", "#fff")
      .text("27 census tracts that are at least 25% affected by the 21-inch 100-year flood risk projection");

	svg4.append("text")
      .attr("x", 30)
      .attr("y", 70)
      .attr("dy", "0.32em")
			.attr("font-size", ".8em")
      .attr("fill", "#fff")
      .text("Unaffected census tracts");
}
