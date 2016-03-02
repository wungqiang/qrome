var app = (function() {
    var selectors = {};

    function request(url, options) {
        options = options || {};
        var xhr = new XMLHttpRequest();
        xhr.open(options.method || 'GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState === 4) {
                var res = JSON.parse(xhr.responseText);
                if (options.success) {
                    options.success(res);
                }
            }
        };
        xhr.send();
    }

    function initEvent() {
        var qrCodeImg = new QRCode('qrcode-img', {
            width: 120,
            height: 120
        });
        var urlEle = document.getElementById('url');
        var contactMeEle = document.getElementById('contactMe');

        // Generate current page's qrcode
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            qrCodeImg.makeCode(tabs[0].url);
            urlEle.value = tabs[0].url;
        });

        // Generate qrcode when changing url
        urlEle.onkeyup = function() {
            qrCodeImg.clear();
            qrCodeImg.makeCode(urlEle.value);
        };

        // go to my sites
        contactMeEle.onclick = function(e) {
            //var url = 'http://localhost:8888/api';
            //request(url, {
            //success: function (res) {
            //chrome.tabs.create({url: res.is_succ ?
            //'http://www.youdao.com' :
            //'http://www.bing.com'});
            //}
            //});
            chrome.extension.getBackgroundPage().bg.bg('wq' + Math.random());
            chrome.tabs.create({
                url: this.href
            });
            e.preventDefault();
        };
    }

    function initTemplate() {
        var loginTemplate = document.getElementById('loginForm');
        var templateFn = doT.template(loginTemplate.innerHTML);
        var html = templateFn({
            test: 'hello'
        });
        var urlEle = document.getElementById('url');
        urlEle.value = html;
    }

    return {
        init: function() {
            window.onload = function() {
                initEvent();
                initTemplate();
            };
        }
    };
})();

app.init();
