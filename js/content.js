document.title = '^_^ ' + document.title;
function generateQrCode(data) {
    var imgEle = document.createElement('div'),
        maskEle = document.createElement('div'),
        size = 360,
        secondLayer = '9998',
        topLayer = '9999',
        bgColor = 'rgba(0,0,0,0.6)',
        boxShadow = '0 0 10px 5px rgba(250,250,250,0.6)';

    maskEle.style.position = 'fixed';
    maskEle.style.left = '0';
    maskEle.style.right = '0';
    maskEle.style.bottom = '0';
    maskEle.style.top = '0';
    maskEle.style.background = bgColor;
    maskEle.style.zIndex = secondLayer;
    imgEle.id="_qrcode";
    imgEle.style.position = 'fixed';
    imgEle.style.top = '50%';
    imgEle.style.left = '50%';
    imgEle.style.marginTop = '-' + (size / 2) + 'px';
    imgEle.style.marginLeft = '-' + (size / 2) + 'px';
    imgEle.style.zIndex = topLayer;
    imgEle.style.boxShadow = boxShadow;
    document.body.appendChild(maskEle);
    document.body.appendChild(imgEle);

    var qrcode = new QRCode('_qrcode', {width: size, height: size});
    qrcode.makeCode(data);

    maskEle.addEventListener('click', function () {
        if (maskEle) {
            maskEle.parentNode.removeChild(maskEle);
        }
        if (imgEle) {
            imgEle.parentNode.removeChild(imgEle);
        }
    });
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
console.log(msg, sender, sendResponse);
    switch(msg.type) {
        case 'qrcode':
            if (msg.data) {
                generateQrCode(msg.data);
            }
            break;
    }
});

