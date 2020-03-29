function appendImg(id, x, y, rx, ry, des, pos, url) {
    var record =
        $(des).append($('<img />').attr({
            'id': id,
            'src': url
        }).css({
            top: x,
            left: y,
            position: pos
        }).css({
            'transform': 'translateY(' + rx + ')' + 'translateX(' + ry + ')'
        }))
    return record;
}

function nnnnn(input) {
    alert($('#' + input).attr('src'));
}