function show() {
    //alert('injected');
};

document.onload = function () {
    alert('onloaded');
    //var injectCss = document.createElement('link');
    //injectCss.setAttribute('rel', 'stylesheet');
    //injectCss.type = 'text/css'
    //injectCss.setAttribute('href', chrome.extension.getURL('css/sitedir.css'));
    //document.head.appendChild(injectCss);
}

//document.addEventListener('DOMSubtreeModified', injectCss, false)

//function injectCss() {
    //if (document.head) {
        //document.removeEventListener('DOMSubtreeModified', injectCss, false);

        //var style = document.createElement('style');
        //style.innerHTML = 'background: red';
        //document.head.appendChild(style);
    //}
//}
