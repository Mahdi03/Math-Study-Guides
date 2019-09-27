document.body.onload = function() {
            //Added an HTML Include Before Everything else so that the HTML renders properly
            document.querySelectorAll("[htmlInclude]").forEach((element) => {
            var fileLink = element.getAttribute("htmlInclude");
            var fileRequest = new XMLHttpRequest();
            fileRequest.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { element.innerHTML = this.responseText; }
                    if (this.status == 404) { console.log("File not found!!"); }
                }
            }
            fileRequest.open("GET", fileLink, true);
            fileRequest.send();
            fileRequest.onload = renderMath;
        });
            function renderMath() {
            //Replaced/Defined all math function 
            //Defined all Sqrt Tags
            var sqrtTags = document.getElementsByTagName("sqrt");
            for (var e = 0; e < sqrtTags.length; e++) {
                var sqrtInput = sqrtTags[e].innerHTML;
                sqrtTags[e].innerHTML = "&radic;<span style='border-top: 0.5px solid black;'>" + sqrtInput + "</span>";
            }
            //Defined all Limit Tags
            var limTags = document.getElementsByTagName("lim");
            for (var f = 0; f < limTags.length; f++) {
                var limAs = limTags[f].getElementsByTagName("as")[0].innerText;
                var limApproaches = limTags[f].getElementsByTagName("approaches")[0].innerHTML;
                var limOf = limTags[f].getElementsByTagName("of")[0].innerHTML;
                limTags[f].innerHTML = "<table class='limTable'><tr><td><var>lim</var></td><td rowspan='2'><var>" + limOf + "</var></td></tr><tr><td><var>" + limAs + "</var>&rarr;" + limApproaches + "</td></tr></table>";
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
            for (var o = 0; o < cotTags.length; o++) {
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
            //Defined Derivative Tags (Will need to be changed further as we learn new concepts)
            //<nDeriv of="f" respectTo="t"></nDeriv> === df/dt
            var derivativeTags = document.getElementsByTagName("derivative");
            for (var r = 0; r < derivativeTags.length; r++) {
                var derivativeOf = derivativeTags[r].getAttribute("of") ? derivativeTags[r].getAttribute("of") : "";
                var derivativeRespectTo = derivativeTags[r].getAttribute("respectTo") ? derivativeTags[r].getAttribute("respectTo") : "x";
                derivativeTags[r].innerHTML = "<div class='fraction'><div class='top'>d<var>" + derivativeOf + "</var></div><div class='bottom'>d<var>" + derivativeRespectTo + "</var></div></div>";
            }
            /*
            //Defined vector tag
            var vectorTags = document.getElementsByTagName("vector");
            for (var i = 0; i < vectorTags.length; i++) {
                var vectorName = vectorTags[i].innerHTML;
                vectorTags[i].innerHTML = '<div class="outer"><div class="inner"><var>&rarr;</var></div><div class="inner"><var>' + vectorName + '</var></div></div>';
            }
            */
            //Added all graphs to iFrames
            //Set Discontinuity Graphs
            var infiniteDiscontinuityGraph = document.querySelector("#infiniteDiscontinuityGraph");
            var oscillatingDiscontinuityGraph = document.querySelector("#oscillatingDiscontinuityGraph");
            var removableDiscontinuityGraph = document.querySelector("#removableDiscontinuityGraph");
            var jumpDiscontinuityGraph = document.querySelector("#jumpDiscontinuityGraph");
            //Actually loading each iFrame successively
            infiniteDiscontinuityGraph.src = "https://www.desmos.com/calculator/0ker0rtxk2?embed";
            infiniteDiscontinuityGraph.onload = function() {
                oscillatingDiscontinuityGraph.src = "https://www.desmos.com/calculator/zd8knstmsy?embed";
            };
            oscillatingDiscontinuityGraph.onload = function() {
                removableDiscontinuityGraph.src = "https://www.desmos.com/calculator/genhgvnlx8?embed";
            };
            removableDiscontinuityGraph.onload = function() {
                jumpDiscontinuityGraph.src = "https://www.desmos.com/calculator/xnwrljyr3c?embed";
            };
            }
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
