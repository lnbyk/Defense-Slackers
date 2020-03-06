class Game {
    constructor() {
        $("[id^='enemy']").remove();
        $("[id^='tBtn']").attr('name', 'pit');
        $("[id^='towerImg']").remove();
        $("[id^='bullet']").remove();
        self = this;
        this.game_state = gameState.MAINMENU;
        console.log(this.game_state);
    }

    /*set up game
    call it when click the start botton*/
    setUp() {
        $("[id^='enemy']").remove();
        // clear enemy before 
        let self = this;
        this.game_state = gameState.PLAY;
        console.log(this.game_state);
        this.gold = 0;
        /* initialize lists for Element(moving and fixed)*/
        this.tower_list = new Array();
        this.enemy_list = new Array();
        /* set interval and call update */
        this.enemy_list.push(new Enemy(0, 200, enemyType.TANK, this.enemy_list.length));
        setInterval(function () {
            self.update()
        }, 30);
    }

    /* */
    update() {
        var self = this;
        switch (this.game_state) {
            case gameState.PLAY:
                //console.log(this.game_state + " and " + "updating");
                //update each tower
                this.enemy_list.forEach(function (item) {
                    item.update();
                });
                this.tower_list.forEach(function (tower) {
                    tower.update(self.enemy_list);
                });
                break;
            case gameState.PAUSE:
                console.log(this.game_state);
                break;
        }

    }

    buildTower(px, py, typeS) {
        //console.log(typeS);
        switch (typeS) {
            case '#0':
                this.tower_list.push(new Tower(px, py, towerType.ARCHER));
                break;
            case '#1':
                this.tower_list.push(new Tower(px, py, towerType.FROZE));
                break;
            case '#2':
                console.log("build tower #2, need define towerType");
                break;
            case '#3':
                console.log("build tower #3, need define towerType");
                break;
        }

        console.log("tower list length: " + this.tower_list.length);
    }

    createEnemy() {

    }

    /* the following four function just simply change the game_state*/
    win() {

    }

    lose() {

    }

    pause() {
        this.game_state = gameState.PAUSE;
    }

    resume() {
        this.game_state = gameState.PLAY;
    }
}