var rectangularPartitionsOfThePolarPlaneSketch = document.querySelector("#rectangularPartitionsOfThePolarPlaneSketch");
var rectangularPartitionsOfThePolarPlaneSketchCTX = rectangularPartitionsOfThePolarPlaneSketch.getContext("2d");
oversampleCanvas(rectangularPartitionsOfThePolarPlaneSketch, rectangularPartitionsOfThePolarPlaneSketchCTX, 4);
rectangularPartitionsOfThePolarPlaneSketchCTX.font = "10px Arial";
rectangularPartitionsOfThePolarPlaneSketchCTX.strokeStyle = "black";
rectangularPartitionsOfThePolarPlaneSketchCTX.fillStyle = "black"; //Required to make the tip of the arrow the same color
drawArrow(rectangularPartitionsOfThePolarPlaneSketchCTX, 10, 200, 10, 0);
rectangularPartitionsOfThePolarPlaneSketchCTX.fillText("r", 0, 10);
drawArrow(rectangularPartitionsOfThePolarPlaneSketchCTX, 10, 200, 210, 200);
rectangularPartitionsOfThePolarPlaneSketchCTX.fillText("\u03B8", 210, 210);

rectangularPartitionsOfThePolarPlaneSketchCTX.beginPath();
var beginX = 10,
    endX = 200;
var beginY = 200,
    endY = 10; // Remember that in canvas, y is opposite
//Divide x [0, 2pi] 8 partitions

for (var i = 1; i <= 8; i++) {
    with(rectangularPartitionsOfThePolarPlaneSketchCTX) {
        moveTo(beginX + (endX - beginX) * i / 8, beginY);
        lineTo(beginX + (endX - beginX) * i / 8, endY);
    }
}
//Divide y [0, 4] 4 partitions
for (var j = 1; j <= 4; j++) {
    with(rectangularPartitionsOfThePolarPlaneSketchCTX) {
        moveTo(beginX, beginY + (endY - beginY) * j / 4);
        lineTo(endX, beginY + (endY - beginY) * j / 4);
    }
}
rectangularPartitionsOfThePolarPlaneSketchCTX.stroke();

//Fill in a certain partition
rectangularPartitionsOfThePolarPlaneSketchCTX.beginPath();
rectangularPartitionsOfThePolarPlaneSketchCTX.moveTo(beginX + (endX - beginX) * 3 / 8, beginY + (endY - beginY) * 2 / 4);
rectangularPartitionsOfThePolarPlaneSketchCTX.rect(beginX + (endX - beginX) * 2 / 8, beginY + (endY - beginY) * 3 / 4, (endX - beginX) * 1 / 8, (endY - beginY) * 1 / 4);
rectangularPartitionsOfThePolarPlaneSketchCTX.fill();
//Label vertical axis
rectangularPartitionsOfThePolarPlaneSketchCTX.fillText("4", 0, 20);
rectangularPartitionsOfThePolarPlaneSketchCTX.fillText("2", 0, (beginY + endY) / 2);
rectangularPartitionsOfThePolarPlaneSketchCTX.fillText("0", beginX - 5, beginY + 7);
//Label horizontal axis
rectangularPartitionsOfThePolarPlaneSketchCTX.fillText("2\u03C0", beginX + endX - 20, beginY + 10);
rectangularPartitionsOfThePolarPlaneSketchCTX.fillText("\u03C0", (beginX + endX - 10) / 2, beginY + 10);