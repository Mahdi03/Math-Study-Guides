var loadingLogoHTML = `
  <style>
  .loader {
    border: 3px solid #f3f3f3; /* Light grey */
    border-top: 3px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 25px;
    height: 25px;
    animation: spin 1.4s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  <div class="loader"></div>
`;


function addImportanceToFormulas() {
    var elementQueryList = [".rules td"]; //Use CSS Selectors Here
    elementQueryList.forEach((elementQuery) => {
        var elementList = document.querySelectorAll(elementQuery);
        elementList.forEach((element) => {
            element.classList.add("important"); //This line adds a class that has predefined styles in the CSS file
        });
    });
}

function removeImportanceFromElements() {
    var elementQueryList = ["sigma td", "matrix td", ".chemicalElement td"]; //Use CSS Selectors Here
    elementQueryList.forEach((elementQuery) => {
        var elementList = document.querySelectorAll(elementQuery);
        elementList.forEach((element) => {
            element.classList.remove("important"); //This line adds a class that has predefined styles in the CSS file
        });
    });
}

function renderMath(parentElement = "") {
    //Replaced/Defined all math function 
    //Defined all Sqrt Tags

    var sqrtTags = document.querySelectorAll(parentElement + "sqrt");
    for (var e = 0; e < sqrtTags.length; e++) {
        var sqrtInput = sqrtTags[e].innerHTML;
        sqrtTags[e].innerHTML = "&radic;<span style='border-top: 0.5px solid black;'>" + sqrtInput + "</span>";
    }
    //Defined all Limit Tags
    var limTags = document.querySelectorAll(parentElement + "lim");
    for (var f = 0; f < limTags.length; f++) {
        var limAs = limTags[f].getAttribute("as");
        var limApproaches = limTags[f].getAttribute("approaches");
        limTags[f].innerHTML = "<div class='fraction'><div class='top'><var>lim</var></div><div class='bottom'><var>" + limAs + "</var>&rarr;" + limApproaches + "</div></div>";
    }
    //Defined trig tags
    var sinTags = document.querySelectorAll("sin");
    for (var j = 0; j < sinTags.length; j++) {
        var sinInput = sinTags[j].innerHTML;
        sinTags[j].innerHTML = "sin(<var>" + sinInput + "</var>)";
    }
    var cosTags = document.querySelectorAll(parentElement + "cos");
    for (var k = 0; k < cosTags.length; k++) {
        var cosInput = cosTags[k].innerHTML;
        cosTags[k].innerHTML = "cos(<var>" + cosInput + "</var>)";
    }
    var tanTags = document.querySelectorAll(parentElement + "tan");
    for (var l = 0; l < tanTags.length; l++) {
        var tanInput = tanTags[l].innerHTML;
        tanTags[l].innerHTML = "tan(<var>" + tanInput + "</var>)";
    }
    var cscTags = document.querySelectorAll(parentElement + "csc");
    for (var m = 0; m < cscTags.length; m++) {
        var cscInput = cscTags[m].innerHTML;
        cscTags[m].innerHTML = "csc(<var>" + cscInput + "</var>)";
    }
    var secTags = document.querySelectorAll(parentElement + "sec");
    for (var n = 0; n < secTags.length; n++) {
        var secInput = secTags[n].innerHTML;
        secTags[n].innerHTML = "sec(<var>" + secInput + "</var>)";
    }
    var cotTags = document.querySelectorAll(parentElement + "cot");
    for (var o = 0; o < cotTags.length; o++) {
        var cotInput = cotTags[o].innerHTML;
        cotTags[o].innerHTML = "cot(<var>" + cotInput + "</var>)";
    }
    //Defined log tag and ln tag
    var logTags = document.querySelectorAll(parentElement + "log");
    for (var p = 0; p < logTags.length; p++) {
        var logInput = logTags[p].innerHTML;
        if (logTags[p].getAttribute("base") !== null) {
            var base = logTags[p].getAttribute("base");
            logTags[p].innerHTML = "log<sub>" + base + "</sub>(<var>" + logInput + "</var>)";
        } else {
            logTags[p].innerHTML = "log(<var>" + logInput + "</var>)";
        }
    }
    var lnTags = document.querySelectorAll(parentElement + "ln");
    for (var q = 0; q < lnTags.length; q++) {
        var lnInput = lnTags[q].innerHTML;
        lnTags[q].innerHTML = "ln(<var>" + lnInput + "</var>)";
    }
    //Defined Derivative Tags (Will need to be changed further as we learn new concepts)
    //<nDeriv of="f" respectTo="t"></nDeriv> === df/dt
    var derivativeTags = document.querySelectorAll(parentElement + "derivative");
    for (var r = 0; r < derivativeTags.length; r++) {
        var derivativeOf = derivativeTags[r].getAttribute("of") ? derivativeTags[r].getAttribute("of") : "";
        var derivativeRespectTo = derivativeTags[r].getAttribute("respectTo") ? derivativeTags[r].getAttribute("respectTo") : "x";
        var derivativeOrder = derivativeTags[r].getAttribute("order") ? "<sup>" + derivativeTags[r].getAttribute("order") + "</sup>" : "";
        derivativeTags[r].innerHTML = "<div class='fraction'><div class='top'>d" + derivativeOrder + "<var>" + derivativeOf + "</var></div><div class='bottom'>d<var>" + derivativeRespectTo + "</var>" + derivativeOrder + "</div></div>";
    }

    var pDerivativeTags = document.querySelectorAll(parentElement + "pDerivative");
    for (var s = 0; s < pDerivativeTags.length; s++) {
        var pDerivativeOf = pDerivativeTags[s].getAttribute("of") ? pDerivativeTags[s].getAttribute("of") : "";
        var pDerivativeRespectTo = pDerivativeTags[s].getAttribute("respectTo") ? pDerivativeTags[s].getAttribute("respectTo") : "x";
        var pDerivativeOrder = pDerivativeTags[s].getAttribute("order") ? "<sup>" + pDerivativeTags[s].getAttribute("order") + "</sup>" : "";
        pDerivativeTags[s].innerHTML = "<div class='fraction'><div class='top'>&part;" + pDerivativeOrder + "<var>" + pDerivativeOf + "</var></div><div class='bottom'>&part;<var>" + pDerivativeRespectTo + "</var>" + pDerivativeOrder + "</div></div>";
    }

    var integralTags = document.querySelectorAll(parentElement + "integral");
    for (var h = 0; h < integralTags.length; h++) {
        var lowerBound = integralTags[h].getAttribute("lowerBound");
        var upperBound = integralTags[h].getAttribute("upperBound");
        var respectTo = integralTags[h].getAttribute("respectTo");
        var span = document.createElement("span");
        span.innerHTML = "<var>d" + respectTo + "</var>";
        if (lowerBound !== null || upperBound !== null) {
            integralTags[h].innerHTML = "<span style='font-size: 200%; display: inline-block; transform: translateY(10px);'>&int;</span><sub style='display: inline-block; transform: translateY(12px);'>" + lowerBound + "</sub><sup style='display: inline-block; transform: translateY(-11px);'>" + upperBound + "</sup><span style='transform: translateY(50px);'>" + integralTags[h].innerHTML + "</span>";
        } else {
            integralTags[h].innerHTML = "<span style='font-size: 200%; display: inline-block; transform: translateY(10px);'>&int;</span><span style='transform: translateY(50px);'>" + integralTags[h].innerHTML + "</span>";
        }
        integralTags[h].parentNode.insertBefore(span, integralTags[h].nextSibling);
    }
    var evaluatedTags = document.querySelectorAll(parentElement + "evaluated");
    for (var t = 0; t < evaluatedTags.length; t++) {
        var from = evaluatedTags[t].getAttribute("from");
        var to = evaluatedTags[t].getAttribute("to") == null ? "" : evaluatedTags[t].getAttribute("to");
        evaluatedTags[t].innerHTML = "<table style='display: inline-table; border-left: 2px solid black; padding:0; border-collapse: collapse; transform: translate(0, -5px);'><tr><td style='transform: translate(0, -10px);'>" + to + "</td></tr><tr><td style='transform: translate(0, 10px)'>" + from + "</td></tr></table>";
    }

    //Defined matrix tag
    //<matrix dimensionX="3" dimensionY="3" values="1, 2, 3, 4, 5, 6, 7, 8, 9"></matrix>
    var matrixTags = document.querySelectorAll(parentElement + "matrix");
    for (var u = 0; u < matrixTags.length; u++) {
        var dimensionX = parseInt(matrixTags[u].getAttribute("dimensionX"));
        var dimensionY = parseInt(matrixTags[u].getAttribute("dimensionY"));
        var values = matrixTags[u].getAttribute("values").split(", ");
        //var values = matrixTags[u].innerHTML.split(", ");
        if (values.length !== dimensionX * dimensionY) {
            console.log(values);
            matrixTags[u].innerHTML = "Could not display matrix, Dimension Error";
        } else {
            var table = document.createElement("table");
            table.classList.add("matrix");
            for (var row = 0; row < dimensionY; row++) {
                var tr = document.createElement("tr");
                for (var col = 0; col < dimensionX; col++) {
                    var td = document.createElement("td");
                    td.innerHTML = values[row * dimensionX + col];
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            matrixTags[u].appendChild(table);
        }
    }
    //Defined vector tag
    var vectorTags = document.querySelectorAll(parentElement + "vector");
    for (var i = 0; i < vectorTags.length; i++) {
        var vectorName = vectorTags[i].innerHTML;
        vectorTags[i].innerHTML = '<div class="outer"><div class="inner"><var>&rarr;</var></div><div class="inner"><var>' + vectorName + '</var></div></div>';
    }
    //Added Sigma tags
    var sigmaTags = document.querySelectorAll(parentElement + "sigma");
    for (var r = 0; r < sigmaTags.length; r++) {
        var startValue = sigmaTags[r].getAttribute("start");
        var endValue = sigmaTags[r].getAttribute("end");
        sigmaTags[r].innerHTML = "<table class='sigmaTag' style='display: inline-table; transform: translateY(-30%);'><tr><td>" + endValue + "</td></tr><tr><td>&Sigma;</td></tr><tr><td>" + startValue + "</td></tr></table>";
    }
    var renderJS = document.querySelectorAll("script.renderJS");
    renderJS.forEach((script) => {
        eval(script.innerHTML);
    });



    //Room for science stuff
    var elementTags = document.querySelectorAll(parentElement + "element");
    if (elementTags.length > 0) {
        //If there is no periodic table saved in local storage
        if (!localStorage.getItem("periodicTable")) {
            var makeRequest = function(url, httpMethod) {
                //Load the file
                var fileRequest = new XMLHttpRequest();
                return new Promise((resolve, reject) => {
                    /*fileRequest.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            resolve(fileRequest);
                        } else {
                            reject({
                                status: fileRequest.status,
                                statusText: fileRequest.statusText
                            });
                        }
                    }*/
                    fileRequest.onload = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            resolve(fileRequest);
                        } else {
                            reject(fileRequest);
                        }
                    }
                    fileRequest.open(httpMethod || "GET", url, true);
                    fileRequest.send();

                });
            }
            makeRequest("../periodicTableOfElements.json", "GET").then((xhr) => {
                //Set the data to localStorage for next time usage
                localStorage.setItem("periodicTable", xhr.responseText);
                console.log("{");
                for (prop in xhr) {
                    console.log(`${prop}: ${xhr[prop]}`);
                }
                console.log("}");

                console.log("Success");
                renderScience(parentElement);
            }).catch((error) => {
                console.log("{");
                for (prop in error) {
                    console.log(`${prop}: ${error[prop]}`);
                }
                console.log("}");
                console.log(error);
                alert("Sorry but elements cannot be shown at this time");
            });
        } else {
            //Already stored in localStorage, carry on
            renderScience(parentElement);
        }
    }



}
/*
Periodic Table Data Found At https://github.com/andrejewski/periodic-table/blob/master/data.json

Code below to remove unnecessary information to save space and loading time
var oldListOfElements = [];
var newListOfElements = oldListOfElements.map(
function (oldElement) {
var newElement = oldElement;
delete newElement.cpkHexColor;
delete newElement.standardState;
delete newElement.meltingPoint;
delete newElement.standardState;
delete newElement.boilingPoint;
delete newElement.density;
delete newElement.ionRadius;
delete newElement.atomicRadius;
delete newElement.bondingType;
delete newElement.yearDiscovered;
delete newElement.vanDelWaalsRadius;
delete newElement.electronAffinity;
newElement.atomicMass = (newElement.symbol == "H") ? Number(parseFloat(String(oldElement.atomicMass).replace("[", "").replace("]", "")).toFixed(3)) : Number(parseFloat(String(oldElement.atomicMass).replace("[", "").replace("]", "")).toFixed(2)) //If Hydrogen, round to 3 decimal places, else round to 2
newElement.oxidationStates = (String(oldElement.oxidationStates) != "") ? String(oldElement.oxidationStates).split(", ").map((el) => parseInt(el)) : null; //Convert the oxidation states list to an array from a CSV string if it is not empty
newElement.electronicConfiguration = (oldElement.electronicConfiguration != "") ? oldElement.electronicConfiguration.split(" ").map((el) => { return el.replace(/(?<=[a-z])(\d{1,2})/gi, "<sup>$1</sup>")}).join(" ") : ""; //If it is not empty, take the electron configuration and make all the last numbers into powers, else leave it empty
return newElement;
}
);*/

