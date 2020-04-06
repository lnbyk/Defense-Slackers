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

function setSkillUpgradePos() {
    var skillPos = ["16 17", "33 17", "50 17", "67 17",
        "16 31", "33 31", "50 31", "67 31",
        "16 45", "33 45", "50 45", "67 45",
        "16 59", "33 59", "50 59", "67 59",
        "16 80", "33 80", "50 80", "67 80",
        "16 94", "33 94", "50 94", "67 94"
    ]
    for (var i = 0; i < skillPos.length; i++) {
        var curSkillId = 'ico_' + (i + 1);
        var thisPos = skillPos[i].split(" ");
        $("<buttton> </button>").attr({
            'rank': '1',
            'id' : curSkillId
        }).css({
            'position': "absolute",
            "top": thisPos[0] + "%",
            'left': thisPos[1] + "%",
            'transform': 'translateX(-50%) translate(-50%)',
            'width': '12%',
            'height': '16.5%'
        }).addClass('btn').append($('<img />').attr({
            src: './gameAsset/td-gui/PNG/upgrade/' + curSkillId + '.png'
        })).appendTo('#skillMenu');

        $("<img />").attr({
            'src': "./gameAsset/td-gui/PNG/upgrade/window_.png",
            'id' : curSkillId + 'window'
        }).css({
            'position': "absolute",
            "top": parseInt(thisPos[0]) + 12 + "%",
            'left': parseInt(thisPos[1]) + (-0.5) + "%",
            'transform': 'translateX(-50%) translate(-50%)',
            'width': '4%',
            'height': '4%'
        }).appendTo('#skillMenu');

        $('<div> </div>').attr('id', curSkillId + 'rank').css({
            'position': "absolute",
            "top": parseInt(thisPos[0]) + 12.5 + "%",
            'left': parseInt(thisPos[1]) + (-2.3) + "%",
            'transform': 'translateX(-50%) translate(-50%)',
            'width': '2%',
            'height': '2%',
            'text-align': 'center',
            'font-size' : '60%',
            'color' : 'orange'
        }).text('1').appendTo('#skillMenu');
    }

}

function readyGo() {
    var readGo = $('<img />').attr({
        id: "readyGo",
        src: './assets/tableMenu/num_3.png'
    }).css({
        "position": "absolute",
        "left": "50%",
        "top": "50%",
        "transform": "translateX(-50%) translateY(-50%)",
        'width': "8%",
        "height": "15%"
    });
    game.pause();
    setTimeout(function () {
        readGo.appendTo('#' + curGameLevel)
    }, 1000);

    setTimeout(function () {
        $("#readyGo").fadeOut('fast', function () {
            $("#readyGo").attr('src', './assets/tableMenu/num_2.png').fadeIn('fast');
        });
    }, 2000);
    setTimeout(function () {
        $("#readyGo").fadeOut('fast', function () {
            $("#readyGo").attr('src', './assets/tableMenu/num_1.png').fadeIn('fast');
        });
    }, 3000);
    setTimeout(function () {
        $("#readyGo").remove();
    }, 4000);

    setTimeout(
        function () {
            game.resume();
        }, 3000);
}