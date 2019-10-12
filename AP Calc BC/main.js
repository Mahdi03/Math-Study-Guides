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
};