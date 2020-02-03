document.body.onload = function() {
    renderMath();
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
        thirdPolarGraph.src = "https://www.desmos.com/calculator/uwvpvzcnsr?embed";
    };
    thirdPolarGraph.onload = function() {
        fourthPolarGraph.src = "https://www.desmos.com/calculator/jkn1oiaqpq?embed";
    };

    addImportanceToFormulas();
    removeImportanceFromElements();
    document.querySelectorAll("h1").forEach(function(element) {
        element.onclick = function(event) {
            var link = event.srcElement.attributes.redir.nodeValue;
            createAndClickLink(link);
        }
    });

    function createAndClickLink(link) {
        var a = document.createElement("a");
        a.href = link;
        a.click();
    }
};