function renderScience(parentElement = "") {
    //Defined elementTag
    var elementTags = document.querySelectorAll(parentElement + "element");

    //<element name="F" atomicNumber massNumber electronConfiguration charge="2&minus;" oxidationNumber="+1" number="2"></element>
    var periodicTable = JSON.parse(localStorage.getItem("periodicTable"));
    //console.log(periodicTable);
    var listOfPeriodicElements = periodicTable.map((el) => { return el.symbol; });
    //console.log(listOfPeriodicElements);

    function getPeriodicElementByName(name) {
        //Quickest way to search through 118 elements for element
        /*
        Search through array of listOfPeriodicElements for index
        and use the same index on other array, that way I am not
        searching through the entire array of objects
        */
        var index = listOfPeriodicElements.indexOf(name);
        return (index > -1) ? periodicTable[index] : null; //If not found in index then just return a null value
    }
    elementTags.forEach((elementTag) => {
        var name = elementTag.getAttribute("name");
        var elementInQuestion = (name == "&alpha;") ? getPeriodicElementByName("He") : getPeriodicElementByName(name); //If alpha particle, use Helium properties, else use element properties
        var electronicConfiguration = elementTag.getAttribute("electronConfiguration");
        var massNumber = elementTag.getAttribute("massNumber");
        var atomicNumber = elementTag.getAttribute("atomicNumber");
        var number = elementTag.getAttribute("number");
        var charge = elementTag.getAttribute("charge");
        var oxidationNumber = elementTag.getAttribute("oxidationNumber");

        var elementTaginnerHTML = "";
        if (electronicConfiguration !== null) {
            if (electronicConfiguration == "") {
                elementTaginnerHTML = elementInQuestion.electronicConfiguration;
            } else {
                elementTaginnerHTML = electronicConfiguration;
            }
        } else {
            var massNumberText = () => {
                //If massNumber is not requested, leave it blank
                if (massNumber == null) {
                    return "";
                }
                //If massnumber is requested but not provided, use the dictionary one
                else if (massNumber == "") {
                    return (elementInQuestion.atomicMass).toFixed(0);
                }
                /*
                If massNumber is neither of the above, it must be provided
                so just use the provided value
                */
                else {
                    return massNumber;
                }
            };
            var chargeOrOxidationNumberText = () => {
                //Choose between whether to show charge, oxidation number, or neither
                if (charge == null || charge == "" || charge == undefined) {
                    return ""; //Do nothing
                }
                //If neither is true, charge must be a value
                else if (charge !== null && charge !== "" && charge !== undefined) {
                    return charge;
                }
                //If charge is not provided, oxidation number might be
                else if (oxidationNumber == null || oxidationNumber == "" || oxidationNumber == undefined) {
                    return ""; //Do nothing
                }
                //If neither is true, oxidation is provided
                else if (oxidationNumber !== null && oxidationNumber !== "" && oxidationNumber !== undefined) {
                    return oxidationNumber;
                }
                //If nothing is provided, leave this box empty
                else {
                    return "";
                }
            };
            var atomicNumberText = () => {
                //If atomicNumber is not requested, leave it blank
                if (atomicNumber == null) {
                    return "";
                }
                //If atomicnumber is requested but not provided, use the dictionary one
                else if (atomicNumber == "") {
                    return elementInQuestion.atomicNumber;
                }
                /*
                If atomicNumber is neither of the above, it must be provided
                so just use the provided value
                */
                else {
                    return atomicNumber;
                }
            };
            var numericAmountText = () => {
                //If number is not requested, or not provided with a value, leave it blank
                if (number == null || number == "") {
                    return "";
                }
                /*
                If number is neither of the above, it must be provided
                so just use the provided value
                */
                else {
                    return number;
                }
            };
            elementTaginnerHTML = `<table class="chemicalElement">
                <!--Upper Row-->
                <tr>
                <td style='text-align: right;'>${massNumberText()}</td><td rowspan="2">${/*Name will always be provided*/name}</td><td style='text-align: left;'>${chargeOrOxidationNumberText()}</td>
                </tr>
                <!--Lower Row-->
                <tr>
                <td style='text-align: right;'>${atomicNumberText()}</td><!--Blank Space--><td style='text-align: left;'>${numericAmountText()}</td>
                </tr>
                </table>`;
        }
        elementTag.innerHTML = elementTaginnerHTML;
    });
}

