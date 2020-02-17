$(function(){
    //this code runs after page is fully loaded
    $("#gameScreen").hide();

    /* Button Functionality */
    $("#playBtn").click(function(){
        $("#mainMenu").slideUp("medium",function(){
            $("#gameScreen").fadeIn();
        });
    });
});