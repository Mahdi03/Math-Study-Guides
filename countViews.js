/*
var views = 0;
var xhrGet = new XMLHttpRequest();
xhrGet.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        views = parseInt(this.responseText);
    }
}
xhrGet.open("GET", "https://mahdi03.github.io/Math-Study-Guides/views.txt?views=", true);
xhrGet.send();
views++;
var xhrPost = new XMLHttpRequest();
xhrPost.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        views = parseInt(this.responseText);
    }
}
xhrPost.open("GET", "https://mahdi03.github.io/Math-Study-Guides/views.txt?views=" + views, true);
xhrPost.send();
*/
    var xhrPost = new XMLHttpRequest();
    xhrPost.open("GET", "https://mahdi03.github.io/Math-Study-Guides/views.txt?views=1", true);
    xhrPost.send();
