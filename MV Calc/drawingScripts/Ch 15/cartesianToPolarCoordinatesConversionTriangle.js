var cartesianToPolarCoordinatesConversionTriangle = document.querySelector("#cartesianToPolarCoordinatesConversionTriangle");
var cartesianToPolarCoordinatesConversionTriangleCTX = cartesianToPolarCoordinatesConversionTriangle.getContext("2d");
oversampleCanvas(cartesianToPolarCoordinatesConversionTriangle, cartesianToPolarCoordinatesConversionTriangleCTX, 4);
cartesianToPolarCoordinatesConversionTriangleCTX.beginPath();
cartesianToPolarCoordinatesConversionTriangleCTX.moveTo(20, 100);
cartesianToPolarCoordinatesConversionTriangleCTX.lineTo(155, 25);
cartesianToPolarCoordinatesConversionTriangleCTX.lineTo(155, 100); //Corner point
cartesianToPolarCoordinatesConversionTriangleCTX.lineTo(20, 100); //or closePath
cartesianToPolarCoordinatesConversionTriangleCTX.stroke();
//Right angle symbol
cartesianToPolarCoordinatesConversionTriangleCTX.beginPath();
cartesianToPolarCoordinatesConversionTriangleCTX.moveTo(155, 100 - 10);
cartesianToPolarCoordinatesConversionTriangleCTX.lineTo(155 - 10, 100 - 10);
cartesianToPolarCoordinatesConversionTriangleCTX.lineTo(155 - 10, 100);
cartesianToPolarCoordinatesConversionTriangleCTX.stroke();

cartesianToPolarCoordinatesConversionTriangleCTX.fillText("\u03B8", 35, 98.5);
cartesianToPolarCoordinatesConversionTriangleCTX.fillText("r", 75, 60);
cartesianToPolarCoordinatesConversionTriangleCTX.fillText("y", 156, 65);
cartesianToPolarCoordinatesConversionTriangleCTX.fillText("x", 83, 107);