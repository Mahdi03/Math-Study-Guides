var polarPieSliceSectorDiagram = document.querySelector("#polarPieSliceSectorDiagram");
var scaleFactor = 25;
var polarPieSliceSectorDiagramGraph = new Graph(polarPieSliceSectorDiagram, [0, 2.6 * scaleFactor], [0, 5 * scaleFactor], {
    interval: 1,
    scaleFactor: scaleFactor,
    drawAxis: false
});

//Add each circle as a polar graph
for (var i = 1; i <= 4; i++) {
    polarPieSliceSectorDiagramGraph.addEquation((theta) => { return i; }, {
        type: "polar",
        thetaBounds: [Math.PI / 4, Math.PI / 2],
        thetaInterval: Math.PI / 440
    });
}
//Now we need to color in that single partition, we can use the equation of two circles and the scale factor to do that
var polarPieSliceSectorDiagramCTX = polarPieSliceSectorDiagramGraph.allowDrawable();
//Draw two more lines as "partitions"
//polarPieSliceSectorDiagramGraph.addEquation((x) => { return x; });
var cartesianX = (r, theta) => { return r * Math.cos(theta); };
var cartesianY = (r, theta) => { return r * Math.sin(theta); };
with(polarPieSliceSectorDiagramCTX) {
    //Draw side borderlines
    moveTo(0, 0);
    lineTo(0, 4 * scaleFactor);
    moveTo(0, 0);
    lineTo(cartesianX(4, Math.PI / 4) * scaleFactor, cartesianY(4, Math.PI / 4) * scaleFactor);
    //Fill in sector crust
    for (var theta = Math.PI / 2; theta >= Math.PI / 4; theta -= Math.PI / 400) {
        moveTo(cartesianX(3, theta) * scaleFactor, cartesianY(3, theta) * scaleFactor);
        lineTo(cartesianX(4, theta) * scaleFactor, cartesianY(4, theta) * scaleFactor);
    }
    stroke();
    //Add labels
    polarPieSliceSectorDiagramCTX = polarPieSliceSectorDiagramGraph.allowDrawable("revert");
    fillText("r\u0394\u03B8", 40, 38);
    fillText("\u0394\u03B8", 15, 110);
    fillText("\u0394r", 72, 80);
    fillText("r", 0, 85);

}