function toggleDiv(id) {
    var element = document.querySelector(id);
    if (element.style.display === "block") {
        element.style.display = "none";
        document.querySelector(id + "ToggleButton").innerHTML = "&plus;";
    } else {
        element.style.display = "block";
        document.querySelector(id + "ToggleButton").innerHTML = "&minus;";
    }
}

function toggleSolution(id, proof) {
    var element = document.querySelector(id);
    if (element.style.display === "block") {
        element.style.display = "none";
        document.querySelector(id + "ToggleLink").innerHTML = proof == true ? "Show Proof" : "Show Solution";
    } else {
        element.style.display = "block";
        document.querySelector(id + "ToggleLink").innerHTML = proof == true ? "Hide Proof" : "Hide Solution";
    }
}

function drawArrow(context, fromx, fromy, tox, toy, extraArgs) {
    //variables to be used when creating the arrow
    var headlen = 10;
    var angle = Math.atan2(toy - fromy, tox - fromx);
    //starting path of the arrow from the start square to the end square and drawing the stroke
    if (extraArgs !== undefined) {
        if (extraArgs.lineDash !== undefined) {
            context.setLineDash(extraArgs.lineDash);
        }
    }
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.stroke();
    context.setLineDash([]);
    //starting a new path from the head of the arrow to one of the sides of the point
    context.beginPath();
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
    //path from the side point of the arrow, to the other side point
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));
    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
    //draws the paths created above
    context.stroke();
    context.fill();
}


