var lineChartWithDomainNoted = document.querySelector("#lineChartWithDomainNoted");
var lineChartWithDomainNotedCTX = lineChartWithDomainNoted.getContext("2d");
oversampleCanvas(lineChartWithDomainNoted, lineChartWithDomainNotedCTX, 4);
lineChartWithDomainNotedCTX.beginPath();
lineChartWithDomainNotedCTX.lineWidth = 1;
lineChartWithDomainNotedCTX.moveTo(5, 20);
lineChartWithDomainNotedCTX.lineTo(95, 20);
lineChartWithDomainNotedCTX.lineWidth = 1;
lineChartWithDomainNotedCTX.moveTo(13, 15);
lineChartWithDomainNotedCTX.lineTo(13, 25);
lineChartWithDomainNotedCTX.lineWidth = 1;
lineChartWithDomainNotedCTX.moveTo(87, 15);
lineChartWithDomainNotedCTX.lineTo(87, 25);
lineChartWithDomainNotedCTX.stroke();
lineChartWithDomainNotedCTX.beginPath();
lineChartWithDomainNotedCTX.lineWidth = 2;
lineChartWithDomainNotedCTX.moveTo(13, 20);
lineChartWithDomainNotedCTX.lineTo(87, 20);
lineChartWithDomainNotedCTX.stroke();
lineChartWithDomainNotedCTX.fillText("a", 15, 30);
lineChartWithDomainNotedCTX.fillText("b", 80, 30);
lineChartWithDomainNotedCTX.fillText("D", 46, 15);