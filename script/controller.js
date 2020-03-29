/* use for find the position for certain button */
var buttonPos = ''
let game;
var set = new Set([]);
var imgArray = [2, 6, 11, 16];

/* define string replace charAt function */
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function imgDefault(){
    for (var curpos = 0; curpos < 4; curpos++) {
        var oldUrl = $('#' + curpos).attr('src');
        oldUrl = oldUrl.substring(0, 38) + imgArray[curpos] + ".png";
        $('#' + curpos).attr('src', oldUrl);
    }
}
$(function () {
    // create game here
    game = new Game();
    $("#gameScreen").hide();
    $("#towerSelection").hide();
    $("#setting").hide();
    $('#mainHelp, #towerIntro').hide();
    $("#mainSettingMenu").hide();
    $("#closeMainSetting, #closeHelpBtn").hide();
    /* button functionality */
    /* bgm cont rol button */
    $("#bgmBtn").click(function () {
        var curName = $("#bgmBtn").attr('name');
        switch (curName) {
            case "on":
                $("#bgmBtn img").attr('src', "gameAsset/td-gui/PNG/menu/button_sound_off.png");
                $("#bgmBtn").attr('name', 'off');
                $("#backgroundMusic").get(0).pause();
                break;
            case "off":
                $("#bgmBtn img").attr('src', "gameAsset/td-gui/PNG/menu/button_sound.png");
                $("#bgmBtn").attr('name', 'on');
                $("#backgroundMusic").get(0).play();
                break;
        }
    });

    /*click main setting button */
    $("#mainSetting").click(function () {
        $("#mainSettingMenu, #closeMainSetting").fadeIn('fast');
        $('#playBtn, #bgmBtn, #mainSetting').fadeOut('fast');

    })

    /*close main setting menu */
    $('#closeMainSetting').click(function () {
        $("#mainSettingMenu").slideUp('slow');
        $("#closeMainSetting").hide();
        $('#playBtn, #bgmBtn, #mainSetting').fadeIn('fast');
    })

    /*button use to show help menu */
    $("#help").click(function () {
        $("#mainSettingMenu, #closeMainSetting").fadeOut('fast', function () {
            $("#mainHelp, #closeHelpBtn").fadeIn('fast');
        });
    });

    /* button use to close help menu */
    $('#closeHelpBtn').click(function () {
        $('#closeHelpBtn, #towerIntro').fadeOut("fast", function () {
            $("#mainHelp").slideUp('slow', function () {
                $("#mainSettingMenu, #closeMainSetting").fadeIn('slow');
            });
        })

    })
    /*button use to open tower introduction menu */
    $('#towerType').click(function () {
        $("#mainSettingMenu, #closeMainSetting").fadeOut('fast', function () {
            $("#towerIntro, #closeHelpBtn").fadeIn('fast');
        });
    })

    /* button use to change enemy icon */
    $('#lastEnemy, #nextEnemy').click(function () {
        var cur = parseInt($('#helpEnemy').attr('src').charAt(24));
        if ($(this).attr('id') === 'lastEnemy')
            cur = --cur < 0 ? 9 : cur;
        else
            cur = ++cur > 9 ? 0 : cur;
        var nUrl = $('#helpEnemy').attr('src').replaceAt(24, cur + "");
        $('#helpEnemy').attr('src', nUrl);
    });


    /* game play button */
    $("#playBtn").click(function () {
        $("#mainMenu").slideUp('slow', function () {
            $("#gameScreen").fadeIn('slow');
            $("#backgroundMusic").get(0).pause();
        });
        $("[id^='tBtn']").show();
        // game start
        game.setUp();
    });




    /* build tower button */
    $(".tbtn").click(function () {
        buttonPos = '#' + $(this).attr('id');
        curName = $(this).attr('name');
        curRank = $(this).attr('rank')
        if (curName != 'pit') {
            for (var curpos = 0; curpos < 4; curpos++) {
                var oldUrl = $('#' + curpos).attr('src');
                if (curName == curpos) {
                    oldUrl = oldUrl.substring(0, 38) + (imgArray[curpos] + parseInt(curRank)) + '.png';
                } else if (parseInt(curRank) > 0) {
                    oldUrl = oldUrl.substring(0, 38) + (imgArray[curpos] + parseInt(curRank) - 1) + '.png';
                }
                $('#' + curpos).attr('src', oldUrl);
            }
        }

        // switch (curRank) {
        //case '0':
        var position = $(this).position();
        var width = $(window).width() * 0.12;
        var height = $(window).height() * 0.18;
        $("#towerSImage").css({
            top: position.top - height / 2,
            left: position.left - width / 2,
            position: 'absolute',
            'z-index': '20'
        });
        $('#towerSelection').fadeIn('fast', function () {
            $("#closeTowerSelection").css({
                top: position.top - height,
                left: position.left + width / 2,
                position: 'absolute',
                'z-index': '20'
            });
            $("#tower0").css({
                top: position.top - height * 0.4,
                left: position.left - width * 0.8,
                position: 'absolute',
                'z-index': '20'
            });
            $("#tower1").css({
                top: position.top - height * 0.4,
                left: position.left - width * 0.15,
                position: 'absolute',
                'z-index': '20'
            });
            $("#tower2").css({
                top: position.top + height * 0.2,
                left: position.left - width * 0.8,
                position: 'absolute',
                'z-index': '20'
            });
            $("#tower3").css({
                top: position.top + height * 0.2,
                left: position.left - width * 0.12,
                position: 'absolute',
                'z-index': '20'
            });
            $(".towerIcon").fadeIn();
            $("#closeTowerSelection").fadeIn();
            /* choose certain tower and then change our name for the btn */
        });
        //  break;
        //   case '1':
        //     break;
        //
        //}
    });

    /* button use to close tower selection menu */
    $("#closeTowerSelection").click(function () {
        $("#towerSelection").fadeOut('fast');
        $(".towerIcon").hide();
        $("#closeTowerSelection").hide();
    });

    $(".towerIcon").click(function () {
        $("#towerSelection").fadeOut('fast');
        $(".towerIcon").hide();
        $("#closeTowerSelection").hide();
        /*  get the image url of the tower we clicker  */
        if (game.gold >= 100) {
            var t = '#' + $(this).attr('id').charAt($(this).attr('id').length - 1);
            var nextNum = parseInt($(t).attr('src').charAt(38, -4)) + parseInt($(buttonPos).attr('rank'));
            var url = $(t).attr('src');
            url.replaceAt(38, nextNum);


            /* change the tower Id at certain postion */
            // $(buttonPos).css('width', '10%').css('height', '20%');
            // $(buttonPos).css('background', "url" + "(" + url + ") no-repeat top left").css('3%, 3%');

            var imgId = 'towerImg' + buttonPos.substring(1);
            if (!set.has(buttonPos)) {
                appendImg(imgId, $(buttonPos).position().top, $(buttonPos).position().left, '-60%', '-30%', '#gameScreen', 'absolute', url);
                set.add(buttonPos)
            } else {
                $('#' + imgId).attr('src', url);
            }
            /*
            var record = $('<img />').attr({
                'id': imgId,
                'src': url
            }).css({
                top: $(buttonPos).position().top,
                left: $(buttonPos).position().left,
                position: 'absolute'
            }).css({
                'transform': 'translateY(-60%) translateX(-30%)'
            }).appendTo('#gameScreen').click();
            */
            var currRank = parseInt($(buttonPos).attr('rank'));
            var currName = $(buttonPos).attr('name')
            if (currRank < 3 && ((t.charAt(1)== currName || currName=='pit')))
                $(buttonPos).attr('rank', currRank + 1);
            $(buttonPos).attr('name', t.charAt(1) + "");
            $(buttonPos).fadeIn();
            game.buildTower($(buttonPos).position().left, $(buttonPos).position().top, t);

            /* adjust position */
        } else {
            alert('money is not enough');
        }

        imgDefault();

        // build tower in model 
        //console.log("build tower: " + buttonPos);
        //console.log("x: " + $(buttonPos).position().left + ", y: " + $(buttonPos).position().top);

    });

    $('.skillBtn').click(function () {
        var skill = '#' + $(this).attr('id');
        // call elementSkill to implement skill
        game.elementSkill(skill);
    });

    $('#backMenuBtn').click(function () {
        $('#setting').fadeIn('slow');
        game.pause();
        // disabled tower selection button
        $("[id^='tBtn']").hide();

        // close the setting menu
        $('#closeSBtn').click(function () {
            $('#setting').fadeOut('fast');
            game.resume();
        })

        // go to main menu
        $('#leftBtn').click(function () {
            $('#setting').slideUp('fast', function () {
                $("#gameScreen").slideUp('slow', function () {
                    $("#mainMenu").fadeIn('slow');
                    $("#backgroundMusic").get(0).play();
                });
            })
            //game.cleanUp();
            game = new Game();
            $("#gameScreen").hide();
            $("#towerSelection").hide();
            $("#setting").hide();
        });

        // restart button
        $("#restartBtn").click(function () {
            game.pause();
            //game.cleanUp();
            game = new Game();
            game.setUp();
            $('#setting').slideUp('fast', function () {
                $('#gameScreen').fadeIn('fast');
            })
        })
        $("[id^='tBtn']").show();
    });

    // if resize window
    $(window).resize(function () {
        game.pause();
        $("[id^='tBtn']").hide();
        console.log("window resized, game restarted");
        $("[id^='pp']").remove();
        $("#gameScreen").slideUp('slow', function () {
            $("#mainMenu").fadeIn('slow');
            $("#backgroundMusic").get(0).play();
        });
        //game.cleanUp();
        game = new Game();
        game.width = $(window).width();
        game.height = $(window).height();
        $("#gameScreen").hide();
        $("#towerSelection").hide();
        $("#setting").hide();

        //$("#mainMenu").fadeIn('slow');
        //$("#backgroundMusic").get(0).play();
    });

    // pause button
    $('#pauseGame').click(function () {
        var curName = $(this).attr('name');
        game.pause();
        switch (curName) {
            case 'on':
                game.pause();
                $('#pauseGame img').attr('src', "gameAsset/td-gui/PNG/interface_game/button_start.png");
                $(this).attr('name', 'off');
                break;
            case 'off':
                game.resume();
                $('#pauseGame img').attr('src', "gameAsset/td-gui/PNG/interface_game/button_pause.png");
                $(this).attr('name', 'on');
                break;
        }
    });

});



/*

 $("#bgmBtn").click(function () {
        var curName = $("#bgmBtn").attr('name');
        switch (curName) {
            case "on":
                $("#bgmBtn img").attr('src', "gameAsset/td-gui/PNG/menu/button_sound_off.png");
                $("#bgmBtn").attr('name', 'off');
                $("#backgroundMusic").get(0).pause();
                break;
            case "off":
                $("#bgmBtn img").attr('src', "gameAsset/td-gui/PNG/menu/button_sound.png");
                $("#bgmBtn").attr('name', 'on');
                $("#backgroundMusic").get(0).play();
                break;
        }

*/