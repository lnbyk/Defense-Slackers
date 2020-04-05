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

function readyGo() {
   var readGo =  $('<img />').attr({
        id : "readyGo",
        src : './assets/tableMenu/num_3.png'
    }).css({
        "position" : "absolute",
        "left" : "50%",
        "top" : "50%",
        "transform" : "translateX(-50%) translateY(-50%)",
        'width' : "8%",
        "height" : "15%"
    });
    game.pause();
    setTimeout(function(){
        readGo.appendTo('#' + curGameLevel)}, 1000);
    
    setTimeout(function() {
        $("#readyGo").fadeOut('fast', function(){
            $("#readyGo").attr('src', './assets/tableMenu/num_2.png').fadeIn('fast');
        });
    }, 2000);
    setTimeout(function() {
        $("#readyGo").fadeOut('fast', function(){
            $("#readyGo").attr('src','./assets/tableMenu/num_1.png').fadeIn('fast');
        });
    }, 3000);
    setTimeout(function() {
        $("#readyGo").remove();
    }, 4000);

    setTimeout(
        function(){
            game.resume();
        }, 3000);
}