class Game {
    constructor() {
        $("[id^='enemy']").remove();
        $("[id^='tBtn']").attr('name', 'pit');
        $("[id^='towerImg']").remove();
        $("[id^='bullet']").remove();
        $("[id^='lifebar']").remove();
        $("[id^='health']").remove();
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

        // call function getSpline in pathFinding.js. The function returns an array of many positons (path)
        this.enemy_path_11 = getSpline(CONTROL_POINTS_11);
        this.enemy_path_11.forEach(function (point) {
            console.log(point.position.x + ", " + point.position.y);
        })

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
                this.enemy_list.forEach(function (item, index) {
                    item.update(self.enemy_path_11);
                    // if enemy dead remove and destroy it
                    if (item.health <= 0 || item.index >= self.enemy_path_11.length) {
                        item.destroy_enemy();
                        self.enemy_list.splice(index, 1);
                    }
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