const SCREEN_HEIGHT = 864;
const SCREEN_WIDTH = 1536;
class Game {
    constructor() {
        $("[id^='enemy']").remove();
        $("[id^='tBtn']").attr('name', 'pit');
        $("[id^='towerImg']").remove();
        $("[id^='bullet']").remove();
        $("[id^='lifebar']").remove();
        $("[id^='health']").remove();
        self = this;
        this.height = $(window).height();
        this.width = $(window).width();
        console.log("H and W: " + this.height + ", " + this.width);
        this.game_state = gameState.MAINMENU;
        console.log(this.game_state);
        // timer of game
        this.timer = 0;
    }

    /*set up game
    call it when click the start botton*/
    setUp() {
        $("[id^='enemy']").remove();
        // clear enemy before 
        let self = this;
        this.game_state = gameState.PLAY;
        console.log(this.game_state);
        this.gold = 300;
        this.timer = 0;
        /* initialize lists for Element(moving and fixed)*/
        this.tower_list = new Array();
        this.enemy_list = new Array();

    
        // test control_points (comment it when playing game )
        //  drawControlPoints(CONTROL_POINTS_11);
        //  drawControlPoints(CONTROL_POINTS_12);
        //  drawControlPoints(CONTROL_POINTS_13);

        // call function getSpline in pathFinding.js. The function returns an array of many positons (path)
        // this.enemy_path_11 = getSpline(CONTROL_POINTS_11);
        // this.enemy_path_12 = getSpline(CONTROL_POINTS_12);
        // this.enemy_path_13 = getSpline(CONTROL_POINTS_13);
        this.enemy_path_11 = this.scalePath(CONTROL_POINTS_11);
        this.enemy_path_12 = this.scalePath(CONTROL_POINTS_12);
        this.enemy_path_13 = this.scalePath(CONTROL_POINTS_13);
       
        // $(window).resize(function() {
        //     self.height = $(window).height();
        //     self.width = $(window).width();

        //     console.log("window resize H and W: " + self.height + ", " + self.width);
        //     $("[id^='pp']").remove();
        //     self.enemy_path_11 = self.scalePath(CONTROL_POINTS_11);
        //     self.enemy_path_12 = self.scalePath(CONTROL_POINTS_12);
        //     self.enemy_path_13 = self.scalePath(CONTROL_POINTS_13);

        // });
        // this.enemy_path_11.forEach(function (point) {
        //     console.log(point.position.x + ", " + point.position.y);
        // })
        /* set interval and call update */
        //this.enemy_list.push(new Enemy(0, 200, enemyType.TANK, this.enemy_list.length));
        setInterval(function () {
            self.update()
        }, 30);

        // start timer
        setInterval(function () {
            if (self.game_state == gameState.PLAY) {
                self.timer++;
                self.createEnemy();
            }
        }, 1000);
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
                        item.health = 0;
                        item.destroy_enemy();
                        self.enemy_list.splice(index, 1);
                        self.gold += 25;
                    }
                });
                this.tower_list.forEach(function (tower) {
                    tower.update(self.enemy_list);
                });
                $('#ddiamonNum').remove();
                $('#diamondNum').text(self.gold);
                break;
            case gameState.PAUSE:
                // pause  no update
                break;
        }

    }

    buildTower(px, py, typeS) {
        //console.log(typeS);
        this.gold -= 100;
        switch (typeS) {
            case '#0':
                this.tower_list.push(new Tower(px, py, towerType.LIGHT));
                break;
            case '#1':
                this.tower_list.push(new Tower(px, py, towerType.FROZE));
                break;
            case '#2':
                this.tower_list.push(new Tower(px, py, towerType.FIRE));
                //console.log("build tower #2, need define towerType");
                break;
            case '#3':
                this.tower_list.push(new Tower(px, py, towerType.ARCHER));
                //console.log("build tower #3, need define towerType");
                break;
        }

        console.log("tower list length: " + this.tower_list.length);
    }

    createEnemy() {
        if (this.timer % 3 == 0 && this.timer <= 30) {
            this.enemy_list.push(new Enemy(this.enemy_path_11[0].position.x, this.enemy_path_11[0].position.y, enemyType.TANK, this.timer, this.enemy_path_11, 1));
            console.log("numbers of enemy: " + this.enemy_list.length + "!!!!!!!!!!!!!!!!!!");

            this.enemy_list.push(new Enemy(this.enemy_path_12[0].position.x, this.enemy_path_12[0].position.y, enemyType.TANK, this.timer, this.enemy_path_12, 2));
            console.log("numbers of enemy: " + this.enemy_list.length + "!!!!!!!!!!!!!!!!!!");

            this.enemy_list.push(new Enemy(this.enemy_path_13[0].position.x, this.enemy_path_13[0].position.y, enemyType.TANK, this.timer, this.enemy_path_13, 3));
            console.log("numbers of enemy: " + this.enemy_list.length + "!!!!!!!!!!!!!!!!!!");
    
        }
    }
    /* the following four function just simply change the game_state*/
    win() {

    }

    lose() {

    }

    pause() {
        this.game_state = gameState.PAUSE;
        console.log(this.game_state + "the game!!!!!!");
    }

    resume() {
        this.game_state = gameState.PLAY;
    }

    // return a scale number by SCREEN_HEIGHT and SCREEN_WIDTH
    scaleW(x) {
        //console.log((x/SCREEN_WIDTH) * this.width);
        return (x/SCREEN_WIDTH) * this.width;
    }

    scaleH(y) {
        //console.log((y/SCREEN_HEIGHT) * this.height);
        return (y/SCREEN_HEIGHT) * this.height;
    }

    // scale getSpline and enemyPath Array
    scalePath(control_points) {
        self = this;
        var path = undefined;
        // getSpline
        path = getSpline(control_points);
        //scale
        path.forEach(function(point, t) {
            point.position.x = self.scaleW(point.position.x);
            point.position.y = self.scaleH(point.position.y);
            //pathFinding(point.position.x, point.position.y, t);
        });

        return path;
    }
}