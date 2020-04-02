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