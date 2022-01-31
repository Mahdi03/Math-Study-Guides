var polarPartitionsOfThePolarPlaneSketch = document.querySelector("#polarPartitionsOfThePolarPlaneSketch");
var scaleFactor = 25;
var polarPartitionsOfThePolarPlaneSketchGraph = new Graph(polarPartitionsOfThePolarPlaneSketch, [-5 * scaleFactor, 5 * scaleFactor], [-5 * scaleFactor, 5 * scaleFactor], {
    interval: 1,
    scaleFactor: scaleFactor,
    drawAxis: true,
    xAxisTitle: "x",
    showXAxisTitle: true,
    yAxisTitle: "y",
    showYAxisTitle: true,
});
//Draw two more lines as "partitions"
polarPartitionsOfThePolarPlaneSketchGraph.addEquation((x) => { return x; });
polarPartitionsOfThePolarPlaneSketchGraph.addEquation((x) => { return -x; });
//Add each circle as a polar graph
for (var i = 1; i <= 4; i++) {
    polarPartitionsOfThePolarPlaneSketchGraph.addEquation((theta) => { return i; }, {
        type: "polar",
        thetaBounds: [0, 2 * Math.PI],
        thetaInterval: Math.PI / 240
    });
}
//Now we need to color in that single partition, we can use the equation of two circles and the scale factor to do that
var polarPartitionsOfThePolarPlaneSketchCTX = polarPartitionsOfThePolarPlaneSketchGraph.allowDrawable();
/*
//This function gives the top half equation of a circle with any radius r
function circleEquationWithRadius(r) {
    return (x) => {
        /*x^2 + y^2 = r^2
        sqrt(r^2 - x^2) = y /

        return Math.sqrt(r ** 2 - x ** 2);
    };
}
*/
/*
We know that:
var x = r * Math.cos(theta);
var y = r * Math.sin(theta);
so then if we increment theta ever so slightly and have a begining and final x, y, we can draw our lines!!
*/
//for (var x = 0; x < )
//Draw vertical lines from 3rd circle equation to 4th circle equation in cartesian plane

var cartesianX = (r, theta) => { return r * Math.cos(theta); };
var cartesianY = (r, theta) => { return r * Math.sin(theta); };

for (var theta = Math.PI / 2; theta >= Math.PI / 4; theta -= Math.PI / 400) {
    polarPartitionsOfThePolarPlaneSketchCTX.moveTo(cartesianX(3, theta) * scaleFactor, cartesianY(3, theta) * scaleFactor);
    polarPartitionsOfThePolarPlaneSketchCTX.lineTo(cartesianX(4, theta) * scaleFactor, cartesianY(4, theta) * scaleFactor);
}
polarPartitionsOfThePolarPlaneSketchCTX.stroke();