/*
The below function is stolen directly from https://stackoverflow.com/questions/11217374/html5-render-simple-electrical-circuits
And modified for personal use

- This class draws circuits in the conventional method of current, positive to negative
All the methods return the CircuitDiagram object itself, allowing for event chaining
*/

class CircuitDiagram {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.initialX = 0;
        this.initialY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.d = 0;
        this.dx = 0;
        this.dy = 0;
    }
    drawWire(length) {
        this.currentX += this.dx * length;
        this.currentY += this.dy * length;
        this.ctx.lineTo(this.currentX, this.currentY);
        //Not sure if the following line is really necessary or not
        //this.ctx.moveTo(this.currentX, this.currentY);

        return this;
    }
    beginCircuit(a, b) {
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle = "#000";
        this.ctx.beginPath();

        this.currentX = a;
        this.currentY = b;
        this.d = 0;
        this.dx = 1;
        this.dy = 0;
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.ctx.moveTo(this.currentX, this.currentY);

        return this;
    }
    endCircuit() {
        this.ctx.lineTo(this.initialX, this.initialY);
        this.ctx.stroke();
        return undefined;
    }
    drawSwitch() {
        //Make triangle at angle then move cursor back to original spot on circuit
        //Start at 45deg from current pos
        //(currentX, currentY) = starting pos --> translate 15 dy and dx,
        //Get angle of movement direction then add 45deg for angle of switch logo 
        var angle = Math.atan2(this.dy, this.dx) + Math.PI / 4;
        //Magnitude is just to use the Fsin(@) notation, it's still ensuring 15px dx and dy
        var magnitude = Math.pow(Math.pow(15, 2) + Math.pow(15, 2), 1 / 2);
        this.ctx.lineTo(this.currentX + magnitude * Math.cos(angle), this.currentY - magnitude * Math.sin(angle));
        //console.log(`dx: ${this.dx}\ndy: ${this.dy}\nMagnitude: ${magnitude}\nangle: ${angle}\nDX: ${magnitude * Math.cos(angle)}\nDY: ${magnitude * Math.sin(angle)}`);
        this.currentX += this.dx * 15;
        this.currentY += this.dy * 15;
        this.ctx.moveTo(this.currentX, this.currentY);

        return this;
    }
    drawLight() {
        return this;
    }
    drawBattery() {
        //var n = 1;
        //this.drawWire(10);
        //Don't forget to add positive and negative labels on the battery (long end is positive and short-end is negative)
        this.ctx.moveTo(this.currentX + 5 * this.dy, this.currentY + 5 * this.dx);
        this.ctx.lineTo(this.currentX - 5 * this.dy, this.currentY - 5 * this.dx);
        this.currentX += this.dx * 5;
        this.currentY += this.dy * 5;
        this.ctx.moveTo(this.currentX + 15 * this.dy, this.currentY + 15 * this.dx);
        this.ctx.lineTo(this.currentX - 15 * this.dy, this.currentY - 15 * this.dx);

        this.ctx.moveTo(this.currentX, this.currentY);
        //this.drawWire(10);

        return this;
    }
    drawCapacitor() {
        this.ctx.moveTo(this.currentX + 7 * this.dy, this.currentY + 7 * this.dx);
        this.ctx.lineTo(this.currentX - 7 * this.dy, this.currentY - 7 * this.dx);
        this.currentX += this.dx * 5;
        this.currentY += this.dy * 5;
        this.ctx.moveTo(this.currentX + 7 * this.dy, this.currentY + 7 * this.dx);
        this.ctx.lineTo(this.currentX - 7 * this.dy, this.currentY - 7 * this.dx);
        this.ctx.moveTo(this.currentX, this.currentY);

        return this;
    }
    drawResistor() {
            var n = 5;
            this.currentX += this.dx * 5;
            this.currentY += this.dy * 5;
            while (n--) {
                this.ctx.lineTo(this.currentX - 5 * this.dy, this.currentY - 5 * this.dx);
                this.ctx.lineTo(this.currentX + 5 * this.dy, this.currentY + 5 * this.dx);
                this.currentX += 5 * this.dx;
                this.currentY += 5 * this.dy;
            }
            this.ctx.lineTo(this.currentX, this.currentY);

            return this;
        }
        /*
        drawLight() {
            var n, xs, ys;
            this.drawWire(9);
            n = 2;
            xs = 1 + Math.abs(this.dy);
            ys = 1 + Math.abs(this.dx);
            this.currentX += this.dx * 6;
            this.currentY += this.dy * 6;
            this.ctx.scale(xs, ys);
            while (n--) {
                this.ctx.moveTo(this.currentX / xs + 5 * Math.abs(this.dx), this.currentY / ys + 5 * this.dy);
                this.ctx.arc(this.currentX / xs, this.currentY / ys, 5, Math.PI / 2 * this.dy, Math.PI + Math.PI / 2 * this.dy, 1);
                this.currentX += 6.5 * this.dx;
                this.currentY += 6.5 * this.dy;
                if (n != 0) {
                    if (this.dx >= 0) {
                        this.ctx.moveTo(this.currentX / xs - 5 * this.dx, this.currentY / ys - 5 * this.dy);
                    }

                    this.ctx.moveTo(this.dy / xs - 5 * this.dx, this.currentY / ys - 5 * this.dy);
                    this.ctx.arc(this.dy / xs - 6.5 / 2 * this.dx, this.currentY / ys - 6.5 / 2 * this.dy, 1.5, Math.PI + Math.PI / 2 * this.dy, Math.PI / 2 * this.dy, 1);
                }
            }
            this.ctx.moveTo(this.dy / xs - 1.75 * this.dx, this.currentY / ys - 1.75 * this.dy);
            this.ctx.scale(1 / xs, 1 / ys);
            this.ctx.lineTo(this.currentX, this.currentY);
            this.drawWire(9);

        }*/
    turnRight() {
        this.d++;
        this.dx = Math.round(Math.cos(Math.PI / 2 * this.d));
        this.dy = Math.round(Math.sin(Math.PI / 2 * this.d));

        return this;
    }
    turnLeft() {
        this.d--;
        this.dx = Math.round(Math.cos(Math.PI / 2 * this.d));
        this.dy = Math.round(Math.sin(Math.PI / 2 * this.d));

        return this;
    }
}
/*
function drawAnElectricalCircuit() {
    var canvasHTML = document.getElementById("canvas");
    var ctx = canvasHTML.getContext("2d");
    var ix;
    var iy;
    var x;
    var y;
    var d;
    var dx;
    var dy;


    function beginCircuit(a, b) {
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        x = a;
        y = b;
        d = 0;
        dx = 1;
        dy = 0;
        ix = x;
        iy = y;
        ctx.moveTo(x, y);
        drawWire(50);
        drawPower();
    }

    function endCircuit() {
        ctx.lineTo(ix, iy);
        ctx.stroke();
    }

    function drawWire(l) {
        x += dx * l;
        y += dy * l;
        ctx.lineTo(x, y);
    }

    function drawPower() {
        var n;
        drawWire(10);
        n = 3;
        ctx.moveTo(x + 10 * dy, y + 10 * dx);
        ctx.lineTo(x - 10 * dy, y - 10 * dx);
        x += dx * 5;
        y += dy * 5;
        while (n--) {
            ctx.moveTo(x + 15 * dy, y + 15 * dx);
            ctx.lineTo(x - 15 * dy, y - 15 * dx);
            x += dx * 5;
            y += dy * 5;
            ctx.moveTo(x + 10 * dy, y + 10 * dx);
            ctx.lineTo(x - 10 * dy, y - 10 * dx);
            if (n != 0) {
                x += dx * 5;
                y += dy * 5;
            }
        }
        ctx.moveTo(x, y);
        drawWire(10);
    }

    function drawCapacitor() {
        drawWire(22.5);
        ctx.moveTo(x + 10 * dy, y + 10 * dx);
        ctx.lineTo(x - 10 * dy, y - 10 * dx);
        x += dx * 5;
        y += dy * 5;
        ctx.moveTo(x + 10 * dy, y + 10 * dx);
        ctx.lineTo(x - 10 * dy, y - 10 * dx);
        ctx.moveTo(x, y);
        drawWire(22.5);
    }

    function drawInductor() {
        var n, xs, ys;
        drawWire(9);
        n = 4;
        xs = 1 + Math.abs(dy);
        ys = 1 + Math.abs(dx);
        x += dx * 6;
        y += dy * 6;
        ctx.scale(xs, ys);
        while (n--) {
            ctx.moveTo(x / xs + 5 * Math.abs(dx), y / ys + 5 * dy);
            ctx.arc(x / xs, y / ys, 5, Math.PI / 2 * dy, Math.PI + Math.PI / 2 * dy, 1);
            x += 6.5 * dx;
            y += 6.5 * dy;
            if (n != 0) {
                if (dx >= 0) {
                    ctx.moveTo(x / xs - 5 * dx, y / ys - 5 * dy);
                }

                ctx.moveTo(x / xs - 5 * dx, y / ys - 5 * dy);
                ctx.arc(x / xs - 6.5 / 2 * dx, y / ys - 6.5 / 2 * dy, 1.5, Math.PI + Math.PI / 2 * dy, Math.PI / 2 * dy, 1);
            }
        }
        ctx.moveTo(x / xs - 1.75 * dx, y / ys - 1.75 * dy);
        ctx.scale(1 / xs, 1 / ys);
        ctx.lineTo(x, y);
        drawWire(9);
    }

    function drawTrimmer() {
        ctx.moveTo(x + 35 * dx - 7 * dy, y + 35 * dy - 7 * dx);
        ctx.lineTo(x + 15 * dx + 7 * dy, y + 15 * dy + 7 * dx);
        ctx.moveTo(x + 13 * dx + 4 * dy, y + 13 * dy + 4 * dx);
        ctx.lineTo(x + 17 * dx + 10 * dy, y + 17 * dy + 10 * dx);
        ctx.moveTo(x, y);
        drawCapacitor();
    }

    function drawResistor() {
        var n;
        drawWire(10);
        n = 5;
        x += dx * 5;
        y += dy * 5;
        while (n--) {
            ctx.lineTo(x - 5 * dy, y - 5 * dx);
            ctx.lineTo(x + 5 * dy, y + 5 * dx);
            x += 5 * dx;
            y += 5 * dy;
        }
        ctx.lineTo(x, y);
        drawWire(10);
    }

    function turnClockwise() {
        d++;
        dx = Math.cos(1.570796 * d);
        dy = Math.sin(1.570796 * d);
    }

    function turnCounterClockwise() {
        d--;
        dx = Math.cos(1.570796 * d);
        dy = Math.sin(1.570796 * d);
    }
}
*/

/* Extra Programmer Tools */

//For testing purposes to get exact coordinates
function addCanvasPosition(canvas) {
    var p = document.createElement("p");
    p.setAttribute("id", "canvasPos");
    canvas.insertAdjacentElement("afterend", p);
    //var canvasPos = document.querySelector("#canvasPos");
    canvas.addEventListener("mousemove", (event) => {
        var canvasPos = document.querySelector("#canvasPos");
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        canvasPos.innerHTML = `Pos: ${x}, ${y}`;
    });
}