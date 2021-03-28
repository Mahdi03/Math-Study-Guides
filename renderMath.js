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
        this.direction = 0;
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
        this.direction = 0;
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
        this.direction++;
        this.dx = Math.round(Math.cos(Math.PI / 2 * this.direction));
        this.dy = Math.round(Math.sin(Math.PI / 2 * this.direction));

        return this;
    }
    turnLeft() {
        this.direction--;
        this.dx = Math.round(Math.cos(Math.PI / 2 * this.direction));
        this.dy = Math.round(Math.sin(Math.PI / 2 * this.direction));

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
function distanceBetweenTwoPoints(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
}

function getMinMax(arr) {
    var min = arr[0];
    var max = arr[0];
    var i = arr.length;

    while (i--) {
        min = arr[i] < min ? arr[i] : min;
        max = arr[i] > max ? arr[i] : max;
    }
    return { min, max };
}
/*
TODO:
Make it so that equations each have special tags and are stored under the overall
graph object so that they can be removed if wanted

give each equation its own properties but keep the graph scale the same

maybe animate the drawing of equations?

allow graph to be dragged around at one possible point?


Examples of usage:
<canvas id="graphCanvas"></canvas>
<script>
var graphCanvas = document.querySelector("#graphCanvas");
var graph = new Graph(graphCanvas, [-100, 100], [-100, 100], {
    padding: 10,
    interval: 0.01,
    scaleFactor: 20,
    xAxisTitle: "Volume",
    showXAxisTitle: true,
    yAxisTitle: "Pressure",
    showYAxisTitle: true
});
//Cartesian (Rectangular/regular --> f(x)) Graph
var cartesianEquation = (x) => {
    return Math.sin(3 * x * x + 4 * x - 1) / Math.cos(2 * x - 3);
};
graph.addEquation(cartesianGraph, { color: "hotpink" });
//Polar Butterfly
var butterflyWings = (theta) => {
    return 2 * (4 * 0.975 * Math.sin(2 * theta) + Math.sin(theta));
};
var butterflyBody = (theta) => {
    return Math.sqrt(
        20 / (
            Math.pow(Math.sin(theta), 2) + 50 * Math.pow(Math.cos(theta), 2)
        )
    );
};
graph.addEquation(butterflyWings, {
    type: "polar",
    thetaBounds: [0, 2 * Math.PI],
    thetaInterval: Math.PI / 240,
    color: "orange"
}).addEquation(butterflyBody, {
    type: "polar",
    thetaBounds: [0, 2 * Math.PI],
    thetaInterval: Math.PI / 24,
    color: "blue"
});
//Parametric Equation
var parametricEquation = (t) => {
    var x = Math.pow(t, 4);
    var y = Math.pow(Math.sin(t), 2);
    return [x, y];
};
graph.addEquation(parametricEquation, {
    type: "parametric",
    color: "rose",
    tBounds: [-2 * Math.PI, 2 * Math.PI],
    tInterval: 0.001
});
graph.finalizeGraph(); //Although this function does nothing now, more functionality has yet to be added
</script>
*/
class Graph {
    constructor(canvasElement, xRange, yRange, params = {
        padding: 10,
        width: 0,
        height: 0,
        /*Zoom/visibility*/
        scaleFactor: 40,
        interval: 0.1,
        //Add support for axis labels and chart labels later
        /*X-Axis*/
        xAxisTitle: "",
        showXAxisTitle: false,
        xAxisLabelInterval: 0,
        /*Y-Axis*/
        yAxisTitle: "",
        showYAxisTitle: false,
        yAxisLabelInterval: 0
    }) {

        if (!Array.isArray(xRange) || !Array.isArray(yRange)) {
            throw new Error("Your x and y ranges are not in the form of arrays, use [x1, x2], [y1, y2] for your graph");
        }

        this.xRange = xRange;
        this.yRange = yRange;
        this.params = params;
        if (!this.params.padding) {
            this.params.padding = 10;
        }
        //Override canvas width and height values with correct range values for later scaling
        this.params.width = this.xRange[1] - this.xRange[0] + 2 * this.params.padding;
        this.params.height = this.yRange[1] - this.yRange[0] + 2 * this.params.padding;

        this.canvasElement = canvasElement;
        this.ctx = this.canvasElement.getContext("2d");
        var iterationsPerGraph = (this.xRange[1] - this.xRange[0]) / this.params.scaleFactor / this.params.interval;
        if (iterationsPerGraph > 500000) {
            var newInterval = (this.xRange[1] - this.xRange[0]) / this.params.scaleFactor / 500000;
            console.warn("Your combination of xRange, scaleFactor, and interval needs to be modified, with the current settings there will be too many iterations and it will slow down the browser. The iteration has already been set to " + String(newInterval) + ". Next time, decrease your xRange, increase the scaleFactor, or increase the interval.");
            this.params.interval = newInterval;
        }
        //console.log(iterationsPerGraph);
        this.prepareCanvas();
        this.drawAxis();
    }
    prepareCanvas(dimensions = [this.params.width, this.params.height]) {
        this.canvasElement.width = dimensions[0];
        this.canvasElement.height = dimensions[1];
        /*
        https://stackoverflow.com/questions/42844470/how-to-rotate-and-mirror-canvas-element
        setTransform(xScale, ySkew, xSkew, yScale, originX, originY)
        */
        //this.ctx.scale(2, 2);
        this.ctx.setTransform(1, 0, 0, -1, 0 - this.xRange[0] + this.params.padding, dimensions[1] + this.yRange[0] - this.params.padding);

    }
    drawAxis() {
        this.ctx.moveTo(0, 0);
        //this.ctx.arc(0, 0, 5, 0, Math.PI * 2, false);
        //this.ctx.stroke();
        //this.ctx.strokeRect(0, 0, 100, 100);
        //Draw x-axis
        if (this.xRange[1] > 10) {
            drawArrow(this.ctx, 0, 0, this.params.width + this.xRange[0] - 2 * this.params.padding, 0);
            if (this.params.showXAxisTitle) {
                //Add x-axis title
                this.ctx.save();
                this.ctx.scale(1, -1);
                var textPixelSize = this.ctx.measureText(this.params.xAxisTitle)
                this.ctx.fillText(this.params.xAxisTitle, this.xRange[1] - textPixelSize.width / 2, this.params.padding);
                //this.ctx.fillText(this.params.xAxisTitle, this.params.width + this.xRange[0] - textPixelSize.width, textPixelSize.height);
                this.ctx.restore();
            }
        }
        if (this.xRange[0] < -10) {
            drawArrow(this.ctx, 0, 0, this.xRange[0], 0);
        }
        //Draw y-axis
        if (this.yRange[1] > 10) {
            drawArrow(this.ctx, 0, 0, 0, this.params.height + this.yRange[0] - 2 * this.params.padding);
            if (this.params.showYAxisTitle) {
                //Add y-axis title
                this.ctx.save();
                this.ctx.scale(1, -1);
                var textPixelSize = this.ctx.measureText(this.params.yAxisTitle)
                this.ctx.fillText(this.params.yAxisTitle, -textPixelSize.width / 2, -this.yRange[1] - this.params.padding / 2);
                //this.ctx.fillText(this.params.yAxisTitle, -5, -(this.params.height + this.yRange[0]));
                this.ctx.restore();
            }
        }
        if (this.yRange[0] < -10) {
            drawArrow(this.ctx, 0, 0, 0, this.yRange[0]);
        }

    }
    addEquation(equationFunction, extraArgs = { color: "black", lineDash: [], type: "cartesian", cartesianInterval: 0.001, thetaBounds: [], thetaInterval: 0, tBounds: [], tInterval: 0 }) {
        if (Array.isArray(equationFunction)) {
            for (var equation of equationFunction) {
                this.addEquation(equation, extraArgs);
            }
        } else if (typeof equationFunction !== "function") {
            throw new Error("The equationFunction is not in the correct format, make sure you put parenthesis around your ES6 inline function\nEx: ((x) => { return Math.sin(x); })");
        } else {
            if (extraArgs.type !== "cartesian" && extraArgs.type !== "polar" && extraArgs.type !== "parametric") {
                extraArgs.type = "cartesian";
            }
            if (extraArgs.type == "cartesian") {
                var points = [];
                var pointsAllYValues = [];
                for (var x = this.xRange[0] / this.params.scaleFactor; x <= this.xRange[1] / this.params.scaleFactor; x += this.params.interval) {
                    var y = equationFunction(x);
                    if (isNaN(y) || !isFinite(y)) {
                        //Skip
                    } else {
                        //Add [x, y] to array only if the y value also falls in the interval of the axes shown
                        if (y * this.params.scaleFactor > this.yRange[0] && y * this.params.scaleFactor < this.yRange[1]) {
                            points.push([x, y]);
                            pointsAllYValues.push(y);
                        }
                    }

                }
                var minmaxY = getMinMax(pointsAllYValues);
                //console.log(`equationFunction: ${equationFunction}\npoints: ${points}`);
                //console.log(`points.length: ${points.length}`);
                this.ctx.setLineDash((extraArgs.lineDash != undefined) ? extraArgs.lineDash : []);
                this.ctx.strokeStyle = extraArgs.color;
                this.ctx.beginPath();
                for (var h = 0; h < points.length; h++) {
                    var point = points[h];
                    //console.log(point);
                    if (h != 0 && h != points.length - 1) {
                        //If not first or last point, look ahead one point and look behind one point to calculate the angle (degree) of change
                        var previousPoint = points[h - 1];
                        var currentPoint = points[h];
                        //var nextPoint = points[h + 1];
                        /*
                            Law of cosines: a^2 + b^2 - 2abcos(Cdegrees) = c^2
                            Cdegrees=???
                            arccos[(c^2 - a^2 - b^2) / (-2ab)] = Cdegrees
                            a = distance between previous-current
                            b = distance between current-next
                            c = distance between previous-next
                        */
                        var a = distanceBetweenTwoPoints(previousPoint[0], previousPoint[1], currentPoint[0], currentPoint[1]);
                        //var b = distanceBetweenTwoPoints(currentPoint[0], currentPoint[1], nextPoint[0], nextPoint[1]);
                        //var c = distanceBetweenTwoPoints(previousPoint[0], previousPoint[1], nextPoint[0], nextPoint[1]);
                        //var angleOfChange = Math.acos(((c * c - a * a - b * b) / (-2 * a * b)));
                        /*
                        if (Math.ceil(a) > 2) {
                            console.log(`max: ${minmaxY.max}\nmin: ${minmaxY.min}\n difference: ${minmaxY.max - minmaxY.min}\nMath.ceil(a): ${Math.ceil(a)}`);
                        }
                        */
                        //if (Math.ceil(a) == (this.yRange[1] - this.yRange[0]) / this.params.scaleFactor) {
                        if (Math.ceil(a) >= Math.ceil(minmaxY.max - minmaxY.min)) {
                            //console.log(b);
                            //console.log((this.yRange[1] - this.yRange[0]) / this.params.scaleFactor);
                            //console.log(angleOfChange);
                            //console.log(`max: ${minmaxY.max}\nmin: ${minmaxY.min}\n difference: ${minmaxY.max - minmaxY.min}\nMath.ceil(a): ${Math.ceil(a)}`);
                            this.ctx.moveTo(point[0] * this.params.scaleFactor, point[1] * this.params.scaleFactor);
                        } else {
                            this.ctx.lineTo(point[0] * this.params.scaleFactor, point[1] * this.params.scaleFactor);
                        }

                    }
                    /*
                                        if (h != 0) {
                                            var distanceBetweenCurrentPointAndNextPoint = Math.sqrt(Math.pow((points[h - 1][0] - points[h][0]), 2) + Math.pow((points[h - 1][1] - points[h][1]), 2));
                                            console.log(distanceBetweenCurrentPointAndNextPoint);
                                            if (distanceBetweenCurrentPointAndNextPoint > 10) {
                                                //Then we can say that it is fairly enough a large jump from points, too large to be a function
                                                this.ctx.moveTo(point[0] * this.params.scaleFactor, point[1] * this.params.scaleFactor);
                                            } else {
                                                //Draw point normally
                                                this.ctx.lineTo(point[0] * this.params.scaleFactor, point[1] * this.params.scaleFactor);
                                            }
                                        }*/
                    else {
                        //draw line normally
                        this.ctx.lineTo(point[0] * this.params.scaleFactor, point[1] * this.params.scaleFactor);
                    }
                }
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                this.ctx.strokeStyle = "black";
            } else if (extraArgs.type == "polar") {
                //Convert from polar to rectangular OR gather all polar points into rectangular format
                //(r, @) --> (x, y))? ==== (x=rcos(@), y=rsin(@))
                if (!Array.isArray(extraArgs.thetaBounds)) {
                    throw new Error("Either you did not provide your theta bounds or you forgot to make it an array");
                }
                var cartesianPoints = [];
                var cartesianPointsAllYValues = [];
                var thetaIterations = (extraArgs.thetaBounds[1] - extraArgs.thetaBounds[0]) / extraArgs.thetaInterval;
                if (thetaIterations > 50000) {
                    var newInterval = (extraArgs.thetaBounds[1] - extraArgs.thetaBounds[0]) / 50000;
                    console.warn("Your combination of thetaBounds and thetaInterval needs to be modified, with the current settings there will be too many iterations and it will slow down the browser. The iteration has already been set to " + String(newInterval) + ". Next time, decrease your difference between thetaBounds, or increase the thetaInterval. Remember that for most cases your thetaBounds don't need to be more than 2pi far apart.");
                    extraArgs.thetaInterval = newInterval;
                }
                //console.log("Theta iterations: " + String());
                for (var theta = extraArgs.thetaBounds[0]; theta <= extraArgs.thetaBounds[1]; theta += extraArgs.thetaInterval) {
                    var r = equationFunction(theta);
                    if (isNaN(r) || !isFinite(r)) {
                        //Skip
                    } else {
                        var x = r * Math.cos(theta);
                        var y = r * Math.sin(theta);
                        //Add [x, y] to array
                        cartesianPoints.push([x, y]);
                        cartesianPointsAllYValues.push(y);
                    }
                }

                var minmaxY = getMinMax(cartesianPointsAllYValues);
                this.ctx.setLineDash((extraArgs.lineDash != undefined) ? extraArgs.lineDash : []);
                this.ctx.strokeStyle = extraArgs.color;
                this.ctx.beginPath();
                for (var h = 0; h < cartesianPoints.length; h++) {
                    var point = cartesianPoints[h];
                    //console.log(point);
                    if (h != 0) {
                        //If not first point, look behind one point to calculate the distance and see if it is close enough to the height to be seen as an awkward jump in the graph, if so, it must be an asymptote, remove it
                        var previousPoint = cartesianPoints[h - 1];
                        var currentPoint = cartesianPoints[h];
                        //a = distance between previous-current
                        var a = distanceBetweenTwoPoints(previousPoint[0], previousPoint[1], currentPoint[0], currentPoint[1]);
                        //Difference between minimum and maximum values
                        //console.log(`max: ${minmaxY.max}\nmin: ${minmaxY.min}\n difference: ${minmaxY.max - minmaxY.min}`);
                        if (Math.ceil(a) == (this.yRange[1] - this.yRange[0]) / this.params.scaleFactor) {
                            this.ctx.moveTo(point[0] * this.params.scaleFactor, point[1] * this.params.scaleFactor);
                        } else {
                            this.ctx.lineTo(point[0] * this.params.scaleFactor, point[1] * this.params.scaleFactor);
                        }

                    } else {
                        //draw line normally
                        this.ctx.lineTo(point[0] * this.params.scaleFactor, point[1] * this.params.scaleFactor);
                    }
                }
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                this.ctx.strokeStyle = "black";
            } else if (extraArgs.type == "parametric") {
                if (!Array.isArray(extraArgs.tBounds)) {
                    throw new Error("Either you did not provide your t bounds or you forgot to make it an array");
                }
                var cartesianPoints = [];
                //var cartesianPointsAllXValues = [];
                var cartesianPointsAllYValues = [];
                var tIterations = (extraArgs.tBounds[1] - extraArgs.tBounds[0]) / extraArgs.tInterval;
                if (tIterations > 500000) {
                    var newInterval = (extraArgs.tBounds[1] - extraArgs.tBounds[0]) / 500000;
                    console.warn("Your combination of tBounds and tInterval needs to be modified, with the current settings there will be too many iterations and it will slow down the browser. The iteration has already been set to " + String(newInterval) + ". Next time, decrease your difference between tBounds, or increase the t.");
                    extraArgs.tInterval = newInterval;
                }
                //console.log("Theta iterations: " + String());
                for (var t = extraArgs.tBounds[0]; t <= extraArgs.tBounds[1]; t += extraArgs.tInterval) {
                    var xyPoint = equationFunction(t);
                    if (isNaN(xyPoint[0]) || isNaN(xyPoint[1]) || !isFinite(xyPoint[0]) || !isFinite(xyPoint[1])) {
                        //Skip
                    } else {
                        //Add [x, y] to array
                        cartesianPoints.push(xyPoint);
                        cartesianPointsAllYValues.push(xyPoint[1]);
                    }
                }

                var minmaxY = getMinMax(cartesianPointsAllYValues);
                this.ctx.setLineDash((extraArgs.lineDash != undefined) ? extraArgs.lineDash : []);
                this.ctx.strokeStyle = extraArgs.color;
                this.ctx.beginPath();
                for (var h = 0; h < cartesianPoints.length; h++) {
                    var point = cartesianPoints[h];
                    //console.log(point);
                    if (h != 0) {
                        //If not first point, look behind one point to calculate the distance and see if it is close enough to the height to be seen as an awkward jump in the graph, if so, it must be an asymptote, remove it
                        var previousPoint = cartesianPoints[h - 1];
                        var currentPoint = cartesianPoints[h];
                        //a = distance between previous-current
                        var a = distanceBetweenTwoPoints(previousPoint[0], previousPoint[1], currentPoint[0], currentPoint[1]);
                        //Difference between minimum and maximum values
                        //console.log(`max: ${minmaxY.max}\nmin: ${minmaxY.min}\n difference: ${minmaxY.max - minmaxY.min}`);
                        if (Math.ceil(a) == (this.yRange[1] - this.yRange[0]) / this.params.scaleFactor) {
                            this.ctx.moveTo(point[0] * this.params.scaleFactor, point[1] * this.params.scaleFactor);
                        } else {
                            this.ctx.lineTo(point[0] * this.params.scaleFactor, point[1] * this.params.scaleFactor);
                        }

                    } else {
                        //draw line normally
                        this.ctx.lineTo(point[0] * this.params.scaleFactor, point[1] * this.params.scaleFactor);
                    }
                }
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                this.ctx.strokeStyle = "black";

            }
        }
        return this; //return this class so that equations can be chained, removes the requirement of the "with" statement
    }
    finalizeGraph() {
        //Add padding in canvas to all 4 sides of the graph, maybe 5px on all 4 sides by increasing the width
        //Scale canvas by 10 times

        //this.ctx.scale(2, 2);
        this.ctx.save();
        return undefined;

        //this.canvasElement.width = this.params.width * 2;
        //this.canvasElement.height = this.params.height * 2;

        /*
        var oldWidth = this.canvasElement.width;
        var oldHeight = this.canvasElement.height;
        //If 20% of size isn't enough room for 10px, add 10px instead, else add 20%
        this.canvasElement.style.width = (0.4 * oldWidth > 10) ? (1.4 * oldWidth) + "px" : (oldWidth + 10) + "px";
        this.canvasElement.style.height = (0.4 * oldHeight > 10) ? (1.4 * oldHeight) + "px" : (oldHeight + 10) + "px";
        var widthRatio = oldWidth / this.canvasElement.style.width.replace("px", "");
        console.log(widthRatio)
        var heightRatio = oldHeight / this.canvasElement.style.height.replace("px", "");
        this.ctx.scale(widthRatio, heightRatio);
        //this.ctx.restore();
        var oldCanvasDataURL = this.canvasElement.toDataURL();

        var oldWidth = this.canvasElement.width;
        var oldHeight = this.canvasElement.height;
        //If 20% of size isn't enough room for 10px, add 10px instead, else add 20%
        var newWidth = (0.4 * oldWidth > 10) ? (1.4 * oldWidth) : (oldWidth + 10);
        var newHeight = (0.4 * oldHeight > 10) ? (1.4 * oldHeight) : (oldHeight + 10);
        var oldCanvasImageData = this.ctx.getImageData(oldWidth - newWidth, oldHeight - newHeight, newWidth, newHeight);
        var newCanvas = document.createElement("canvas");
        newCanvas.width = newWidth;
        newCanvas.height = newHeight;
        var oldCanvasID = this.canvasElement.id;
        newCanvas.getContext("2d").putImageData(oldCanvasImageData, 0, 0);
        this.canvasElement.parentElement.appendChild(newCanvas);
        var img = new Image;
        img.onload = () => {
            newCanvas.getContext("2d").drawImage(img, 0, 0);
            this.canvasElement.parentElement.appendChild(newCanvas);
        }
        img.src = oldCanvasDataURL;*/

    }
}
/* Extra Programmer Tools */

//For testing purposes to get exact coordinates - simply hover over the canvas to find the coordinates of the points where objects need to be drawn
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