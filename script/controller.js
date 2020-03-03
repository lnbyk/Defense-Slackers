/* use for find the position for certain button */
var buttonPos = ''
let game;

$(function () {
    // create game here
    game = new Game();
    $("#gameScreen").hide();
    $("#towerSelection").hide();
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

    /* game play button */
    $("#playBtn").click(function () {
        $("#mainMenu").slideUp('slow', function () {
            $("#gameScreen").fadeIn('slow');
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
        $(buttonPos).css('width', '10%').css('height', '20%');
        $(buttonPos).css('background', "url" + "(" + url + ") no-repeat top left").css('3%, 3%');
        /* adjust position */
        $(buttonPos).css({
            top: $(buttonPos).position().top - 1.5 * $(buttonPos).height(),
            left: $(buttonPos).position().left - $(buttonPos).width() / 2,
            position: 'absolute'
        });
        $(buttonPos).attr('name', 'towerLevel0');
        $(buttonPos).fadeIn();
        
        // build tower in model 
        //console.log("build tower: " + buttonPos);
        //console.log("x: " + $(buttonPos).position().left + ", y: " + $(buttonPos).position().top);
        game.buildTower($(buttonPos).position().left, $(buttonPos).position().top,t);
    });

});