document.body.onload = function() {
    //Added an HTML Include Before Everything else so that the HTML renders properly
    document.querySelectorAll("[htmlInclude]").forEach((element) => {
        var fileLink = element.getAttribute("htmlInclude");
        var fileRequest = new XMLHttpRequest();
        fileRequest.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) { element.innerHTML = this.responseText.replace('<link href="styles.css" rel="stylesheet" />', '').replace('<script src="main.js" async></script>', ''); }
                if (this.status == 404) { console.log("File not found!!"); }
            }
        }
        fileRequest.open("GET", fileLink, false);
        fileRequest.send();
    });
    renderMath();
    addImportanceToFormulas();
    function renderMath() {
        
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