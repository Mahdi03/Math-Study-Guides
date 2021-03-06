document.body.onload = function() {
    //Added an HTML Include Before Everything else so that the HTML renders properly
    document.querySelectorAll("[htmlInclude]").forEach((element) => {
        var fileLink = element.getAttribute("htmlInclude");
        var fileRequest = new XMLHttpRequest();
        fileRequest.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var responseHTML = this.responseText.replace('<link href="styles.css" rel="stylesheet" />', '').replace('<script src="main.js" async><\/script>', '');
                    element.innerHTML = responseHTML;
                    /*var m = responseHTML.search("");
                    var n = responseHTML.search("<\/script>");
                    console.log("M: " + m + "N: " + n);
                    console.log(responseHTML);
                    console.log(responseHTML.substr(m + 8, n - (m + 8)));
                    eval(responseHTML.substr(m + 8, n - (m + 8))); //8 Is the Length of <script>*/
                } else if (this.status == 404) {
                    console.log("File " + fileLink + " not found!!");
                }
            }
        }
        fileRequest.open("GET", fileLink, false);
        fileRequest.send();
    });
    renderMath();
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