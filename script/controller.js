$(function () {
    // create game here
    // let game = new Game();
    $("#gameScreen").hide();
    $("#towerSelection").hide();
    /* button functionality */

    $("#playBtn").click(function () {
        $("#mainMenu").slideUp('slow', function () {
            $("#gameScreen").fadeIn('slow');
        });
    });

    /* build tower button */
    $(".tbtn").click(function () {
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
        });
    });

    /* button use to close tower selection menu */
    $("#closeTowerSelection").click(function () {
        $("#towerSelection").fadeOut('fast');
        $(".towerIcon").hide();
        $("#closeTowerSelection").hide();
    });

});