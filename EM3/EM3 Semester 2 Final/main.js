document.body.onload = function() {
            //Replaced/Defined all math function tags
            //Defined Square Root Tag
            var sqrtTags = document.getElementsByTagName("sqrt");
            for (var e = 0; e < sqrtTags.length; e++) {
                var sqrtInput = sqrtTags[e].innerHTML;
                sqrtTags[e].innerHTML = "&radic;<span style='border-top: 0.5px solid black;'>" + sqrtInput + "</span>";
            }
            //Defined limit tags
            var limTags = document.getElementsByTagName("lim");
            for (var f = 0; f < limTags.length; f++) {
                var limAs = limTags[f].getAttribute("as");
                var limApproaches = limTags[f].getAttribute("approaches");
                limTags[f].innerHTML = "<div class='fraction'><div class='top'><var>lim</var></div><div class='bottom'><var>" + limAs + "</var>&rarr;" + limApproaches + "</div></div>";
            }
            //Defined trig tags
            var sinTags = document.getElementsByTagName("sin");
            for (var j = 0; j < sinTags.length; j++) {
                var sinInput = sinTags[j].innerHTML;
                sinTags[j].innerHTML = "sin(<var>" + sinInput + "</var>)";
            }
            var cosTags = document.getElementsByTagName("cos");
            for (var k = 0; k < cosTags.length; k++) {
                var cosInput = cosTags[k].innerHTML;
                cosTags[k].innerHTML = "cos(<var>" + cosInput + "</var>)";
            }
            var tanTags = document.getElementsByTagName("tan");
            for (var l = 0; l < tanTags.length; l++) {
                var tanInput = tanTags[l].innerHTML;
                tanTags[l].innerHTML = "tan(<var>" + tanInput + "</var>)";
            }
            var cscTags = document.getElementsByTagName("csc");
            for (var m = 0; m < cscTags.length; m++) {
                var cscInput = cscTags[m].innerHTML;
                cscTags[m].innerHTML = "csc(<var>" + cscInput + "</var>)";
            }
            var secTags = document.getElementsByTagName("sec");
            for (var n = 0; n < secTags.length; n++) {
                var secInput = secTags[n].innerHTML;
                secTags[n].innerHTML = "sec(<var>" + secInput + "</var>)";
            }
            var cotTags = document.getElementsByTagName("cot");
            for (var o = 0; o < cotTags.length; l++) {
                var cotInput = cotTags[o].innerHTML;
                cotTags[o].innerHTML = "cot(<var>" + cotInput + "</var>)";
            }
            //Defined log tag and ln tag
            var logTags = document.getElementsByTagName("log");
            for (var p = 0; p < logTags.length; p++) {
                var logInput = logTags[p].innerHTML;
                if (logTags[p].getAttribute("base") !== null) {
                    var base = logTags[p].getAttribute("base");
                    logTags[p].innerHTML = "log<sub>" + base + "</sub>(<var>" + logInput + "</var>)";
                } else {
                    logTags[p].innerHTML = "log(<var>" + logInput + "</var>)";
                }
            }
            var lnTags = document.getElementsByTagName("ln");
            for (var q = 0; q < lnTags.length; q++) {
                var lnInput = lnTags[q].innerHTML;
                lnTags[q].innerHTML = "ln (<var>" + lnInput + "</var>)";
            }
            //Defined vector tag
            var vectorTags = document.getElementsByTagName("vector");
            for (var i = 0; i < vectorTags.length; i++) {
                var vectorName = vectorTags[i].innerHTML;
                vectorTags[i].innerHTML = '<div class="outer"><div class="inner"><var>&rarr;</var></div><div class="inner"><var>' + vectorName + '</var></div></div>';
            }
            //Added Sigma tags
            var sigmaTags = document.getElementsByTagName("sigma");
            for (var r = 0; r < sigmaTags.length; r++) {
                var sigmaInput = sigmaTags[r].innerHTML;
                var startValue = sigmaTags[r].getAttribute("start") ? sigmaTags[r].getAttribute("start") : "";
                var endValue = sigmaTags[r].getAttribute("end") ? sigmaTags[r].getAttribute("end") : "";
                sigmaTags[r].innerHTML = "<table class='sigmaTag'><tr><td>" + endValue + "</td></tr><tr><td>&Sigma;</td><td>(" + sigmaInput + ")</td></tr><tr><td>"+ startValue + "</td></tr></table>";
            }


            //Added Graphs To Each iFrame
            //Set 6 Main Trigonometric Function's Graphs
            var sinGraph = document.querySelector("#sinGraph");
            var cosGraph = document.querySelector("#cosGraph");
            var tanGraph = document.querySelector("#tanGraph");
            var cscGraph = document.querySelector("#cscGraph");
            var secGraph = document.querySelector("#secGraph");
            var cotGraph = document.querySelector("#cotGraph");
            //Logarithmic Graphs
            var logGraph = document.querySelector("#logGraph");
            var lnGraph = document.querySelector("#lnGraph");
            //6 Inverse Trigonometric Function's Graphs
            var invSinGraph = document.querySelector("#invSinGraph");
            var invCosGraph = document.querySelector("#invCosGraph");
            var invTanGraph = document.querySelector("#invTanGraph");
            var invCscGraph = document.querySelector("#invCscGraph");
            var invSecGraph = document.querySelector("#invSecGraph");
            var invCotGraph = document.querySelector("#invCotGraph");
            //Rational Functions
            var rationalFunction = document.querySelector("#rationalFunction");
            var anotherRationalFunction = document.querySelector("#anotherRationalFunction");
            //Polar Graphs
            var firstPolarGraph = document.querySelector("#firstPolarGraph");
            var secondPolarGraph = document.querySelector("#secondPolarGraph");
            var thirdPolarGraph = document.querySelector("#thirdPolarGraph");
            var fourthPolarGraph = document.querySelector("#fourthPolarGraph");

            //Actually Loading Each iFrame Successively
            sinGraph.src = "https://www.desmos.com/calculator/s7xlbqwzqf?embed";
            sinGraph.onload = function() {
                cosGraph.src = "https://www.desmos.com/calculator/lkzm6zwt6w?embed";
            };
            cosGraph.onload = function() {
                tanGraph.src = "https://www.desmos.com/calculator/hcbie01g6g?embed";
            };
            tanGraph.onload = function() {
                cscGraph.src = "https://www.desmos.com/calculator/k8twn9qsof?embed";
            };
            cscGraph.onload = function() {
                secGraph.src = "https://www.desmos.com/calculator/qfxuiyvyg6?embed";
            };
            secGraph.onload = function() {
                cotGraph.src = "https://www.desmos.com/calculator/27vzqdaiuu?embed";
            };
            cotGraph.onload = function() {
                logGraph.src = "https://www.desmos.com/calculator/jzeys9kket?embed";
            };
            logGraph.onload = function() {
                lnGraph.src = "https://www.desmos.com/calculator/8mfm4fnxjl?embed";
            };
            lnGraph.onload = function() {
                invSinGraph.src = "https://www.desmos.com/calculator/zw5zb9euh1?embed";
            };
            invSinGraph.onload = function() {
                invCosGraph.src = "https://www.desmos.com/calculator/bkl2nqxi4j?embed";
            };
            invCosGraph.onload = function() {
                invTanGraph.src = "https://www.desmos.com/calculator/yrkqujioyy?embed";
            };
            invTanGraph.onload = function() {
                invCscGraph.src = "https://www.desmos.com/calculator/dempgdshcw?embed";
            };
            invCscGraph.onload = function() {
                invSecGraph.src = "https://www.desmos.com/calculator/9bsv5bu4ph?embed";
            };
            invSecGraph.onload = function() {
                invCotGraph.src = "https://www.desmos.com/calculator/gwhodciask?embed";
            };
            invCotGraph.onload = function() {
                rationalFunction.src = "https://www.desmos.com/calculator/qgumdlzjnz?embed";
            };
            rationalFunction.onload = function() {
                anotherRationalFunction.src = "https://www.desmos.com/calculator/hap7szxr0v?embed";
            };
            anotherRationalFunction.onload = function() {
                firstPolarGraph.src = "https://www.desmos.com/calculator/o67beou5v4?embed";
            };
            firstPolarGraph.onload = function() {
                secondPolarGraph.src = "https://www.desmos.com/calculator/cb7hwiprt0?embed";
            };
            secondPolarGraph.onload = function() {
                thirdPolarGraph.src = "https://www.desmos.com/calculator/uwvpvzcnsr?embed";s
            };
            thirdPolarGraph.onload = function() {
                fourthPolarGraph.src = "https://www.desmos.com/calculator/jkn1oiaqpq?embed";
            };
            function addImportanceToFormulas() {
        		var elementQueryList = [".rules td"]; //Use CSS Selectors Here
        		elementQueryList.forEach((elementQuery) => {
            	var elementList = document.querySelectorAll(elementQuery);
            	elementList.forEach((element) => {
                element.classList.add("important"); //This line adds a class that has predefined styles in the CSS file
            });
        });
    }
    addImportanceToFormulas();
        };

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
