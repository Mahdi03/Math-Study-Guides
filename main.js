document.querySelectorAll("[redir]").forEach((element) => {
    element.onclick = function() {
        var link = element.getAttribute("redir");
        window.location.assign(link);
    }
});

//document.body.onload = function() {
//Added an HTML Include Before Everything else so that the HTML renders properly
document.querySelectorAll("[htmlInclude]").forEach((element) => {
    var fileLink = element.getAttribute("htmlInclude");
    //Take file name, remove space, make first letter lowercase, and remove ".html" to make into the ToggleButton id
    var toggleButtonQuerySelector = "#" + (fileLink.substr(0, 1).toLowerCase() + fileLink.substring(1)).split(" ").join("").replace(".html", "") + "ToggleButton";
    var toggleButton = document.querySelector(toggleButtonQuerySelector);

    function getFile() {
        //Give it a wait logo so that the user knows that the website isn't frozen
        document.body.parentElement.style.cursor = "wait";
        toggleButton.innerHTML = loadingLogoHTML;
        var fileRequest = new XMLHttpRequest();
        fileRequest.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    const renderingHTMLFunction = new Promise((resolve, reject) => {
                        var responseHTML = this.responseText.replace('<link href="styles.css" rel="stylesheet" />', '').replace('<script src="main.js" async><\/script>', '');
                        element.innerHTML = responseHTML;
                        toggleButton.removeEventListener("click", getFile);

                        renderMath(toggleButtonQuerySelector.replace("ToggleButton", " "));
                        addImportanceToFormulas();
                        removeImportanceFromElements();
                        resolve("Yay we worked");
                    });
                    renderingHTMLFunction.then((successMessage) => {
                        //End the wait cursor
                        document.body.parentElement.style.cursor = "initial";
                        toggleButton.innerHTML = "&minus;";

                    }).catch((errorMessage) => {
                        console.log(errorMessage);
                        console.error("This function isn't even called how did we get here???");
                    });

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
        fileRequest.open("GET", fileLink, true);
        //fileRequest.open("GET", fileLink + "?cacheBusting", true); //Use to clear cache on refresh (developmental purposes only)
        fileRequest.send();
    }
    toggleButton.addEventListener("click", getFile);

});
/*
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
*/
//};

var backToTopButton = document.createElement("div");
backToTopButton.classList.add("backToTopButton");
backToTopButton.innerHTML = `<div class="fraction upArrow"><div class="triangle"></div><div class="rectangle"></div></div> Back To Top`;
document.body.appendChild(backToTopButton);
window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        //Fade in backToTopButton
        backToTopButton.classList.remove("hide");
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
        backToTopButton.classList.add("hide");
    }
})
backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    //Fade out backToTopButton
    backToTopButton.classList.remove("show");
    backToTopButton.classList.add("hide");
});