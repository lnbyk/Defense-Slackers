/* use for find the position for certain button */
var buttonPos = ''
let game;

/* define string replace charAt function */
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
$(function () {
    // create game here
    game = new Game();
    $("#gameScreen").hide();
    $("#towerSelection").hide();
    $("#setting").hide();
    $('#mainHelp').hide();
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
        $('#closeHelpBtn').fadeOut("fast", function () {
            $("#mainHelp").slideUp('slow', function () {
                $("#mainSettingMenu, #closeMainSetting").fadeIn('slow');
            });
        })

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

        // game start
        game.setUp();
    });

    /* build tower button */
    $(".tbtn").click(function () {
        buttonPos = '#' + $(this).attr('id');
        curName = $(this).attr('name');
        switch (curName) {
            case "pit":
                var position = $(this).position();
                var width = $(window).width() * 0.12;
                var height = $(window).height() * 0.18;
                $("#towerSImage").css({
                    top: position.top - height / 2,
                    left: position.left - width / 2,
                    position: 'absolute'
                });
                $('#towerSelection').fadeIn('fast', function () {
                    $("#closeTowerSelection").css({
                        top: position.top - height,
                        left: position.left + width / 2,
                        position: 'absolute'
                    });
                    $("#tower0").css({
                        top: position.top - height * 0.4,
                        left: position.left - width * 0.8,
                        position: 'absolute'
                    });
                    $("#tower1").css({
                        top: position.top - height * 0.4,
                        left: position.left - width * 0.15,
                        position: 'absolute'
                    });
                    $("#tower2").css({
                        top: position.top + height * 0.2,
                        left: position.left - width * 0.8,
                        position: 'absolute'
                    });
                    $("#tower3").css({
                        top: position.top + height * 0.2,
                        left: position.left - width * 0.12,
                        position: 'absolute'
                    });
                    $(".towerIcon").fadeIn();
                    $("#closeTowerSelection").fadeIn();
                    /* choose certain tower and then change our name for the btn */
                });
                break;
            case 'towerLevel0':
                break;

        }
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
        var t = '#' + $(this).attr('id').charAt($(this).attr('id').length - 1);
        var url = $(t).attr('src');

        /* change the tower Id at certain postion */
        // $(buttonPos).css('width', '10%').css('height', '20%');
        // $(buttonPos).css('background', "url" + "(" + url + ") no-repeat top left").css('3%, 3%');

        $('<img />').attr({
            'id': "towerImg" + buttonPos,
            'src': url
        }).css({
            top: $(buttonPos).position().top,
            left: $(buttonPos).position().left,
            position: 'absolute'
        }).css({
            'transform': 'translateY(-60%) translateX(-30%)'
        }).appendTo('#gameScreen');

        /* adjust position */

        $(buttonPos).attr('name', 'towerLevel0');
        $(buttonPos).fadeIn();

        // build tower in model 
        //console.log("build tower: " + buttonPos);
        //console.log("x: " + $(buttonPos).position().left + ", y: " + $(buttonPos).position().top);
        game.buildTower($(buttonPos).position().left, $(buttonPos).position().top, t);
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
            game = new Game();
            $("#gameScreen").hide();
            $("#towerSelection").hide();
            $("#setting").hide();
        });

        // restart button
        $("#restartBtn").click(function () {
            game.pause();
            game = new Game();
            game.setUp();
            $('#setting').slideUp('fast', function () {
                $('#gameScreen').fadeIn('fast');
            })
        })
        $("[id^='tBtn']").show();
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