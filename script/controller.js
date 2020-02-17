$(function(){
    $("#gameScreen").hide();
    /* button functionality */

    $("#playBtn").click(function(){
        $("#mainMenu").slideUp('slow', function(){
            $("#gameScreen").fadeIn('slow');
        });
    });
});