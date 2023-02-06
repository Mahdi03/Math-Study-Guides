var rectangularPrismInSphericalCoordinates = document.querySelector("#rectangularPrismInSphericalCoordinates");
var rectangularPrismInSphericalCoordinatesCTX = rectangularPrismInSphericalCoordinates.getContext("2d");
oversampleCanvas(rectangularPrismInSphericalCoordinates, rectangularPrismInSphericalCoordinatesCTX, 4);


rectangularPrismInSphericalCoordinatesCTX.font = "10px Arial";
rectangularPrismInSphericalCoordinatesCTX.strokeStyle = "black";
rectangularPrismInSphericalCoordinatesCTX.fillStyle = "black"; //Required to make the tip of the arrow the same color
drawArrow(rectangularPrismInSphericalCoordinatesCTX, 140, 170, 140, 0);
rectangularPrismInSphericalCoordinatesCTX.fillText("\u03C1", 130, 20);
drawArrow(rectangularPrismInSphericalCoordinatesCTX, 140, 170, 310, 170);
rectangularPrismInSphericalCoordinatesCTX.fillText("\u03C6", 310, 180);
drawArrow(rectangularPrismInSphericalCoordinatesCTX, 140, 170, 0, 270);
rectangularPrismInSphericalCoordinatesCTX.fillText("\u03B8", 8, 255);
/*
3 - l, 3 - w, 3 - h
A(0, 270)
Center(140, 170);
*/

var m = (270 - 170) / (0 - 140);
var angle = Math.atan(m);

var centerX = 90,
    centerY = 202;
var l = 140,
    w = 75,
    h = 40;

rectangularPrismInSphericalCoordinatesCTX.beginPath();
rectangularPrismInSphericalCoordinatesCTX.moveTo(centerX - w / 2, centerY - h / 2);
rectangularPrismInSphericalCoordinatesCTX.lineTo(centerX - w / 2, centerY + h / 2);
rectangularPrismInSphericalCoordinatesCTX.lineTo(centerX + w / 2, centerY + h / 2);
rectangularPrismInSphericalCoordinatesCTX.lineTo(centerX + w / 2, centerY - h / 2);
rectangularPrismInSphericalCoordinatesCTX.closePath();
rectangularPrismInSphericalCoordinatesCTX.stroke();

rectangularPrismInSphericalCoordinatesCTX.beginPath();
rectangularPrismInSphericalCoordinatesCTX.moveTo(centerX - w / 2, centerY - h / 2);
rectangularPrismInSphericalCoordinatesCTX.lineTo((centerX - w / 2) + l * Math.cos(angle), (centerY - h / 2) + l * Math.sin(angle));
rectangularPrismInSphericalCoordinatesCTX.moveTo(centerX + w / 2, centerY - h / 2);
rectangularPrismInSphericalCoordinatesCTX.lineTo((centerX + w / 2) + l * Math.cos(angle), (centerY - h / 2) + l * Math.sin(angle));
rectangularPrismInSphericalCoordinatesCTX.moveTo(centerX + w / 2, centerY + h / 2);
rectangularPrismInSphericalCoordinatesCTX.lineTo((centerX + w / 2) + l * Math.cos(angle), (centerY + h / 2) + l * Math.sin(angle));

rectangularPrismInSphericalCoordinatesCTX.moveTo((centerX - w / 2) + l * Math.cos(angle), (centerY - h / 2) + l * Math.sin(angle));
rectangularPrismInSphericalCoordinatesCTX.lineTo((centerX + w / 2) + l * Math.cos(angle), (centerY - h / 2) + l * Math.sin(angle));
rectangularPrismInSphericalCoordinatesCTX.lineTo((centerX + w / 2) + l * Math.cos(angle), (centerY + h / 2) + l * Math.sin(angle));

rectangularPrismInSphericalCoordinatesCTX.stroke();