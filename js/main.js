var app = (function () {
    var selectors = {
    };

    function initEvent() {
        var qrCodeImg = new QRCode('qrcode-img',{width: 120, height: 120});
        var urlEle = document.getElementById('url');
        var contactMeEle = document.getElementById('contactMe');

        // Generate current page's qrcode
        chrome.tabs.getSelected(null, function (tab) {
            qrCodeImg.makeCode(tab.url);
            urlEle.value = tab.url;
        });

        // Generate qrcode when changing url
        urlEle.onkeyup = function() {
            qrCodeImg.clear();
            qrCodeImg.makeCode(urlEle.value);
        }

        // go to my sites
        contactMeEle.onclick = function (e) {
            var url = 'http://localhost:8888/api';
            request(url, {
                success: function (res) {
                    res.is_succ 
                    ?  chrome.tabs.create({url: 'http://www.youdao.com'})
                    : chrome.tabs.create({url: 'http://www.bing.com'});
                }
            });
            //chrome.tabs.create({url: this.href});
            e.preventDefault();
        };
    }

    function initContextMenu() {
        var parentId = chrome.contextMenu.create({title: 'QTool'});
        var child = chrome.contextMenu.create({
            title: '生成二维码',
            parentId: parentId,
            context:['all'],
            onclick: function () {alert('alert');}
        });
    }

    function initTemplate() {
        var loginTemplate = document.getElementById('loginForm');
        var templateFn = doT.template(loginTemplate.innerHTML);
        var html = templateFn({test: 'hello'});
        var urlEle = document.getElementById('url');
        urlEle.value = html;
        //alert(html);
    }

    return {
        init: function () {
            window.onload = function () {
                initEvent();
                initTemplate();
                initContextMenu();
            };
        }
    };
})();

app.init();

function request(url, options) {
    options = options || {};
    var xhr = new XMLHttpRequest();
    xhr.open(options.method || 'GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState === 4) {
            var res = JSON.parse(xhr.responseText);
            options.success && options.success(res);
        }
    };
    xhr.send();
}

