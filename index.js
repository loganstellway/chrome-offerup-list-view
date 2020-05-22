var css =
    "[id^=db-item-list] > div {width: 100%;flex: 0 0 100%;}" +
    `[id^=db-item-list] > div > a {width: 100% !important;flex: 0 0 100% !important;}` +
    "[id^=db-item-list] > div > a > div {display: flex;}" +
    "[id^=db-item-list] > div > a > div > div:first-child {width: 198px;}";

var style = document.createElement("style");
style.id = "offerup-list-view";
style.type = "text/css";
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

var style = document.getElementById("offerup-list-view");
if (style) {
    elem.parentNode.removeChild(style);
}
