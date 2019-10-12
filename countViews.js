/*getFile();
getViewsFromFile();
addViewsToFile();*/
//Adds JQuery:
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var views = 0;
var xhrGet = new XMLHttpRequest();
xhrGet.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        views = parseInt(this.responseText);
    }
}
xhrGet.open("GET", "../../../views.txt", true);
xhrGet.send();
views++;
$.ajax({
    type: "POST",
    url: "../../../views.txt",
    data: views,
    success: function () { alert(0); }
});