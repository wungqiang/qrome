var bg= function () {
    var wq = 'wq';
    function getSelection(cb) {
        chrome.tabs.executeScript({
            code: 'window.getSelection().toString();'
        }, function (selection) {
            cb(selection.toString());
        });
    }

    function getCurrentTab(cb) {
        chrome.tabs.query({
                active: true,
                currentWindow: true
            },function (tabs) {
                cb(tabs[0]);
        });
    }

    function searchHandler(site) {
        var sites = {
            'google': '',
            'bing': 'http://cn.bing.com/search?q={}',
            'baidu': 'https://www.baidu.com/s?wd={}',
            'youdao': 'http://dict.youdao.com/search?q={}'
        };

        return function () {
            getSelection(function (selection) {
                alert(wq);
                chrome.tabs.create({url: sites[site].replace('{}', selection)});
            });
        };
    }

    function generateQrCode() {
        getSelection(function (selection) {
            getCurrentTab(function (tab) {
                chrome.tabs.sendMessage(tab.id, {
                    type: 'qrcode',
                    data: (selection ? selection : tab.url)
                });
            });
        });
    }

    function bg(data) {
    alert(data);
        wq = data;
    }

    // contexts = ["all", "page", "frame", "selection", "link", "editable", "image",
    // "video", "audio", "launcher", "browser_action", "page_action"];
    chrome.contextMenus.create({
        title: '生成二维码',
        contexts: ['page', 'selection'],
        onclick: generateQrCode
    });
    chrome.contextMenus.create({
        title: '有道查词',
        contexts: ['selection'],
        onclick: searchHandler('youdao')
    });

    chrome.contextMenus.create({
        title: 'Google',
        contexts: ['selection'],
        onclick: searchHandler('google')
    });

    chrome.contextMenus.create({
        title: 'Bing',
        contexts: ['selection'],
        onclick: searchHandler('bing')
    });

    chrome.contextMenus.create({
        title: '百度',
        contexts: ['selection'],
        onclick: searchHandler('baidu')
    });

    return {
        bg: bg
    };
}();
