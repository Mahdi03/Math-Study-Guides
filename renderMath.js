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
    var elementQueryList = ["sigma td"]; //Use CSS Selectors Here
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
        derivativeTags[r].innerHTML = "<div class='fraction'><div class='top'>d" + derivativeOrder + "<var>" + derivativeOf + "</var></div><div class='bottom'>d" + derivativeOrder + "<var>" + derivativeRespectTo + "</var></div></div>";
    }

    var pDerivativeTags = document.querySelectorAll(parentElement + "pDerivative");
    for (var s = 0; s < pDerivativeTags.length; s++) {
        var pDerivativeOf = pDerivativeTags[s].getAttribute("of") ? pDerivativeTags[s].getAttribute("of") : "";
        var pDerivativeRespectTo = pDerivativeTags[s].getAttribute("respectTo") ? pDerivativeTags[s].getAttribute("respectTo") : "x";
        var pDerivativeOrder = pDerivativeTags[s].getAttribute("order") ? "<sup>" + pDerivativeTags[s].getAttribute("order") + "</sup>" : "";
        pDerivativeTags[s].innerHTML = "<div class='fraction'><div class='top'>&part;" + pDerivativeOrder + "<var>" + pDerivativeOf + "</var></div><div class='bottom'>&part;" + pDerivativeOrder + "<var>" + pDerivativeRespectTo + "</var></div></div>";
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

function drawArrow(context, fromx, fromy, tox, toy) {
    //variables to be used when creating the arrow
    var headlen = 10;
    var angle = Math.atan2(toy - fromy, tox - fromx);
    //starting path of the arrow from the start square to the end square and drawing the stroke
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.stroke();
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
