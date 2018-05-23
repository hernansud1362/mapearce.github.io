var tooltipEyeball = d3.select("#eyeball")
  .append("div")
  .style("position", "absolute")
  .style("font-family", "Karla")
  .style("font-size", "12px")
  .style("padding", "5px")
  .style("z-index", "10")
  .style("visibility", "hidden")
  .style("background-color", "#fff")
  .style("padding", "5px")
  .style("opacity", "0.9");

d3.queue()
  .defer(d3.csv, "data/citywidedebtbyrisk.csv")
  .await(ready);

function ready(error, debtByRisk) {
  if (error) throw error;

  var width = 400;
  var height = 400;

  var radiusByRisk = {};
  debtByRisk.forEach(function(d) {
          radiusByRisk[d.id] = +d.radiusperc;
        });

  var r = d3.scaleLinear()
    .domain([0.0, 100.0])
    .rangeRound([0.0, width/2]);

  var svgRiskAmount = d3.select("#eyeball").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")

  svgRiskAmount.append("circle")
    .attr( "cx", width/2 )
    .attr( "cy", width/2 )
    .attr( "r", r(radiusByRisk[4]))
    .attr("fill", "#fff")
    .attr("opacity", "0.9")
    .on("mouseover", function(d) {
        d3.select(this)
        return tooltipEyeball
          .style("visibility", "visible")
          .style("top", (d3.event.pageY-10)+"px")
          .style("left",(d3.event.pageX+10)+"px")
          .text("$57.4 billion lent in Boston");
        })
    .on("mouseout", function(d) {
        d3.select(this)
        return tooltipEyeball.style("visibility", "hidden");
        });
  svgRiskAmount.append("circle")
    .attr( "cx", width/2 )
    .attr( "cy", width/2 )
    .attr( "r", r(radiusByRisk[3]))
    .attr("stroke", "#0074B1")
    .attr("fill", "transparent")
    .attr("opacity", "0.5")
    .on("mouseover", function(d) {
        d3.select(this).classed("hover", true)
        return tooltipEyeball
          .style("visibility", "visible")
          .style("top", (d3.event.pageY-10)+"px")
          .style("left",(d3.event.pageX+10)+"px")
          .text("5.0% | $2.8 billion lent in the 21in 100yr risk scenario.");
        })
    .on("mouseout", function(d) {
        d3.select(this).classed("hover", false)
        return tooltipEyeball.style("visibility", "hidden");
        });
  svgRiskAmount.append("circle")
    .attr( "cx", width/2 )
    .attr( "cy", width/2 )
    .attr( "r", r(radiusByRisk[2]))
    .attr("stroke", "#0074B1")
    .attr("fill", "transparent")
    .attr("opacity", "0.5")
    .on("mouseover", function(d) {
        d3.select(this).classed("hover", true)
        return tooltipEyeball
          .style("visibility", "visible")
          .style("top", (d3.event.pageY-10)+"px")
          .style("left",(d3.event.pageX+10)+"px")
          .text("3.3% | $1.9 billion lent in the 21in 10yr risk scenario.");
        })
    .on("mouseout", function(d) {
        d3.select(this).classed("hover", false)
        return tooltipEyeball.style("visibility", "hidden");
        });
  svgRiskAmount.append("circle")
    .attr( "cx", width/2 )
    .attr( "cy", width/2 )
    .attr( "r", r(radiusByRisk[1]))
    .attr("stroke", "#0074B1")
    .attr("fill", "transparent")
    .attr("opacity", "0.5")
    .on("mouseover", function(d) {
        d3.select(this).classed("hover", true)
        return tooltipEyeball
          .style("visibility", "visible")
          .style("top", (d3.event.pageY-10)+"px")
          .style("left",(d3.event.pageX+10)+"px")
          .text("2.2% | $1.1 billion lent in the 9in 100yr risk scenario.");
        })
    .on("mouseout", function(d) {
        d3.select(this).classed("hover", false)
        return tooltipEyeball.style("visibility", "hidden");
        });
  svgRiskAmount.append("circle")
    .attr( "cx", width/2 )
    .attr( "cy", width/2 )
    .attr( "r", r(radiusByRisk[0]))
    .attr("fill", "#0074B1")
    .attr("opacity", "0.5")
    .on("mouseover", function(d) {
        d3.select(this).classed("hover", true)
        return tooltipEyeball
          .style("visibility", "visible")
          .style("top", (d3.event.pageY-10)+"px")
          .style("left",(d3.event.pageX+10)+"px")
          .text("0.2% | $0.1 billion lent in the 9in 10yr risk scenario.");
        })
    .on("mouseout", function(d) {
        d3.select(this).classed("hover", false)
        return tooltipEyeball.style("visibility", "hidden");
        });
}
