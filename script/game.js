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
        $("[id^='Debuff']").remove();
        $("[id^='Buff']").remove();
        //$(".skilCdNum").remove();
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
        //$(".skilCdNum").hide();
        //$(".skilCdNum").remove();
        // clear enemy before 
        let self = this;
        this.game_state = gameState.PLAY;
        console.log(this.game_state);
        this.gold = 30000;
        this.timer = 0;
        /* initialize lists for Element(moving and fixed)*/
        this.tower_list = new Array();
        this.enemy_list = new Array();
        // initialize skills
        this.fireSkill = new DamageSkill(skillType.FIRE);
        this.iceSkill = new DamageSkill(skillType.FROZE);
        this.thunderSkill = new BuffSkill(skillType.LIGHT);
    
        // test control_points (comment it when playing game )
        //  drawControlPoints(CONTROL_POINTS_11);
        //  drawControlPoints(CONTROL_POINTS_12);
        //  drawControlPoints(CONTROL_POINTS_13);

        this.enemy_path_11 = this.scalePath(CONTROL_POINTS_11);
        this.enemy_path_12 = this.scalePath(CONTROL_POINTS_12);
        this.enemy_path_13 = this.scalePath(CONTROL_POINTS_13);

        // skillCondition element
        this.curElement = undefined;
        this.element = [0,0,0,0]; // [fire, ice, thunder, stone]
       
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
                this.showSKillCD();
                //console.log(this.game_state + " and " + "updating");
                //update each tower
                this.enemy_list.forEach(function (item, index) {
                    item.update(self.enemy_path_11);
                    // if enemy dead remove and destroy it
                    if (item.health <= 0 || item.index >= item.posArray.length) {
                        if (item.health <= 0) {
                            // enemy died
                            self.gold += 25;
                        }
                        item.health = 0;
                        item.destroy_enemy();
                        self.enemy_list.splice(index, 1);
                        
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
                this.element[2]++;
                break;
            case '#1':
                this.tower_list.push(new Tower(px, py, towerType.FROZE));
                this.element[1]++;
                break;
            case '#2':
                this.tower_list.push(new Tower(px, py, towerType.FIRE));
                this.element[0]++;
                break;
            case '#3':
                this.tower_list.push(new Tower(px, py, towerType.ARCHER));
                this.element[3]++;
                //console.log("build tower #3, need define towerType");
                break;
        }

        console.log("tower list length: " + this.tower_list.length);

        // cur element in the game
        // var i =0;
        // for(i = 0; i < 4; i++) {
        //     console.log(this.element[i]);
        // }

        this.skillCondition()
        //console.log("curElement!!!!!!!!!!!!!!! = " + this.curElement);
    }

    createEnemy() {
        if (this.timer % 3 == 0 && this.timer <= 30) {
            this.enemy_list.push(new Enemy(this.enemy_path_11[0].position.x, this.enemy_path_11[0].position.y, enemyType.TANK, this.timer, this.enemy_path_11, 1));
            //console.log("numbers of enemy: " + this.enemy_list.length + "!!!!!!!!!!!!!!!!!!");

            this.enemy_list.push(new Enemy(this.enemy_path_12[0].position.x, this.enemy_path_12[0].position.y, enemyType.TANK, this.timer, this.enemy_path_12, 2));
            //console.log("numbers of enemy: " + this.enemy_list.length + "!!!!!!!!!!!!!!!!!!");

            this.enemy_list.push(new Enemy(this.enemy_path_13[0].position.x, this.enemy_path_13[0].position.y, enemyType.TANK, this.timer, this.enemy_path_13, 3));
            //console.log("numbers of enemy: " + this.enemy_list.length + "!!!!!!!!!!!!!!!!!!");
    
        }
    }

    // accroding to tower that palyer built, assigin value to this.curElement(FIRE, FROZE, LIGHT, STONE)
    // call this function when build tower
    skillCondition() {
        if (this.tower_list.length <= 2) {
            this.curElement = undefined;
        }else {
            // first and second largest element
            var first = 0;
            var second = -1;
            var index;
            for (var i = 0; i < 4; i++) {
                if (this.element[i] > first) {
                    second = first;
                    first = this.element[i];
                    index = i;

                }else if (this.element[i] > second) {
                    second = this.element[i];
                }
            }

            if (second > 0 && first != second) {
                this.curElement = index;
            }else {
                this.curElement = undefined;
            }
        }
    }

    // call thihs function when click skill button
    elementSkill(skill) {
        if (this.game_state == gameState.PAUSE) {
            console.log("game is pasued cannot use skill");
            return;
        }
        //console.log("click skill: " + skill);
        switch(skill) {
            case "#skill0":
                //fire (damage all enemies)
                this.fireSkill.implementSkill(this.enemy_list);
                break;
            case "#skill1":
                //ice (froze all enemies (couldnot move))
                this.iceSkill.implementSkill(this.enemy_list);
                break;
            case "#skill2":
                //thunder
                this.thunderSkill.implementSkill(this.tower_list);
                break;
            case "#skill3":
                //stone
                break;
        }
    }

    showSKillCD() {
        $("#skillCd0").text(this.fireSkill.cool_down-this.fireSkill.timer);
        $("#skillCd1").text(this.iceSkill.cool_down-this.iceSkill.timer);
        $("#skillCd2").text(this.thunderSkill.cool_down-this.thunderSkill.timer);
        this.fireSkill.curElement = this.curElement;
        this.iceSkill.curElement = this.curElement;
        this.thunderSkill.curElement = this.curElement;

        this.fireSkill.skillIconControl();
        this.iceSkill.skillIconControl();
        this.thunderSkill.skillIconControl();
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

    // clean up interval when restart
    cleanUp() {
        clearInterval(this.fireSkill.interval);
        clearInterval(this.iceSkill.interval);
        clearInterval(this.thunderSkill.interval);
    }
}