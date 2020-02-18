class Game {
    constructor() {
        this.game_state = gameState.MAINMENU;
    }

    /*set up game
    call it when click the start botton*/
    setUp(){
        this.game_state = gameState.PLAY;
        this.gold = 0;
        /* initialize lists for Element(moving and fixed)*/

    }

    /* */
    update() {

    }

    /* the following four function just simply change the game_state*/
    win(){

    }

    lose() {

    }

    pause(){

    }

    resume(){

    }
}