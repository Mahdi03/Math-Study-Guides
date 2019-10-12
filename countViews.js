/*getFile();
getViewsFromFile();
addViewsToFile();*/
//Adds JQuery:
/*var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
*/
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