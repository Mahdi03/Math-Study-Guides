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
  .mobile .studyGuideDropdown .loader {
    border: 6px solid #f3f3f3;
    /* Light grey */
    border-top: 6px solid #3498db;
    /* Blue */
    border-radius: 50%;
    width: 50px;
    height: 50px;
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
    //Convert my format of showing Math to MathJax - leave commented out for now until further use...only use on chem study guide for now
    function createHTMLNodesFromString(htmlString) {
        var div = document.createElement("div");
        div.innerHTML = htmlString;
        return div.childNodes;
    }
    var equationTags = document.querySelectorAll(parentElement + " equation");
    if (equationTags.length > 0) {
        /* Session Storage failed on refresh
        //If sessionStorage doesn't have pages saved where mathjax was loaded or if this page hasn't already loaded mathjax
        if (!sessionStorage.getItem("pagesThatLoadedMathJax") || !JSON.parse(sessionStorage.getItem("pagesThatLoadedMathJax")).includes(window.location.href))
        */
        if (document.querySelector("#MathJax-Script") == null) {
            //Set MathJax Config
            window.MathJax = {
                chtml: {
                    scale: 1
                },
                options: {
                    enableMenu: false
                },
                tex: {
                    packages: {
                        '[+]': ['mhchem']
                    }
                },
                loader: {
                    load: ['[tex]/mhchem']
                }
            };
            /*
            Import MathJax
            <!--Use this to edit MathJax: https://en.wikipedia.org/wiki/Quadratic_equation?veaction=edit-->
            <!-- Import MathJax -->
            <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
            <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

            */
            var polyfillScript = document.createElement("script");
            polyfillScript.setAttribute("src", "https://polyfill.io/v3/polyfill.min.js?features=es6");
            var mathjaxScript = document.createElement("script");
            mathjaxScript.setAttribute("id", "MathJax-script");
            mathjaxScript.setAttribute("async", "");
            mathjaxScript.setAttribute("src", "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js");
            document.head.appendChild(polyfillScript);
            document.head.appendChild(mathjaxScript);

            /*
                        //Take care of saving the information that this page has saved mathjax once and does not need to repeat
                        if (!sessionStorage.getItem("pagesThatLoadedMathJax")) {
                            var array = [];
                            array.push(window.location.href);
                            sessionStorage.setItem("pagesThatLoadedMathJax", JSON.stringify(array));
                        } else {
                            var array = JSON.parse(sessionStorage.getItem("pagesThatLoadedMathJax"));
                            array.push(window.location.href);
                            sessionStorage.setItem("pagesThatLoadedMathJax", JSON.stringify(array));
                        }
                        */
        }
        //Convert my math to TeX for MathJax
        equationTags.forEach((equationTag) => {
            var innerMath = "\\(";
            //Convert the innerHTML into DOM
            var dom = equationTag.cloneNode(true); //Set true for a deep copy
            //var myString = equationTag.innerHTML;
            //Replace sup{} with ^{}
            dom.innerHTML = dom.innerHTML.replace(/&minus;/gi, "-")
                //Replace the grouping punctuation with those that resize
                .replaceAll("||", "&#x2225;") //Allows to show magnitude of vectors
                .replaceAll("(", "\\left(").replaceAll(")", "\\right)")
                .replaceAll("[", "\\left[").replaceAll("]", "\\right]")
                //The following line comes from: https://stackoverflow.com/questions/406230/regular-expression-to-match-a-line-that-doesnt-contain-a-word
                .replace(/^((?!\\ce).){0,9}({[^}]{1,}})$/gmi, "\\left\\{$2\\right\\}")
                //.replaceAll("{", "\\left\\{").replaceAll("}", "\\right\\}")
                .replace(/[|]([^|]{1,})[|]/gm, "\\left\\vert {$1} \\right\\vert")
                //Replace HTML entities so they don't show up small on mobile
                .replace(/&theta;/gi, "\\theta").replace(/&alpha;/gi, "\\alpha")
                .replace(/&beta;/gi, "\\beta").replace(/&gamma;/gi, "\\gamma")
                .replace(/&pi;/gi, "\\pi").replace(/&rho;/gi, "\\rho").replace(/&phi;/gi, "\\phi")
                .replace(/&omega;/gi, "\\omega").replace(/&tau;/gi, "\\tau")
                .replace(/&epsilon;/gi, "\\epsilon").replace(/&kappa;/gi, "\\kappa")
                .replace(/&mu;/gi, "\\mu")
                //.replaceAll("⟨", "\\big\\langle").replaceAll("⟩", "\\right\\langle")
                //.replaceAll(",", ",\\,") //adds a space after every comma
                /*
                    .replace(/[\[]([^\]]{1,})[\]]/gm, "\\left[ {$1} \\right]").replace(/[\(]([^\)]{1,})[\)]/gm, "\\left( {$1} \\right)")
                .replace(/[\{]([^})]{1,})[\}]/gm, "\\left\\{ {$1} \\right\\}")*/
            ;
            while (dom.querySelector("sigma") != undefined) {
                var oldSigma = dom.querySelector("sigma");
                var startValue = (oldSigma.getAttribute("start") !== null) ? oldSigma.getAttribute("start") : "";
                var endValue = (oldSigma.getAttribute("end") !== null) ? oldSigma.getAttribute("end") : "";
                var newSigma = createHTMLNodesFromString("\\displaystyle\\sum_{" + startValue + "}^{" + endValue + "}");
                oldSigma.replaceWith(...newSigma);
            }
            while (dom.querySelector("log") != undefined) {
                var oldLog = dom.querySelector("log");
                var base = oldLog.getAttribute("base");
                var newLog = "";
                if (base !== null) {
                    newLog = "\\log_{" + base + "} {" + oldLog.innerHTML + "}";
                } else {
                    newLog = "\\log {" + oldLog.innerHTML + "}";
                }
                newLog = createHTMLNodesFromString(newLog);
                oldLog.replaceWith(...newLog);
                //console.log(dom.innerHTML)
            }
            while (dom.querySelector("lim") != undefined) {
                var oldLim = dom.querySelector("lim");
                var limAs = oldLim.getAttribute("as");
                var limApproaches = oldLim.getAttribute("approaches");
                var newLim = createHTMLNodesFromString("\\displaystyle\\lim_{" + limAs + " \\to " + limApproaches + "}");
                oldLim.replaceWith(...newLim);
            }
            while (dom.querySelector("derivative") != undefined) {
                var oldDerivative = dom.querySelector("derivative");
                var derivativeOf = oldDerivative.getAttribute("of") ? oldDerivative.getAttribute("of") : "";
                var derivativeRespectTo = oldDerivative.getAttribute("respectTo") ? oldDerivative.getAttribute("respectTo") : "x";
                var derivativeOrder = oldDerivative.getAttribute("order") ? "^{" + oldDerivative.getAttribute("order") + "}" : "";
                var newDerivative = createHTMLNodesFromString("\\dfrac{d" + derivativeOrder + derivativeOf + "}{d" + derivativeRespectTo + derivativeOrder + "}");
                oldDerivative.replaceWith(...newDerivative);
            }
            while (dom.querySelector("pDerivative") != undefined) {
                var oldPDerivative = dom.querySelector("pDerivative");
                var pDerivativeOf = oldPDerivative.getAttribute("of") ? oldPDerivative.getAttribute("of") : "";
                var pDerivativeRespectTo = oldPDerivative.getAttribute("respectTo") ? oldPDerivative.getAttribute("respectTo") : "x";
                var pDerivativeOrder = oldPDerivative.getAttribute("order") ? "^{" + oldPDerivative.getAttribute("order") + "}" : "";
                var newPDerivative = createHTMLNodesFromString("\\dfrac{\\partial " + pDerivativeOrder + pDerivativeOf + "}{\\partial " + pDerivativeRespectTo + pDerivativeOrder + "}");
                oldPDerivative.replaceWith(...newPDerivative);
            }
            while (dom.querySelector("integral") != undefined) {
                var oldIntegral = dom.querySelector("integral");
                var numberOfIntegrals = 1;
                if (oldIntegral.hasAttribute("double")) {
                    //Then it is a double integral
                    numberOfIntegrals = 2;
                }
                if (oldIntegral.hasAttribute("triple")) {
                    numberOfIntegrals = 3;
                }
                var lowerBound = (oldIntegral.getAttribute("lowerBound") != null) ? oldIntegral.getAttribute("lowerBound") : "";
                var upperBound = (oldIntegral.getAttribute("upperBound") != null) ? oldIntegral.getAttribute("upperBound") : "";
                var respectTo = (oldIntegral.getAttribute("respectTo") != null) ? "d" + oldIntegral.getAttribute("respectTo") : "";
                var newIntegral = createHTMLNodesFromString("\\displaystyle\\" + "i".repeat(numberOfIntegrals) + "nt_{" + lowerBound + "}^{" + upperBound + "} {" + oldIntegral.innerHTML + "}" + respectTo);
                oldIntegral.replaceWith(...newIntegral);
            }
            while (dom.querySelector("evaluated") != undefined) {
                var oldEvaluated = dom.querySelector("evaluated");
                var from = (oldEvaluated.getAttribute("from") != null) ? oldEvaluated.getAttribute("from") : "";
                var to = (oldEvaluated.getAttribute("to") != null) ? oldEvaluated.getAttribute("to") : "";
                var newEvaluated = createHTMLNodesFromString("\\Bigr|_{" + from + "}^{" + to + "}");
                oldEvaluated.replaceWith(...newEvaluated);
            }
            while (dom.querySelector("laPlaceTransform") != undefined) {
                var oldLaPlaceTransform = dom.querySelector("laPlaceTransform");
                var newLaPlaceTransform = createHTMLNodesFromString("&Laplacetrf;\\left\\{" + oldLaPlaceTransform.innerHTML + "\\right\\}");
                oldLaPlaceTransform.replaceWith(...newLaPlaceTransform);
            }
            while (dom.querySelector("invLaPlaceTransform") != undefined) {
                var oldInvLaPlaceTransform = dom.querySelector("invLaPlaceTransform");
                var newInvLaPlaceTransform = createHTMLNodesFromString("&Laplacetrf;^{-1}\\left\\{" + oldInvLaPlaceTransform.innerHTML + "\\right\\}");
                oldInvLaPlaceTransform.replaceWith(...newInvLaPlaceTransform);
            }
            while (dom.querySelector("matrix") != undefined) {
                var oldMatrix = dom.querySelector("matrix");
                var dimensionX = parseInt(oldMatrix.getAttribute("dimensionX"));
                var dimensionY = parseInt(oldMatrix.getAttribute("dimensionY"));
                var values = oldMatrix.getAttribute("values").split(", ");
                if (values.length !== dimensionX * dimensionY) {
                    console.log(values);
                    oldMatrix.innerHTML = "Could not display matrix, Dimension Error";
                } else {
                    var punctuation = "bmatrix";
                    //If it is a direct sibling of determinant <det> then make it absolute value signs instead
                    if (oldMatrix.parentElement.localName === "det") {
                        punctuation = "vmatrix";
                    }
                    var newMatrixString = "\\begin{" + punctuation + "}";
                    for (var row = 1; row <= dimensionY; row++) {
                        for (var col = 1; col <= dimensionX; col++) {
                            newMatrixString += values[(row - 1) * dimensionX + (col - 1)];
                            if (col != dimensionX) {
                                newMatrixString += " & ";
                            }
                        }
                        if (row != dimensionY) {
                            newMatrixString += "\\\\";
                        }
                    }
                    newMatrixString += "\\end{" + punctuation + "}";
                    var newMatrix = createHTMLNodesFromString(newMatrixString);
                    oldMatrix.replaceWith(...newMatrix);
                }
            }
            while (dom.querySelector("det") != undefined) {
                var oldDet = dom.querySelector("det");
                var newDet;
                //If the child of the determinant has already converted something other than a variable name, then print just as
                if (oldDet.firstChild.wholeText.includes("\\begin")) {
                    newDet = createHTMLNodesFromString(oldDet.innerHTML);
                } else {
                    //Else use determinant as function instead of bracket notation defined in matrix tags
                    newDet = createHTMLNodesFromString("\\det\\left(" + oldDet.innerHTML + "\\right)");
                }
                oldDet.replaceWith(...newDet);
            }
            //Remember that MathJax does not support boxed answers in aligned equations
            while (dom.querySelector("span.answer") != undefined) {
                var oldSpan = dom.querySelector("span.answer");
                //\llap{\mathrel{\boxed{\phantom{3x = 19 - 2y}}}}
                var newSpan = createHTMLNodesFromString("\\boxed{" + oldSpan.innerHTML + "}");
                oldSpan.replaceWith(...newSpan);
            }
            while (dom.querySelector("span.cancel") != undefined) {
                var oldSpan = dom.querySelector("span.cancel");
                var newSpan = createHTMLNodesFromString("\\cancel{" + oldSpan.innerHTML + "}");
                oldSpan.replaceWith(...newSpan);
            }
            while (dom.querySelector("span.alignedEquations") != undefined) {
                var oldSpanAlignedEquations = dom.querySelector("span.alignedEquations");
                while (oldSpanAlignedEquations.querySelector("br") != undefined) {
                    var oldBR = oldSpanAlignedEquations.querySelector("br");
                    var newBR = createHTMLNodesFromString("\n\\\\\n");
                    oldBR.replaceWith(...newBR);
                }
                oldSpanAlignedEquations.innerHTML = oldSpanAlignedEquations.innerHTML.replace(/=/g, "&=").replace(/\-\>/gm, "&->").replace(/\-&gt;/gm, "&->");
                var newSpanAlignedEquations = createHTMLNodesFromString("\\begin{align}" + oldSpanAlignedEquations.innerHTML + "\\end{align}");
                oldSpanAlignedEquations.replaceWith(...newSpanAlignedEquations);
            }
            while (dom.querySelector("sup") != undefined) {
                var oldSUP = dom.querySelector("sup");
                var newSUP = createHTMLNodesFromString("^{" + oldSUP.innerHTML + "}");
                oldSUP.replaceWith(...newSUP);
                //console.log(dom.innerHTML)
            }
            //Replace sub{} with _{}
            while (dom.querySelector("sub") != undefined) {
                var oldSUB = dom.querySelector("sub");
                var newSUB = createHTMLNodesFromString("_{" + oldSUB.innerHTML + "}");
                oldSUB.replaceWith(...newSUB);
                //console.log(dom.innerHTML)
            }
            //Replace var with nothing since MathJax automatically styles text
            while (dom.querySelector("var") != undefined) {
                var oldVAR = dom.querySelector("var");
                var newVAR = createHTMLNodesFromString("{" + oldVAR.innerHTML + "}");
                oldVAR.replaceWith(...newVAR);
                //console.log(dom.innerHTML)
            }
            //Replace sqrt{} with \sqrt {}
            while (dom.querySelector("sqrt") != undefined) {
                var oldSQRT = dom.querySelector("sqrt");
                var newSQRT = createHTMLNodesFromString("\\sqrt {" + oldSQRT.innerHTML + "}");
                oldSQRT.replaceWith(...newSQRT);
                //console.log(dom.innerHTML)
            }
            while (dom.querySelector("div.fraction") != undefined) {
                var oldFrac = dom.querySelector("div.fraction");
                var top = oldFrac.children[0].innerHTML;
                var bottom = oldFrac.children[1].innerHTML;
                var newFrac = createHTMLNodesFromString("\\dfrac{" + top + "}{" + bottom + "}");
                oldFrac.replaceWith(...newFrac);
                //console.log(dom.innerHTML)
            }
            while (dom.querySelector("text") != undefined) {
                var oldText = dom.querySelector("text");
                var newText = createHTMLNodesFromString("\\text{" + oldText.innerHTML + "}");
                oldText.replaceWith(...newText);
            }
            var otherFunctions = ["sin", "cos", "tan", "csc", "sec", "cot", "ln"];
            for (var i = 0; i < otherFunctions.length; i++) {
                while (dom.querySelector(otherFunctions[i]) != undefined) {
                    var oldFunc = dom.querySelector(otherFunctions[i]);
                    var newFunc = createHTMLNodesFromString("\\operatorname{" + otherFunctions[i] + "} {\\left(" + oldFunc.innerHTML + "\\right)}");
                    oldFunc.replaceWith(...newFunc);
                }
            }
            while (dom.querySelector("vector") != undefined) {
                var oldVector = dom.querySelector("vector");
                var newVector = createHTMLNodesFromString("\\overrightarrow{" + oldVector.innerHTML + "}");
                oldVector.replaceWith(...newVector);
            }
            //Replace vector{} with \overrightarrow{}
            //myString.replace(/<sup>()<\/sup>/, "^{$1}");
            innerMath += dom.innerHTML.replaceAll(",", ",\\,"); //adds a space after every comma - Added it down here since my matrix tags used commas and I didn't want to replace those until they were latex-ified
            innerMath += "\\)";
            equationTag.innerHTML = innerMath;
            //Use for debugging purposes:
            equationTag.setAttribute("LaTeX", innerMath);
        });
        /* Technically now useless block of code since it typesets automatically
        try {
            //MathJax.typesetPromise();
        } catch (err) {
            console.warn("MathJax not yet supported on this page. Error:\n" + err);
        }
        */
    }

    //Replaced/Defined all math function 
    //Defined all Sqrt Tags

    var sqrtTags = document.querySelectorAll(parentElement + "sqrt");
    for (var e = 0; e < sqrtTags.length; e++) {
        var sqrtInput = sqrtTags[e].innerHTML;
        sqrtTags[e].innerHTML = "&radic;<span style='border-top: 0.5px solid;'>" + sqrtInput + "</span>";
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
    //Defined LaPlaceTransform tags
    var laPlaceTransformTags = document.querySelectorAll(parentElement + "laPlaceTransform");
    for (var t = 0; t < laPlaceTransformTags.length; t++) {
        var laPlaceTransformInput = laPlaceTransformTags[t].innerHTML;
        laPlaceTransformTags[t].innerHTML = "&Laplacetrf;{<var>" + laPlaceTransformInput + "</var>}";
    }
    var invLaPlaceTransformTags = document.querySelectorAll(parentElement + "invLaPlaceTransform");
    for (var t = 0; t < invLaPlaceTransformTags.length; t++) {
        var invLaPlaceTransformInput = invLaPlaceTransformTags[t].innerHTML;
        invLaPlaceTransformTags[t].innerHTML = "&Laplacetrf;<sup>&minus;1</sup>{<var>" + invLaPlaceTransformInput + "</var>}";
    }
    //Defined log tag and ln tag
    var logTags = document.querySelectorAll(parentElement + "log");
    for (var p = 0; p < logTags.length; p++) {
        var logInput = logTags[p].innerHTML;
        var base = logTags[p].getAttribute("base");
        //If there are elements or compounds in the tag, don't italicize by default
        if (logTags[p].querySelectorAll("compound, element").length > 0) {
            if (base !== null) {
                var base = logTags[p].getAttribute("base");
                logTags[p].innerHTML = "log<sub>" + base + "</sub>(" + logInput + ")";
            } else {
                logTags[p].innerHTML = "log(" + logInput + ")";
            }
        } else {
            if (base !== null) {
                var base = logTags[p].getAttribute("base");
                logTags[p].innerHTML = "log<sub>" + base + "</sub>(<var>" + logInput + "</var>)";
            } else {
                logTags[p].innerHTML = "log(<var>" + logInput + "</var>)";
            }
        }
    }
    var lnTags = document.querySelectorAll(parentElement + "ln");
    for (var q = 0; q < lnTags.length; q++) {
        var lnInput = lnTags[q].innerHTML;
        //If there are elements or compounds in the tag, don't italicize by default
        if (lnTags[p].querySelectorAll("compound, element").length > 0) {
            lnTags[q].innerHTML = "ln(" + lnInput + ")";
        } else {
            lnTags[q].innerHTML = "ln(<var>" + lnInput + "</var>)";
        }
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
        integralTags[h].classList.add("notYetStyled")
    }
    var integralTags = document.querySelectorAll(parentElement + "integral");
    while (document.querySelector(parentElement + "integral.notYetStyled") != undefined) {
        var integralTag = document.querySelector(parentElement + "integral.notYetStyled");
        var lowerBound = integralTag.getAttribute("lowerBound");
        var upperBound = integralTag.getAttribute("upperBound");
        var respectTo = integralTag.getAttribute("respectTo");
        var span = document.createElement("span");
        span.innerHTML = "<var>d" + respectTo + "</var>";
        if (lowerBound !== null || upperBound !== null) {
            integralTag.innerHTML = "<span style='font-size: 200%; display: inline-block; transform: translateY(10px);'>&int;</span><sub style='display: inline-block; transform: translateY(12px);'>" + lowerBound + "</sub><sup style='display: inline-block; transform: translateY(-11px);'>" + upperBound + "</sup><span style='transform: translateY(50px);'>" + integralTag.innerHTML + "</span>";
        } else {
            integralTag.innerHTML = "<span style='font-size: 200%; display: inline-block; transform: translateY(10px);'>&int;</span><span style='transform: translateY(50px);'>" + integralTag.innerHTML + "</span>";
        }
        console.log(integralTag.parentNode);
        integralTag.parentNode.insertBefore(span, integralTag.nextSibling);
        integralTag.classList.remove("notYetStyled");

    }
    /*
    for (var h = 0; h < integralTags.length; h++) {
        console.log(integralTags[h]);
        var lowerBound = integralTags[h].getAttribute("lowerBound");
        var upperBound = integralTags[h].getAttribute("upperBound");
        var respectTo = integralTags[h].getAttribute("respectTo");
        var span = document.createElement("span");
        span.innerHTML = "<var>d" + respectTo + "</var>";
    }
    */
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
        var endValue = (sigmaTags[r].getAttribute("end") !== null) ? sigmaTags[r].getAttribute("end") : "";
        var sigmaInnerHTML = sigmaTags[r].innerHTML;
        sigmaTags[r].innerHTML = "<table class='sigmaTag' style='display: inline-table; transform: translateY(-30%);'><tr><td>" + endValue + "</td></tr><tr><td style='font-size: 200%;'>&Sigma;</td><td>" + sigmaInnerHTML + "</td></tr><tr><td>" + startValue + "</td></tr></table>";
    }
    var renderJS = document.querySelectorAll(parentElement + "script.renderJS");
    renderJS.forEach((script) => {
        eval(script.innerHTML);
    });




    //Room for science stuff:
    /*
    If there are element tags, make sure the file is downloaded before you proceed.
    if not, then proceed to renderScience anyways, since there is an `if` block there
    that conditionally uses the periodicTableOfElements.json file depending on whether
    or not there are any element tags, because the funciton still has other science tags
    to render
    */
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
                for (var prop in xhr) {
                    console.log(`${prop}: ${xhr[prop]}`);
                }
                console.log("}");

                console.log("Success");
                renderScience(parentElement);
            }).catch((error) => {
                console.log("{");
                for (var prop in error) {
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
    } else {
        renderScience(parentElement);
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
    if (elementTags.length > 0) {
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
            var fullElectronicConfiguration = elementTag.getAttribute("fullElectronConfiguration");
            var massNumber = elementTag.getAttribute("massNumber");
            var atomicNumber = elementTag.getAttribute("atomicNumber");
            var number = elementTag.getAttribute("number");
            var charge = elementTag.getAttribute("charge");
            var oxidationNumber = elementTag.getAttribute("oxidationState");

            var elementTaginnerHTML = "";
            if (electronicConfiguration !== null) {
                if (electronicConfiguration == "") {
                    elementTaginnerHTML = elementInQuestion.electronicConfiguration;
                } else {
                    elementTaginnerHTML = electronicConfiguration.split(" ").map((el) => { return el.replace(/(?<=[a-z])(\d{1,2})/gi, "<sup>$1</sup>") }).join(" ");
                }
            } else if (fullElectronicConfiguration !== null) {
                if (fullElectronicConfiguration == "") {
                    //Recursively get the electron configurations of all the electrons - since it only comes in noble gas form
                    function getFullElectronConfiguration(abbreviatedElectronConfiguration) {
                        var returnVal = abbreviatedElectronConfiguration;
                        if (abbreviatedElectronConfiguration.includes("[")) {
                            var regex = /\[([A-Za-z]{1,2})\]/;
                            var newElementInQuestion = regex.exec(abbreviatedElectronConfiguration)[1];
                            //var newElementInQuestion = abbreviatedElectronConfiguration.split("]")[0].split("[")[1];
                            var newElementInQuestionElectronConfiguration = getPeriodicElementByName(newElementInQuestion).electronicConfiguration;
                            returnVal = abbreviatedElectronConfiguration.replace(/\[[A-Za-z]{1,2}\]/, newElementInQuestionElectronConfiguration);
                            if (returnVal.includes("[")) {
                                return getFullElectronConfiguration(returnVal);
                            } else {
                                return returnVal;
                            }
                        } else {
                            return returnVal;
                        }
                    }
                    elementTaginnerHTML = getFullElectronConfiguration(elementInQuestion.electronicConfiguration);
                } else {
                    elementTaginnerHTML = fullElectronicConfiguration;
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
                        //If charge is not provided, check if oxidation is
                        if (oxidationNumber == null || oxidationNumber == "" || oxidationNumber == undefined) {
                            return ""; //Do nothing
                        } else if (oxidationNumber !== null && oxidationNumber !== "" && oxidationNumber !== undefined) {
                            return oxidationNumber;
                        }
                    }
                    //If neither is true, charge must be a value
                    else if (charge !== null && charge !== "" && charge !== undefined) {
                        return charge;
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
                <td style='text-align: right;'>${massNumberText()}</td><td></td><td style='text-align: left;'>${chargeOrOxidationNumberText()}</td>
                </tr>
                <!--Main Row-->
                <tr>
                <td></td>
                <td class='elementName'>${/*Name will always be provided*/name}</td>
                </tr>
                <!--Lower Row-->
                <tr>
                <td style='text-align: right;'>${atomicNumberText()}</td><td></td><td style='text-align: left;'>${numericAmountText()}</td>
                </tr>
                </table>`;
            }
            elementTag.innerHTML = elementTaginnerHTML;
        });
    }
    /*Try combining the element and compound tags*/
    //Defined compound tag - <compound>5C6H12O6^-7</compound>
    var compoundTags = document.querySelectorAll(parentElement + "compound");
    for (var i = 0; i < compoundTags.length; i++) {
        var compound = compoundTags[i].innerHTML;
        var stateOfMatter = compoundTags[i].getAttribute("state");
        //The first RegExp takes care of subscripts, looks for 1-2 numbers found after a letter or parenthesis (like `(OH)2`)
        //The second RegExp looks for the ^ sign and makes 1-3 characters after it into a superscript (for ions)
        compound = compound.replace(/(?<=[A-Za-z\)])(\d{1,2})/g, "<sub>$1</sub>").replace(/\^([\d+-]{1,3})/g, "<sup>$1</sup>").replace("-", "&minus;");
        compoundTags[i].innerHTML = (stateOfMatter != undefined && stateOfMatter != "") ? compound + " (<var>" + stateOfMatter + "</var>)" : compound;
    }


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
        if (typeof proof != typeof "") {
            document.querySelector(id + "ToggleLink").innerHTML = (proof == true) ? "Show Proof" : "Show Solution";
        } else {
            document.querySelector(id + "ToggleLink").innerHTML = "Show " + proof;
        }
    } else {
        element.style.display = "block";
        if (typeof proof != typeof "") {
            document.querySelector(id + "ToggleLink").innerHTML = (proof == true) ? "Hide Proof" : "Hide Solution";
        } else {
            document.querySelector(id + "ToggleLink").innerHTML = "Hide " + proof;
        }
    }
}










/*Extra Tools:*/


// https://stackoverflow.com/questions/34506036/how-do-i-draw-thin-but-sharper-lines-in-html-canvas
// Use to make canvas lines clearer on-screen
function oversampleCanvas(tgtCanvas, ctx, factor) {
    var width = tgtCanvas.width;
    var height = tgtCanvas.height;
    tgtCanvas.width = Math.trunc(width * factor);
    tgtCanvas.height = Math.trunc(height * factor);
    tgtCanvas.style.width = width + 'px';
    tgtCanvas.style.height = height + 'px';
    ctx.scale(factor, factor);
}

function drawArrow(context, fromx, fromy, tox, toy, extraArgs) {
    //variables to be used when creating the arrow
    var headlen = 10;
    var angle = Math.atan2(toy - fromy, tox - fromx);
    //starting path of the arrow from the start square to the end square and drawing the stroke
    context.beginPath();
    context.setLineDash([]);
    if (extraArgs !== undefined) {
        if (extraArgs.lineDash !== undefined) {
            context.setLineDash(extraArgs.lineDash);
        }
        if (extraArgs.headlen !== undefined) {
            headlen = extraArgs.headlen;
        }
    }
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
// returns radians
function findAngle(sx, sy, ex, ey) {
    // make sx and sy at the zero point
    return Math.atan2((ey - sy), (ex - sx));
}

//Taken from above
function drawArrowhead(ctx, locx, locy, angle, sizex, sizey) {
    var hx = sizex / 2;
    var hy = sizey / 2;

    ctx.translate((locx), (locy));
    ctx.rotate(angle);
    ctx.translate(-hx, -hy);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 1 * sizey);
    ctx.lineTo(1 * sizex, 1 * hy);
    ctx.closePath();
    ctx.fill();

    ctx.translate(hx, hy);
    ctx.rotate(-angle);
    ctx.translate(-locx, -locy);
}


/*
The below function is stolen directly from https://stackoverflow.com/questions/11217374/html5-render-simple-electrical-circuits
And modified for personal use

- This class draws circuits in the conventional method of current, positive to negative
All the methods return the CircuitDiagram object itself, allowing for event chaining
*/

class CircuitDiagram {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.canvas.width = width;
        this.originalCanvasWidth = width;
        this.canvas.height = height;
        this.originalCanvasHeight = height;
        oversampleCanvas(this.canvas, this.ctx, 4);
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
        this.dx = Math.round(Math.cos((Math.PI / 2) * this.direction));
        this.dy = Math.round(Math.sin((Math.PI / 2) * this.direction));

        return this;
    }
    moveTo(a, b) {
        this.ctx.moveTo(a, b);
        this.currentX = a;
        this.currentY = b;

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

maybe animate the drawing of equations? {animate: true, animationSpeed: 10}
if animating, make the calculations and canvas drawings offscreen using web workers
so that it doesn't affect webpage performance - ie: OffscreenCanvas

allow graph to be dragged around at one possible point?

draw 3-D graphs using MS excel pitch and yaw calculations
*/
/*
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

/**
 * This class is used to graph equations onto a JS canvas
 * 
 */
class Graph {
    /**
     * This class is used to graph equations onto a JS canvas
     * @class
     * @param {HTMLCanvasElement} canvasElement
     * This should just be a document.querySelector("#myCanvas")
     * @param {Array} xRange
     * An array of two values (in pixels) denoting the domain on which to draw
     * @param {Array} yRange
     * An array of two values (in pixels) denoting the range on which to draw
     * @param {Object} [params]
     * An object for extra parameters, not necessarily required but highly
     * recommended since default values are wonky
     *      @param {Number} [params.overscaleFactor=4]
     *      A number denoting what factor to overscale the graph for--used to
     *      prettify the graph and make the drawings smoother. Default is 4
     *      @param {Number} [params.padding=10]
     *      A number (in pixels) denoting how much extra padding to be added to
     *      the canvas
     *      @param {Number} [params.width=0]
     *      This number will be overridden no matter what, don't bother
     *      @param {Number} [params.height=0]
     *      This number will be overridden no matter what, don't bother
     *      @param {Number} [scaleFactor=40]
     *      This the is zoom of the graph, the number is also in pixels and
     *      is multiplied with all the values to fit onto the canvas on a
     *      visible size, play around with it in conjunction with the interval
     *      @param {Number} [interval=0.1]
     *      This is the interval at which dots will be connected on the x-axis.
     *      Too small of an interval will cause the canvas to malfunction since
     *      there will be too many points, it would also slow down the browser. Too
     *      large of an interval will not result in a correct shape of the graph,
     *      play around with this in conjunction with the scaleFactor
     *      @param {String} [xAxisTitle=""]
     *      Title to put on the x-axis...keep it short
     *      @param {Boolean} [showXAxisTitle=false]
     *      Set this to true if you want to include an x-axis interval
     */
    constructor(canvasElement, xRange, yRange, {
        overscaleFactor = 4,
        padding = 10,
        width = 0,
        height = 0,
        /*Zoom/visibility*/
        scaleFactor = 40,
        interval = 0.1,
        //Add support for axis labels and chart labels later
        drawAxis = false,
        /*X-Axis*/
        xAxisTitle = "",
        showXAxisTitle = false,
        xAxisLabelInterval = 0,
        /*X-Axis tick marks*/
        showXAxisTickMarks = false,
        xAxisTickMarksInterval = 0,
        /*Y-Axis*/
        yAxisTitle = "",
        showYAxisTitle = false,
        yAxisLabelInterval = 0,
        /*Y-Axis tick marks*/
        showYAxisTickMarks = false,
        yAxisTickMarksInterval = 0
    } = {}) {

        if (!Array.isArray(xRange) || !Array.isArray(yRange)) {
            throw new Error("Your x and y ranges are not in the form of arrays, use [x1, x2], [y1, y2] for your graph");
        }
        this.xRange = xRange;
        this.yRange = yRange;
        this.params = {
            overscaleFactor: overscaleFactor,
            padding: padding,
            width: width,
            height: height,
            /*Zoom/visibility*/
            scaleFactor: scaleFactor,
            interval: interval,
            //Add support for axis labels and chart labels later
            drawAxis: drawAxis,
            /*X-Axis*/
            xAxisTitle: xAxisTitle,
            showXAxisTitle: showXAxisTitle,
            xAxisLabelInterval: xAxisLabelInterval,
            /*X-Axis tick marks*/
            showXAxisTickMarks: showYAxisTickMarks,
            xAxisTickMarksInterval: xAxisTickMarksInterval,
            /*Y-Axis*/
            yAxisTitle: yAxisTitle,
            showYAxisTitle: showYAxisTitle,
            yAxisLabelInterval: yAxisLabelInterval,
            /*Y-Axis tick marks*/
            showYAxisTickMarks: showYAxisTickMarks,
            yAxisTickMarksInterval: yAxisTickMarksInterval
        }
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
        if (this.params.drawAxis == undefined) {
            this.params.drawAxis = true;
        }
        if (this.params.drawAxis) {
            this.drawAxis();
        }

        this.equations = {};
    }
    prepareCanvas(dimensions = [this.params.width, this.params.height]) {
        this.canvasElement.width = dimensions[0];
        this.canvasElement.height = dimensions[1];
        /*
        https://stackoverflow.com/questions/42844470/how-to-rotate-and-mirror-canvas-element
        setTransform(xScale, ySkew, xSkew, yScale, originX, originY)
        */
        //this.ctx.scale(2, 2);
        oversampleCanvas(this.canvasElement, this.ctx, this.params.overscaleFactor); //Try to clear up the blur with overscale factor of 4
        //this.params.width = Math.trunc(this.params.width * 4);
        //this.params.height = Math.trunc(this.params.height * 4);
        //console.log(`this.params.width: ${this.params.width}\nthis.params.height: ${this.params.height}\n`);
        //this.ctx.save(); //Save the canvas context to undo the transformations later
        this.ctx.setTransform(this.params.overscaleFactor, 0, 0, -this.params.overscaleFactor,
            (0 - this.xRange[0] + this.params.padding) * this.params.overscaleFactor,
            (dimensions[1] + this.yRange[0] - this.params.padding) * this.params.overscaleFactor);
    }

    drawAxis() {
        this.ctx.moveTo(0, 0);
        //this.ctx.arc(0, 0, 5, 0, Math.PI * 2, false);
        //this.ctx.stroke();
        //this.ctx.strokeRect(0, 0, 100, 100);
        //Draw positive x-axis
        if (this.xRange[1] >= 10) {
            drawArrow(this.ctx, 0, 0, this.params.width + this.xRange[0] - 2 * this.params.padding, 0);
            if (this.params.showXAxisTitle) {
                //Add x-axis title
                this.ctx.save();
                this.ctx.scale(1, -1);
                var textPixelSize = this.ctx.measureText(this.params.xAxisTitle)
                this.ctx.fillText(this.params.xAxisTitle, this.xRange[1] - textPixelSize.width / 2, this.params.padding / 2);
                //this.ctx.fillText(this.params.xAxisTitle, this.params.width + this.xRange[0] - textPixelSize.width, textPixelSize.height);
                this.ctx.restore();
            }
            if (this.params.showXAxisTickMarks) {
                //Add tick marks on positive x-axis

            }
        }
        //Draw negative x-axis
        if (this.xRange[0] <= -10) {
            drawArrow(this.ctx, 0, 0, this.xRange[0], 0);
        }
        //Draw positive y-axis
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
        //Draw negative y-axis
        if (this.yRange[0] < -10) {
            drawArrow(this.ctx, 0, 0, 0, this.yRange[0]);
        }

    }

    /**
     * This function adds an equation to the graph
     * @param {function} equationFunction Function in the form of ES6 syntax taking in one parameter and returning another
     * @param {object} extraArgs Check the specification on what properties are available for modifying
     * @returns {Graph} Returns the Graph class to allow chaining of equation adds
     */
    addEquation(equationFunction, extraArgs = { id: "", color: "black", lineDash: [], type: "cartesian", cartesianInterval: 0.001, thetaBounds: [], thetaInterval: 0, tBounds: [], tInterval: 0 }) {
        /*
        - Refactor the process of graphing cartesian points since that exists in all three of these
        - Add options for 
        */
        //console.log((equationFunction).toString());
        if (Array.isArray(equationFunction)) {
            for (var equation of equationFunction) {
                this.addEquation(equation, extraArgs);
            }
        } else if (typeof equationFunction !== "function") {
            throw new Error("The equationFunction is not in the correct format, make sure you put parenthesis around your ES6 inline function\nEx: ((x) => { return Math.sin(x); })");
        } else {
            //Add equation to list of equations in this graph
            if (extraArgs.id == undefined || extraArgs.id == "") {
                extraArgs.id = Object.keys(this.equations).length;
            }
            this.equations[extraArgs.id] = { equationFunction: equationFunction, extraArgs: extraArgs };

            //Now that the equation has been added to the Graph() object, draw it!
            this.drawEquation(equationFunction, extraArgs);
            return this; //return this class so that equations can be chained, removes the requirement of the "with" statement
        }

    }

    /**
     * Delete the equation from the graph given an index, either use numbers or strings
     * @param {number || string} index The index of the equation to be deleted from the Graph class
     * @returns {object} Returns the equation object that was deleted in case you want to reuse it later
     */
    deleteEquation(index) {
        var returnValue = this.equations[index];
        delete this.equations[index];
        //clean canvas and redraw all equations
        this.prepareCanvas();
        if (this.params.drawAxis) {
            this.drawAxis();
        }
        console.log(this.equations);
        for (var key of Object.keys(this.equations)) {
            console.log(key);
            //Change this one to DRAW equation since the equations already exist
            this.drawEquation(this.equations[key].equationFunction, this.equations[key].extraArgs);
        }
        return returnValue;
    }

    /**
     * This function actually draws the equation onto the graph - Should not be publicly accessible
     * @param {function} equationFunction Function in the form of ES6 syntax taking in one parameter and returning another
     * @param {object} extraArgs Check the specification on what properties are available for modifying
     */
    drawEquation(equationFunction, extraArgs) {
        //Define function in arrow syntax to keep the same `this` value (the Graph class)
        var drawAllCartesianPoints = (points) => {
            //All y-values: points.map((point) => point[1])
            var minmaxY = getMinMax(points.map((point) => point[1]));
            var minmaxY = getMinMax(points.map((point) => point[1])); //Gets the minimum and maximum y-values
            //console.log(`Equation:\nMinimum-Y: ${minmaxY.min}\nMaximum-Y: ${minmaxY.max}`);
            this.ctx.setLineDash((extraArgs.lineDash != undefined) ? extraArgs.lineDash : []);
            this.ctx.strokeStyle = extraArgs.color;
            this.ctx.beginPath();
            for (var h = 0; h < points.length; h++) {
                var point = points[h];
                if (h != 0) {
                    //If not first point, look behind one point to calculate change in distance
                    var previousPoint = points[h - 1];
                    var currentPoint = points[h];
                    /*
                        a = distance between previous-current
                    */
                    var a = distanceBetweenTwoPoints(previousPoint[0], previousPoint[1], currentPoint[0], currentPoint[1]);
                    //If the distance between just two points is close to the difference in min/max of the function, then it must be a vertical asymptote
                    if (Math.ceil(a) >= Math.ceil(minmaxY.max - minmaxY.min)) {
                        this.ctx.moveTo(point[0] * this.params.scaleFactor, point[1] * this.params.scaleFactor);
                    } else {
                        //draw line normally
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
        };

        if (extraArgs.type !== "cartesian" && extraArgs.type !== "polar" && extraArgs.type !== "parametric") {
            extraArgs.type = "cartesian";
        }
        if (extraArgs.type == "cartesian") {
            var points = [];
            for (var x = this.xRange[0] / this.params.scaleFactor; x <= this.xRange[1] / this.params.scaleFactor; x += this.params.interval) {
                var y = equationFunction(x);
                if (isNaN(y) || !isFinite(y)) {
                    //Skip
                } else {
                    //Add [x, y] to array only if the y value also falls in the interval of the axes shown
                    if (y * this.params.scaleFactor > this.yRange[0] && y * this.params.scaleFactor < this.yRange[1]) {
                        points.push([x, y]);
                    }
                }
            }
            drawAllCartesianPoints(points);
        } else if (extraArgs.type == "polar") {
            //Convert from polar to rectangular OR gather all polar points into rectangular format
            //(r, @) --> (x, y))? ==== (x=rcos(@), y=rsin(@))
            if (!Array.isArray(extraArgs.thetaBounds)) {
                throw new Error("Either you did not provide your theta bounds or you forgot to make it an array");
            }
            var cartesianPoints = [];
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
                }
            }
            drawAllCartesianPoints(cartesianPoints);
        } else if (extraArgs.type == "parametric") {
            if (!Array.isArray(extraArgs.tBounds)) {
                throw new Error("Either you did not provide your t bounds or you forgot to make it an array");
            }
            var cartesianPoints = [];
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
                }
            }
            drawAllCartesianPoints(cartesianPoints);
        }
    }

    /**
     * This function closes the graph for further modification
     * @returns {undefined} Should not return anything
     */
    finalizeGraph() {
        //Add padding in canvas to all 4 sides of the graph, maybe 5px on all 4 sides by increasing the width
        //Scale canvas by 10 times

        //this.ctx.scale(2, 2);
        //this.ctx.restore();
        //oversampleCanvas(this.canvasElement, this.ctx, 4);
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

class RayDiagram {
    constructor(canvas, mirrorOrLens, concaveOrConvex, originalPosition, width) {
        this.canvas = canvas;
        this.mirrorOrLens = mirrorOrLens; //"mirror" or "lens"
        this.concaveOrConvex = concaveOrConvex; //"concave" or "convex"
        this.originalPosition = originalPosition;
        var height = 3 / 10 * width;
        this.canvas.width = width;
        this.canvas.height = height;
        this.originalCanvasWidth = width;
        this.originalCanvasHeight = height;
        this.ctx = this.canvas.getContext("2d");
        this.humanPos = { x: 0, y: 0 };
        this.raysDrawn = false;
        oversampleCanvas(this.canvas, this.ctx, 8);
        this.drawStage();
    }
    drawStage() {
        this.ctx.beginPath();
        //Draw platform line
        this.ctx.moveTo(0, this.originalCanvasHeight / 2);
        this.ctx.lineTo(this.originalCanvasWidth, this.originalCanvasHeight / 2);
        this.ctx.stroke();
        //Divide into 6 portions so we can have 2 focus points on each side and then one mirror/lens
        var interval = this.originalCanvasWidth / 6;
        //Use ES6 syntax to preserve the `this` keyword reference to the class
        var drawTickMark = (xPos, yPos, height) => {
            this.ctx.moveTo(xPos, yPos + height / 2);
            this.ctx.lineTo(xPos, yPos - height / 2);
            this.ctx.stroke();
        }
        this.ctx.font = "15px Arial";
        for (var xPos = 0; xPos <= this.originalCanvasWidth; xPos += interval) {
            if (xPos === 0) {
                //Do nothing, it's the beginning of the line
            } else if (xPos === this.originalCanvasWidth) {
                //Do nothing, it's the end of the line
            } else if (xPos === this.originalCanvasWidth / 2) {
                //Draw mirror or lens either concave or convex
                if (this.mirrorOrLens == "mirror") {
                    drawTickMark(xPos, this.originalCanvasHeight / 2, this.originalCanvasHeight - 15 - 20); //Total height to be 15 less

                    this.ctx.ellipse(this.originalCanvasWidth / 2 - (this.originalCanvasWidth / 24) / 4, this.originalCanvasHeight / 24, this.originalCanvasWidth / 24 / 4, this.originalCanvasHeight / 24, 0, 0, -Math.PI / 2, true);
                    this.ctx.moveTo(this.originalCanvasWidth / 2, this.originalCanvasHeight - 15 - 20);
                    this.ctx.ellipse(this.originalCanvasWidth / 2 - (this.originalCanvasWidth / 24) / 4, this.originalCanvasHeight * 23 / 24, this.originalCanvasWidth / 24 / 4, this.originalCanvasHeight / 24, 0, 0, Math.PI / 2, false);
                    //Draw curves on top and bottom of mirror
                } else {
                    //Must be Lens
                    drawTickMark(xPos, this.originalCanvasHeight / 2, this.originalCanvasHeight - 15);
                    if (this.concaveOrConvex == "convex") {
                        //Draw oval
                        this.ctx.moveTo(this.originalCanvasWidth / 2 + (this.originalCanvasWidth / 24) / 2, this.originalCanvasHeight / 2);
                        this.ctx.ellipse(this.originalCanvasWidth / 2, this.originalCanvasHeight / 2, (this.originalCanvasWidth / 24) / 2, (this.originalCanvasHeight - 15) / 2, 0, 0, 2 * Math.PI);
                    } else if (this.concaveOrConvex == "concave") {
                        //Draw backwards oval thingy * 2
                        //this.ctx.moveTo(this.originalCanvasWidth / 2 - (this.originalCanvasWidth / 24) / 2, this.originalCanvasHeight / 2);
                        this.ctx.beginPath();
                        //this.ctx.lineTo(this.originalCanvasWidth / 2 - (this.originalCanvasWidth / 24), this.originalCanvasHeight / 2 + 17);
                        this.ctx.ellipse(this.originalCanvasWidth / 2 - (this.originalCanvasWidth / 24), this.originalCanvasHeight / 2, (this.originalCanvasWidth / 24) / 2, (this.originalCanvasHeight - 15) / 2, 0, -Math.PI / 2, Math.PI / 2);
                        this.ctx.ellipse(this.originalCanvasWidth / 2 + (this.originalCanvasWidth / 24), this.originalCanvasHeight / 2, (this.originalCanvasWidth / 24) / 2, (this.originalCanvasHeight - 15) / 2, 0, Math.PI / 2, -Math.PI / 2, false);
                        this.ctx.closePath();
                    }
                }
            } else if (xPos === this.originalCanvasWidth * 1 / 6) {
                //Draw tick mark
                drawTickMark(xPos, this.originalCanvasHeight / 2, 10);
                //Then label with either C or 2F
                if (this.mirrorOrLens == "mirror") {
                    var width = this.ctx.measureText("C").width;
                    this.ctx.fillText("C", xPos - width / 2, this.originalCanvasHeight / 2 + 20);
                } else if (this.mirrorOrLens == "lens") {
                    var width = this.ctx.measureText("2F").width;
                    this.ctx.fillText("2F", xPos - width / 2, this.originalCanvasHeight / 2 + 20);
                }
            } else if (xPos === this.originalCanvasWidth * 2 / 6) {
                //Draw tick mark
                drawTickMark(xPos, this.originalCanvasHeight / 2, 10);
                //Then label with F
                var width = this.ctx.measureText("F").width;
                this.ctx.fillText("F", xPos - width / 2, this.originalCanvasHeight / 2 + 20);
            } else if (xPos === this.originalCanvasWidth * 4 / 6 && this.mirrorOrLens !== "mirror") {
                //Draw tick mark - mirrors don't need labels on opposite side
                drawTickMark(xPos, this.originalCanvasHeight / 2, 10);
                //Then label with F
                var width = this.ctx.measureText("F").width;
                this.ctx.fillText("F", xPos - width / 2, this.originalCanvasHeight / 2 + 20);
            } else if (xPos === this.originalCanvasWidth * 5 / 6 && this.mirrorOrLens !== "mirror") {
                //Draw tick mark
                drawTickMark(xPos, this.originalCanvasHeight / 2, 10);
                //Then label with either C or F2
                var width = this.ctx.measureText("2F").width;
                this.ctx.fillText("2F", xPos - width / 2, this.originalCanvasHeight / 2 + 20);
            }
        }
        //Call drawHuman
        var humanXPos = 0;
        switch (this.originalPosition) {
            //Farther than the center of curvature for mirrors
            case ">C":
                humanXPos = this.originalCanvasWidth * 1 / 6 / 2;
                break;
                //On the center of curvature (for mirrors)
            case "C":
                humanXPos = this.originalCanvasWidth * 1 / 6;
                break;
                //2F on the left of the lens
            case "2F":
                humanXPos = this.originalCanvasWidth * 1 / 6;
                break;
                //Greater than 2F on the left of the lens
            case ">2F":
                humanXPos = this.originalCanvasWidth * 1 / 6 / 2;
                break;
                //In between C and F on the left for mirrors
            case "2F>x>F":
                humanXPos = this.originalCanvasWidth * 3 / 6 / 2;
                break;
                //In between C and F on the left for mirrors
            case "C>x>F":
                humanXPos = this.originalCanvasWidth * 3 / 6 / 2;
                break;
                //F on the left for mirrors and lens
            case "F":
                humanXPos = this.originalCanvasWidth * 2 / 6;
                break;
                //In between F and mirror
            case "F>x>mirror":
                humanXPos = this.originalCanvasWidth * 5 / 6 / 2;
                break;
                //In between F and lens
            case "F>x>lens":
                humanXPos = this.originalCanvasWidth * 5 / 6 / 2;
                break;
                //Between convex mirror and -F
            case "mirror>x>-F":
                humanXPos = this.originalCanvasWidth * 7 / 6 / 2;
                break;
                //Between convex mirror and -2F
            case "mirror>x>-2F":
                humanXPos = this.originalCanvasWidth * 11 / 6 / 2;
                break;
                /* The human will never be on the right side of the lens
                //F on the right for lens
            case "-F":
                break;
                //2F on the right for lens
            case "-2F":
                break;
                */
        }
        this.humanPos = this.drawHuman(humanXPos, this.originalCanvasHeight / 2, this.originalCanvasHeight / 300);
        //console.log(this.humanPos);
    }
    drawHuman(x, y, scale = 1) {
        /*
       O
      \|/
       |
       /\
        x,y right in between the legs
        */
        //draw stick figure at x, y with a scale
        //this.ctx.fillText("O\n\\|/\n|\n/\\", x, y);
        var humanHeight = 0;
        var headRadius = 7;
        var bodyHeight = 30;
        var armLength = 18;
        var feetLength = armLength;
        //First: find the core
        var centerX = x;
        var centerY = y - scale * bodyHeight;

        //this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        //this.ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI);
        //Draw the arms
        this.ctx.lineTo(centerX + armLength * scale * Math.cos(Math.PI / 4), centerY - armLength * scale * Math.sin(Math.PI / 4));
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(centerX - armLength * scale * Math.cos(Math.PI / 4), centerY - armLength * scale * Math.sin(Math.PI / 4));
        //Connect to the feet
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(centerX, y - (scale * bodyHeight) / 2);
        //Draw the feet
        this.ctx.lineTo(centerX + feetLength * scale * Math.cos(Math.PI / 4), (y - (scale * bodyHeight) / 2) + feetLength * scale * Math.sin(Math.PI / 4));
        this.ctx.moveTo(centerX, y - (scale * bodyHeight) / 2);
        this.ctx.lineTo(centerX - feetLength * scale * Math.cos(Math.PI / 4), (y - (scale * bodyHeight) / 2) + feetLength * scale * Math.sin(Math.PI / 4));
        //Go back up and draw the neck
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(centerX, centerY - armLength * scale * Math.sin(Math.PI / 4));
        //Go higher and draw face
        this.ctx.moveTo(centerX + headRadius, centerY - scale * (armLength * Math.sin(Math.PI / 4) + headRadius));
        this.ctx.arc(centerX, centerY - scale * (armLength * Math.sin(Math.PI / 4) + headRadius), headRadius, 0, 2 * Math.PI, false);
        this.ctx.stroke();
        humanHeight = centerY - scale * (armLength * Math.sin(Math.PI / 4) + 2 * headRadius);
        return { x: x, y: humanHeight };
    }
    toggleRays() {
        //Have three colors ready
        var colors = [];
        colors[0] = (arguments[0]) ? arguments[0] : "red";
        colors[1] = (arguments[1]) ? arguments[1] : "blue";
        colors[2] = (arguments[2]) ? arguments[2] : "green";
        //Start at human's head, draw 2-3 lines in directions depending on concavity and mirror/lens
        console.log(colors);

        if (this.raysDrawn == true) {
            //Clear canvas and reset
            this.ctx.clearRect(0, 0, this.originalCanvasWidth, this.originalCanvasHeight);
            this.ctx.beginPath();
            this.ctx.setLineDash([]);
            this.drawStage();
            console.log("Reset");
            this.raysDrawn = false;
        } else {
            //Draw the rays!!

            /*Ray #1 -
                    Concave mirrors:
                    Ray#1: to mirror, then bounce back to focus
                    Ray#2: through focus to mirror, bounce horizontally back
            
                    convex mirrors:
                    Ray#1: to mirror, then bounce backwards away from focus (line dash through focus)
                    Ray#2: through mirror dashed to focus, bounce backwards horizontally
            
                    convex lens:
                    Ray#1: to lens, through focus
                    Ray#2: through center (if F>x>lens then extend dotted backwards)
                    Ray#3: to focus, through lens
            
                    concave lens:
                    Ray#1: to lens, dash backwards to focus, launch forwards
                    Ray#2: 
                    */
            this.ctx.save();

            //Ray#1:
            this.ctx.beginPath();
            this.ctx.strokeStyle = colors[0];
            this.ctx.moveTo(this.humanPos.x, this.humanPos.y);
            this.ctx.lineTo(this.originalCanvasWidth / 2, this.humanPos.y);
            this.ctx.stroke();
            if (this.concaveOrConvex == "concave" && this.mirrorOrLens == "mirror") {
                //Find F, connect to F w/ solid line, and then extend all the way

                //Altitude of F onto ray going directly to mirror is at x of F and y of ray (this.originalCanvasWidth * 2 / 6, this.humanPos.y)
                //F is at (this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2)
                //Current point is (this.originalCanvasWidth / 2, this.humanPos.y)
                /*
                           Law of cosines: a^2 + b^2 - 2abcos(Cdegrees) = c^2
                           Cdegrees=???
                           arccos[(c^2 - a^2 - b^2) / (-2ab)] = Cdegrees
                           a = distance between previous-current
                           b = distance between current-next
                           c = distance between previous-next
                       */
                var a = distanceBetweenTwoPoints(this.originalCanvasWidth * 2 / 6, this.humanPos.y, this.originalCanvasWidth / 2, this.humanPos.y);
                var b = distanceBetweenTwoPoints(this.originalCanvasWidth / 2, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2);
                var c = distanceBetweenTwoPoints(this.originalCanvasWidth * 2 / 6, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2);
                var angle = Math.acos(((c * c) - (a * a) - (b * b)) / (-2 * a * b));
                var magnitude = 2 * this.originalCanvasHeight;
                var finalX = this.originalCanvasWidth / 2 - magnitude * Math.cos(angle);
                var finalY = this.humanPos.y + magnitude * Math.sin(angle);
                this.ctx.lineTo(finalX, finalY);

                if (this.humanPos.x > this.originalCanvasWidth * 2 / 6) {
                    this.ctx.stroke();
                    this.ctx.beginPath();
                    this.ctx.setLineDash([10, 5]);
                    this.ctx.moveTo(this.originalCanvasWidth / 2, this.humanPos.y);
                    finalX = this.originalCanvasWidth / 2 + magnitude * Math.cos(angle);
                    finalY = this.humanPos.y - magnitude * Math.sin(angle);
                    this.ctx.lineTo(finalX, finalY);
                    this.ctx.stroke();
                    this.ctx.setLineDash([]);
                    this.ctx.beginPath();
                    this.ctx.setLineDash([]);
                    this.ctx.stroke();
                }
            } else if (this.concaveOrConvex == "convex" && this.mirrorOrLens == "mirror") {
                //Find F, connect to F w/ dotted line, move back to mirror, and then extend on opposite direction

                //Altitude of F onto ray going directly to mirror is at x of F and y of ray (this.originalCanvasWidth * 2 / 6, this.humanPos.y)
                //F is at (this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2)
                //Current point is (this.originalCanvasWidth / 2, this.humanPos.y)
                this.ctx.stroke();
                //this.ctx.beginPath();
                this.ctx.setLineDash([10, 5]);
                this.ctx.lineTo(this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(this.originalCanvasWidth / 2, this.humanPos.y);
                this.ctx.setLineDash([]);

                var a = distanceBetweenTwoPoints(this.originalCanvasWidth * 2 / 6, this.humanPos.y, this.originalCanvasWidth / 2, this.humanPos.y);
                var b = distanceBetweenTwoPoints(this.originalCanvasWidth / 2, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2);
                var c = distanceBetweenTwoPoints(this.originalCanvasWidth * 2 / 6, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2);
                var angle = Math.acos(((c * c) - (a * a) - (b * b)) / (-2 * a * b));
                var magnitude = 2 * this.originalCanvasHeight;
                var finalX = this.originalCanvasWidth / 2 + magnitude * Math.cos(angle);
                var finalY = this.humanPos.y - magnitude * Math.sin(angle);
                this.ctx.lineTo(finalX, finalY);
            } else if (this.concaveOrConvex == "convex" && this.mirrorOrLens == "lens") {
                //Find -F on other side, connect to -F w/ solid line, then extend

                //Altitude of -F onto ray going directly to mirror is at x of F and y of ray (this.originalCanvasWidth * 4 / 6, this.humanPos.y)
                //F is at (this.originalCanvasWidth * 4 / 6, this.originalCanvasHeight / 2)
                //Current point is (this.originalCanvasWidth / 2, this.humanPos.y)
                var a = distanceBetweenTwoPoints(this.originalCanvasWidth * 4 / 6, this.humanPos.y, this.originalCanvasWidth / 2, this.humanPos.y);
                var b = distanceBetweenTwoPoints(this.originalCanvasWidth / 2, this.humanPos.y, this.originalCanvasWidth * 4 / 6, this.originalCanvasHeight / 2);
                var c = distanceBetweenTwoPoints(this.originalCanvasWidth * 4 / 6, this.humanPos.y, this.originalCanvasWidth * 4 / 6, this.originalCanvasHeight / 2);
                var angle = Math.acos(((c * c) - (a * a) - (b * b)) / (-2 * a * b));
                var magnitude = 2 * this.originalCanvasHeight;
                var finalX = this.originalCanvasWidth / 2 + magnitude * Math.cos(angle);
                var finalY = this.humanPos.y + magnitude * Math.sin(angle);
                this.ctx.lineTo(finalX, finalY);
                if (this.humanPos.x > this.originalCanvasWidth * 2 / 6) {
                    this.ctx.stroke();
                    this.ctx.beginPath();
                    this.ctx.setLineDash([10, 5]);
                    this.ctx.moveTo(this.originalCanvasWidth / 2, this.humanPos.y);
                    finalX = this.originalCanvasWidth / 2 - magnitude * Math.cos(angle);
                    finalY = this.humanPos.y - magnitude * Math.sin(angle);
                    this.ctx.lineTo(finalX, finalY);
                    this.ctx.stroke();
                    this.ctx.setLineDash([]);
                    this.ctx.beginPath();
                    this.ctx.setLineDash([]);
                    this.ctx.stroke();
                }

            } else if (this.concaveOrConvex == "concave" && this.mirrorOrLens == "lens") {
                //Find F, connect back to F w/ dotted line, move back to mirror, and then extend in opposite direction

                //Altitude of F onto ray going directly to mirror is at x of F and y of ray (this.originalCanvasWidth * 2 / 6, this.humanPos.y)
                //F is at (this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2)
                //Current point is (this.originalCanvasWidth / 2, this.humanPos.y)
                this.ctx.stroke();
                //this.ctx.beginPath();
                this.ctx.setLineDash([10, 5]);
                this.ctx.lineTo(this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(this.originalCanvasWidth / 2, this.humanPos.y);
                this.ctx.setLineDash([]);

                var a = distanceBetweenTwoPoints(this.originalCanvasWidth * 2 / 6, this.humanPos.y, this.originalCanvasWidth / 2, this.humanPos.y);
                var b = distanceBetweenTwoPoints(this.originalCanvasWidth / 2, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2);
                var c = distanceBetweenTwoPoints(this.originalCanvasWidth * 2 / 6, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2);
                var angle = Math.acos(((c * c) - (a * a) - (b * b)) / (-2 * a * b));
                var magnitude = 2 * this.originalCanvasHeight;
                var finalX = this.originalCanvasWidth / 2 + magnitude * Math.cos(angle);
                var finalY = this.humanPos.y - magnitude * Math.sin(angle);
                this.ctx.lineTo(finalX, finalY);
            }

            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.setLineDash([]);
            this.ctx.moveTo(this.humanPos.x, this.humanPos.y);
            this.ctx.strokeStyle = colors[1];
            //Ray#2
            if (this.concaveOrConvex == "concave" && this.mirrorOrLens == "mirror") {
                //Draw line through focus to mirror, then reflect back horizonally and extend (unless parallel to mirror, in which case do nothing)

                //Altitude of F onto ray going directly to mirror is at x of F and y of ray (this.originalCanvasWidth * 2 / 6, this.humanPos.y)
                //F is at (this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2)
                //Current point is (this.humanPos.x, this.humanPos.y)
                if (this.humanPos.x == this.originalCanvasWidth * 2 / 6) {
                    //Object is on focal point, nothing can be drawn
                    this.ctx.font = "25px Arial";
                    this.ctx.fillText(":( Whoops, nothing to see here", this.originalCanvasWidth / 1.9, this.originalCanvasHeight / 4);
                } else if (this.humanPos.x > this.originalCanvasWidth * 2 / 6) {
                    //Object is F>x>mirror, different instructions
                    //Draw line back to F, then all the way to mirror, horizontally backwards solid and forwards dotted
                    this.ctx.lineTo(this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2);
                    this.ctx.moveTo(this.humanPos.x, this.humanPos.y);
                    var a = distanceBetweenTwoPoints(this.humanPos.x, this.originalCanvasHeight / 2, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2); //Distance between ground and F
                    var b = distanceBetweenTwoPoints(this.humanPos.x, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2); //Distance between head and F
                    var c = distanceBetweenTwoPoints(this.humanPos.x, this.humanPos.y, this.humanPos.x, this.originalCanvasHeight / 2); //Distance between ground and head

                    //var b = distance b/t head & F, so b * Math.cos(angle) is proportional to (this.originalCanvasWidth / 2 - this.humanPos.x)
                    //so (this.originalCanvasWidth / 2 - this.humanPos.x) / (b * Math.cos(angle)) = dilation
                    var angle = Math.acos(((c * c) - (a * a) - (b * b)) / (-2 * a * b));
                    var magnitude = b * (this.originalCanvasWidth / 2 - this.humanPos.x) / (b * Math.cos(angle));
                    var finalX = this.humanPos.x + magnitude * Math.cos(angle);
                    var finalY = this.humanPos.y - magnitude * Math.sin(angle);
                    this.ctx.lineTo(finalX, finalY);
                    this.ctx.lineTo(finalX - 2 * this.originalCanvasHeight, finalY);
                    this.ctx.stroke();
                    this.ctx.beginPath();
                    this.ctx.setLineDash([10, 5]);
                    this.ctx.moveTo(finalX, finalY);
                    this.ctx.lineTo(finalX + 2 * this.originalCanvasHeight, finalY);

                } else {
                    /*
                           Law of cosines: a^2 + b^2 - 2abcos(Cdegrees) = c^2
                           Cdegrees=???
                           arccos[(c^2 - a^2 - b^2) / (-2ab)] = Cdegrees
                           a = distance between previous-current
                           b = distance between current-next
                           c = distance between previous-next
                       */
                    var a = distanceBetweenTwoPoints(this.humanPos.x, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.humanPos.y); //Distance between head and altitude of F
                    var b = distanceBetweenTwoPoints(this.humanPos.x, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2); //Distance between head and F
                    var c = distanceBetweenTwoPoints(this.originalCanvasWidth * 2 / 6, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2); //Distance between F and altitude of F

                    //var b = distance b/t head & F, so b * Math.cos(angle) is proportional to (this.originalCanvasWidth / 2 - this.humanPos.x)
                    //so (this.originalCanvasWidth / 2 - this.humanPos.x) / (b * Math.cos(angle)) = dilation
                    var angle = Math.acos(((c * c) - (a * a) - (b * b)) / (-2 * a * b));
                    var magnitude = b * (this.originalCanvasWidth / 2 - this.humanPos.x) / (b * Math.cos(angle));
                    var finalX = this.humanPos.x + magnitude * Math.cos(angle);
                    var finalY = this.humanPos.y + magnitude * Math.sin(angle);
                    this.ctx.lineTo(finalX, finalY);
                    this.ctx.lineTo(finalX - 2 * this.originalCanvasHeight, finalY);
                }

            } else if (this.concaveOrConvex == "convex" && this.mirrorOrLens == "mirror") {
                //Draw line through mirror to F, make dotted on other side
                //then come back to mirror and make a horizontal line, dotted on left and solid on right
                var a = distanceBetweenTwoPoints(this.humanPos.x, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.humanPos.y); //Distance between head and altitude of F
                var b = distanceBetweenTwoPoints(this.humanPos.x, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2); //Distance between head and F
                var c = distanceBetweenTwoPoints(this.originalCanvasWidth * 2 / 6, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2); //Distance between F and altitude of F
                //var b = distance b/t head & F, so b * Math.cos(angle) is proportional to (this.originalCanvasWidth / 2 - this.humanPos.x)
                //so (this.originalCanvasWidth / 2 - this.humanPos.x) / (b * Math.cos(angle)) = dilation
                var angle = Math.acos(((c * c) - (a * a) - (b * b)) / (-2 * a * b));
                //console.log(angle * 180 / Math.PI);
                var magnitude = b * (this.originalCanvasWidth / 2 - this.humanPos.x) / (b * Math.cos(angle));
                var finalX = this.humanPos.x + magnitude * Math.cos(angle);
                var finalY = this.humanPos.y - magnitude * Math.sin(angle);
                this.ctx.lineTo(finalX, finalY);
                this.ctx.lineTo(finalX + 2 * this.originalCanvasHeight, finalY);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(finalX, finalY);
                this.ctx.setLineDash([10, 5]);
                this.ctx.lineTo(this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2);
                this.ctx.moveTo(finalX, finalY);
                this.ctx.lineTo(finalX - 2 * this.originalCanvasHeight, finalY);
                this.ctx.stroke();

            } else if (this.concaveOrConvex == "convex" && this.mirrorOrLens == "lens") {
                if (this.humanPos.x > this.originalCanvasWidth * 2 / 6) {
                    //Yikes let's "pull it back"
                    //Line goes back to F, then all the way forwards to lens, but let's leave it blank out of laziness since the other two rays will suffice
                } else {
                    //Line straight through focus to lens, then horizontal through lens
                    var a = distanceBetweenTwoPoints(this.humanPos.x, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.humanPos.y); //Distance between head and altitude of F
                    var b = distanceBetweenTwoPoints(this.humanPos.x, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2); //Distance between head and F
                    var c = distanceBetweenTwoPoints(this.originalCanvasWidth * 2 / 6, this.humanPos.y, this.originalCanvasWidth * 2 / 6, this.originalCanvasHeight / 2); //Distance between F and altitude of F

                    //var b = distance b/t head & F, so b * Math.cos(angle) is proportional to (this.originalCanvasWidth / 2 - this.humanPos.x)
                    //so (this.originalCanvasWidth / 2 - this.humanPos.x) / (b * Math.cos(angle)) = dilation
                    var angle = Math.acos(((c * c) - (a * a) - (b * b)) / (-2 * a * b));
                    var magnitude = b * (this.originalCanvasWidth / 2 - this.humanPos.x) / (b * Math.cos(angle));
                    var finalX = this.humanPos.x + magnitude * Math.cos(angle);
                    var finalY = this.humanPos.y + magnitude * Math.sin(angle);
                    this.ctx.lineTo(finalX, finalY);
                    this.ctx.lineTo(finalX + 2 * this.originalCanvasHeight, finalY);
                }
            } else if (this.concaveOrConvex == "concave" && this.mirrorOrLens == "lens") {
                //Line straight through lens to -F on right side (dotted on right side; solid on left), then come back to lens where go backwards dotted line and forwards solid line horizontally

                //Altitude of F onto ray going directly to mirror is at x of F and y of ray (this.originalCanvasWidth * 4 / 6, this.humanPos.y)
                //-F is at (this.originalCanvasWidth * 4 / 6, this.originalCanvasHeight / 2)
                //Current point is (this.humanPos.x, this.humanPos.y)
                var a = distanceBetweenTwoPoints(this.originalCanvasWidth * 4 / 6, this.originalCanvasHeight / 2, this.humanPos.x, this.originalCanvasHeight / 2); //Distance between -F and ground
                var b = distanceBetweenTwoPoints(this.humanPos.x, this.humanPos.y, this.originalCanvasWidth * 4 / 6, this.originalCanvasHeight / 2); //Distance between head and -F
                var c = distanceBetweenTwoPoints(this.humanPos.x, this.humanPos.y, this.humanPos.x, this.originalCanvasHeight / 2); //Distance between head and ground

                //var b = distance b/t head & F, so b * Math.cos(angle) is proportional to (this.originalCanvasWidth / 2 - this.humanPos.x)
                //so (this.originalCanvasWidth / 2 - this.humanPos.x) / (b * Math.cos(angle)) = dilation
                var angle = Math.acos(((c * c) - (a * a) - (b * b)) / (-2 * a * b)); //By Alternate Interior angles, this angle is equivalent to the elicited one
                var magnitude = b * (this.originalCanvasWidth / 2 - this.humanPos.x) / (b * Math.cos(angle));
                var finalX = this.humanPos.x + magnitude * Math.cos(angle);
                var finalY = this.humanPos.y + magnitude * Math.sin(angle);
                this.ctx.lineTo(finalX, finalY);
                this.ctx.lineTo(finalX + 2 * this.originalCanvasHeight, finalY);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.setLineDash([10, 5]);
                this.ctx.moveTo(finalX, finalY);
                this.ctx.lineTo(this.originalCanvasWidth * 4 / 6, this.originalCanvasHeight / 2);
                this.ctx.moveTo(finalX, finalY);
                this.ctx.lineTo(finalX - 2 * this.originalCanvasHeight, finalY);
            }
            this.ctx.stroke();

            //Ray#3
            this.ctx.beginPath();
            this.ctx.setLineDash([]);
            this.ctx.moveTo(this.humanPos.x, this.humanPos.y);
            this.ctx.strokeStyle = colors[2];
            if (this.mirrorOrLens == "lens") {
                //Draw line straight from head through center of lens and all the way forward

                //current point = (this.humanPos.x, this.humanPos.y)
                //center point = (this.originalCanvasWidth / 2, this.originalCanvasHeight / 2)
                //third point to construct a triangle = (this.originalCanvasWidth / 2, this.humanPos.y)
                var a = distanceBetweenTwoPoints(this.humanPos.x, this.humanPos.y, this.originalCanvasWidth / 2, this.humanPos.y); //Distance between head and extra point
                var b = distanceBetweenTwoPoints(this.humanPos.x, this.humanPos.y, this.originalCanvasWidth / 2, this.originalCanvasHeight / 2); //Distance between head and center point
                var c = distanceBetweenTwoPoints(this.originalCanvasWidth / 2, this.humanPos.y, this.originalCanvasWidth / 2, this.originalCanvasHeight / 2); //Distance between center point and extra point
                var angle = Math.acos(((c * c) - (a * a) - (b * b)) / (-2 * a * b));
                var magnitude = 2 * this.originalCanvasHeight;
                var finalX = this.originalCanvasWidth / 2 + magnitude * Math.cos(angle);
                var finalY = this.originalCanvasHeight / 2 + magnitude * Math.sin(angle);
                this.ctx.lineTo(finalX, finalY);
                this.ctx.stroke();
                if (this.concaveOrConvex == "convex" && this.humanPos.x > this.originalCanvasWidth * 2 / 6) {
                    this.ctx.beginPath();
                    this.ctx.setLineDash([10, 5]);
                    this.ctx.moveTo(this.humanPos.x, this.humanPos.y);
                    finalX = this.originalCanvasWidth / 2 - magnitude * Math.cos(angle);
                    finalY = this.originalCanvasHeight / 2 - magnitude * Math.sin(angle);
                    this.ctx.lineTo(finalX, finalY);
                    this.ctx.stroke();
                }
            }
            this.ctx.strokeStyle = "black";
            //Once done drawing all the rays, draw arrows for all the line intersections
            this.raysDrawn = true;
        }
    }
}


//To check if lines intersect on a canvas - http://jsfiddle.net/justin_c_rounds/Gd2S2/
function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
    /*
            // it is worth noting that this should be the same as:
            x = line2StartX + (b * (line2EndX - line2StartX));
            y = line2StartX + (b * (line2EndY - line2StartY));
            */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
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