// ==UserScript==
// @name         Hide GMail Navigation
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/gizmomogwai/tampermonkey/refs/heads/main/Hide%20GMail%20Navigation.user.js
// @description  Hide navigation for direct search links
// @author       christian.koestlin@gmail.com
// @match        https://mail.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==
if ( ! /#search.*/.test(location.hash) ) {
    return;
}
var navigationPoller = setInterval(function() {
    var result = document.querySelectorAll('div[role="navigation"]');
    if (result.length > 0) {
        console.log("Removing navigation");
        result[0].style.display = "none";
        clearInterval(navigationPoller);
    }
}, 1);

const observer = new MutationObserver(function(mutationList, observer) {
    document
        .querySelectorAll('html head link[rel="icon"]')
        .forEach((favicon) => {
             console.log("Resetting favicon");
             favicon.href = "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/unreadcountfavicon/3/0.png";
        });
});
observer.observe(
    document.querySelector('html head'),
    { attributes: false, childList: true, subtree: false });
