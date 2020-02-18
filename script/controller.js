$(function () {
    $("#gameScreen").hide();
    $("#towerSelection").hide();
    /* button functionality */

    $("#playBtn").click(function () {
        $("#mainMenu").slideUp('slow', function () {
            $("#gameScreen").fadeIn('slow');
        });
    });

    /* build tower button */
    $("#tBtn0").click(function(){
        var position = $("#tBtn0").position();
        var width = $( window ).width() * 0.12;
        var height = $( window ).height() * 0.18;
        $("#towerSImage").css({top: position.top - height / 2, left: position.left - width / 2, position:'absolute'});
        $('#towerSelection').fadeIn('fast', function() {
            $("#closeTowerSelection").css({top: position.top - height, left: position.left + width / 2, position:'absolute'});
        });
    });

    /* button use to close tower selection menu */
    $("#closeTowerSelection").click(function(){
        $("#towerSelection").fadeOut('fast');
    });
});