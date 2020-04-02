/* use for find the position for certain button */
var buttonPos = ''
let game;
var set = new Set([]);
var imgArray = [2, 6, 11, 16];

/* define string replace charAt function */
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function imgDefault() {
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
    $('#winScene, #failScene, #popUpWindow').hide();
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
        imgDefault();
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
        var width = $(window).width()
        var height = $(window).height()
        $('#towerSelection').css({
            top : position.top * 1.1,
            left : position.left * 1.05,
            tranform: 'translateX(-50%) translateY(-50%)'
        }).fadeIn('fast', function () {
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

    $("#tower0, #tower1, #tower2, #tower3").click(function () {
        $("#towerSelection").fadeOut('fast');
        $(".towerIcon").hide();
        $("#closeTowerSelection").hide();
        /*  get the image url of the tower we clicker  */
        var t = '#' + $(this).attr('id').charAt($(this).attr('id').length - 1);
       // console.log(towerSwitch[parseInt(t.charAt(1))][0]);
        if (game.gold >= towerSwitch[parseInt(t.charAt(1))][3]) {
            
            var nextNum = parseInt($(t).attr('src').charAt(38, -4)) + parseInt($(buttonPos).attr('rank'));
            var url = $(t).attr('src');
            url.replaceAt(38, nextNum);


            /* change the tower Id at certain postion */
            // $(buttonPos).css('width', '10%').css('height', '20%');
            // $(buttonPos).css('background', "url" + "(" + url + ") no-repeat top left").css('3%, 3%');

            var imgId = 'towerImg' + buttonPos.substring(1);
            if (!set.has(buttonPos)) {
                appendImg(imgId, $(buttonPos).position().top, $(buttonPos).position().left, '-60%', '-30%', '#gameScreen', 'absolute', url);
                set.add(buttonPos);
            } else {
                $('#' + imgId).attr('src', url);
            }

            console.log($("#" + imgId).width());
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
            var currName = $(buttonPos).attr('name');

            if (currRank < 3 && ((t.charAt(1) == currName || currName == 'pit'))){
                $(buttonPos).attr('rank', currRank + 1);
            }
            $(buttonPos ).attr('name', t.charAt(1) + "");
            console.log("Rank and Name: " + $(buttonPos).attr('rank') +", " + $(buttonPos).attr('name'));
            $(buttonPos).fadeIn();
            game.buildTower($(buttonPos).position().left, $(buttonPos).position().top, t, $(buttonPos).attr('rank'));

            /* adjust position */
        } else {
            $('<div> not enough diamond </div>').attr({
                'id' : 'diamondAlert',
                'text' : 'not enough diamond'
            }).css({
                position : 'absolute',
                top: '30%',
                left: '20%',
                'tranform' : 'translateX(50%) translateY(-50%)' 
            }).appendTo('#popUpWindow');
            $('#popUpWindow').fadeIn('fast', function(){
                $("[id^='tBtn']").hide();
                game.pause();
            })
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

    // fail game return to main menu
    $('#failLevelS, #winLevelS').click(function () {
        $('#failScene, #winScene').slideUp('fast', function () {
            $("#gameScreen").slideUp('slow', function () {
                $("#mainMenu").fadeIn('slow');
                $("#backgroundMusic").get(0).play();
            });
        })
        //game.cleanUp();
        game = new Game();
        $("#gameScreen").hide();
        $("#towerSelection").hide();
        $("#failScene").hide();
    })

    // fail game restart
    $("#failLevelNext").click(function () {
        game.pause();
        //game.cleanUp();
        game = new Game();
        game.setUp();
        $('#failScene').slideUp('fast', function () {
            $('#gameScreen, [id^=heart], [id^=diamond]').fadeIn('fast');
        })
    })

    $('#closePopUpWindow').click(function() {
        $('#popUpWindow').fadeOut('fast', function() {
            $("[id^='tBtn']").show();
            game.resume();
        })
    })

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