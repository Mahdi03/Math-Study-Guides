/*getFile();
getViewsFromFile();
addViewsToFile();*/
var views = 0;
var xhrGet = new XMLHttpRequest();
xhrGet.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        views = parseInt(this.responseText);
    }
}
xhrGet.open("GET", "../../../views.txt?views", true);
xhrGet.send();
views++;
var xhrPost = new XMLHttpRequest();
xhrPost.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        views = "Sent!";
    }
}
xhrPost.open("POST", "../../../views.txt?views=" + views, true);
xhrPost.send();
