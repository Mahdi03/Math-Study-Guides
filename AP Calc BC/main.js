document.body.onload = function() {
    var responseHTML;
    //Added an HTML Include Before Everything else so that the HTML renders properly
    document.querySelectorAll("[htmlInclude]").forEach((element) => {
        var fileLink = element.getAttribute("htmlInclude");
        var fileRequest = new XMLHttpRequest();
        fileRequest.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    responseHTML = this.responseText.replace('<link href="styles.css" rel="stylesheet" />', '').replace('<script src="main.js" async></script>', '');
                    element.innerHTML = responseHTML;
                } else if (this.status == 404) {
                    console.log("File not found!!");
                }
            }
        }
        fileRequest.open("GET", fileLink, false);
        fileRequest.send();
    });
    var m = str.search("<script>");
    var n = str.search("<\/script>");
    alert(responseHTML.substr(m + 8, n - (m + 8)));
    eval(responseHTML.substr(m + 8, n - (m + 8))); //8 Is the Length of <script>
    renderMath();
    addImportanceToFormulas();
};