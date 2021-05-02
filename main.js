document.querySelectorAll("[redir]").forEach((element) => {
    element.onclick = function() {
        var link = element.getAttribute("redir");
        window.location.assign(link);
    }
});
/* Taken from: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
   returns true if mobile
*/
function mobileCheck() {
    let check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
if (mobileCheck()) {
    document.body.classList.add("mobile");
} else {
    document.body.classList.add("desktop");
}
document.querySelectorAll(".toggleButton").forEach((toggleButton) => {
    toggleButton.parentNode.classList.add("studyGuideDropdown");
    //Wrap all the toggleButtons in a wrapper that can be styled to be a table-cell in layout
    var toggleButtonTDWrapper = document.createElement("div");
    toggleButtonTDWrapper.classList.add("toggleButtonTDWrapper");
    toggleButton.parentNode.replaceChild(toggleButtonTDWrapper, toggleButton);
    toggleButtonTDWrapper.appendChild(toggleButton);

    var studyGuideDropdown = toggleButtonTDWrapper.parentNode;
    studyGuideDropdown.addEventListener("click", (event) => {
        //Use .contains() instead of .includes() because it is a DOMTokenList and not an Array
        if (!event.target.classList.contains("toggleButton")) {
            toggleButton.click();
        }
    });
    /*
    studyGuideDropdown.addEventListener("mouseover", () => {
        toggleButton.style.backgroundColor = "rgb(0, 208, 255)";
        studyGuideDropdown.querySelector("h2").style.color = "rgb(0, 180, 255)";
        studyGuideDropdown.style.cursor = "pointer";
    });
    */
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
        toggleButton.classList.add("loading");
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
                        toggleButton.classList.remove("loading");
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
});
backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    //Fade out backToTopButton
    backToTopButton.classList.remove("show");
    backToTopButton.classList.add("hide");
});