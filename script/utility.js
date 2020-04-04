function appendImg(id, x, y, rx, ry, des, pos, url, w, h) {
    var record =
        $('<img />').attr({
            'id': id,
            'src': url
        }).css({
            top: x,
            left: y,
            position: pos,
        }).css({
            'z-index': '11',
            'width': '20%',
            'height': '20%',
        }).css({
            'transform': 'translateY(' + rx + ')' + 'translateX(' + ry + ')'
        }).appendTo(des);
    return record;
}

function nnnnn(input) {
    alert($('#' + input).attr('src'));
}

function setPitPosition(cur) {
    $('[id^=tBtn').remove();
    for (var bNum = 0; bNum < towerPos[cur].length; bNum++) {
        var curTPosition = towerPos[cur][bNum].split(" ");
        console.log(curTPosition[0]);
        $('<button> </button>').attr({
            'id': 'tBtn' + bNum,
            'name': 'pit',
            'rank': '0'
        }).css({
            'top': curTPosition[0],
            'left': curTPosition[1]
        }).addClass('tbtn').appendTo('#' + curGameLevel);
    }
}