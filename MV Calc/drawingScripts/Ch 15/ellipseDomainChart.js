var ellipseDomainChart = document.querySelector("#ellipseDomainChart");
var ellipseDomainChartCTX = ellipseDomainChart.getContext("2d");
oversampleCanvas(ellipseDomainChart, ellipseDomainChartCTX, 4);
ellipseDomainChartCTX.font = "10px Arial";
ellipseDomainChartCTX.strokeStyle = "black";
ellipseDomainChartCTX.fillStyle = "black"; //Required to make the tip of the arrow the same color
drawArrow(ellipseDomainChartCTX, 10, 90, 10, 0);
ellipseDomainChartCTX.fillText("y", 2, 20);
drawArrow(ellipseDomainChartCTX, 10, 90, 100, 90);
ellipseDomainChartCTX.fillText("x", 90, 100);
ellipseDomainChartCTX.moveTo(50 + 25, 50)
ellipseDomainChartCTX.ellipse(50, 50, 25, 15, 0, 0, 2 * Math.PI);
ellipseDomainChartCTX.stroke();

ellipseDomainChartCTX.font = "10px Arial";
ellipseDomainChartCTX.fillText("D", 47, 53);