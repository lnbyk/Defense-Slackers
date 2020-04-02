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
        set = new Set([]);
        imgDefault();
        $("[id^=tBtn").attr('rank', '0').attr('name', 'pit');
        $("[id^='enemy']").remove();
        $('[id^=heart], [id^=diamond], #backMenuBtn, #pauseGame, #quickGame').fadeIn('fast');
        //$(".skilCdNum").hide();
        //$(".skilCdNum").remove();
        // clear enemy before 
        let self = this;
        this.game_state = gameState.PLAY;
        console.log(this.game_state);
        this.health = gameLevel.LEVEL_1[1]; // data in gameData.js
        this.gold = gameLevel.LEVEL_1[2]; // data in gameData.js
        this.process = enemyGenerate.PROCESS_1;
        this.enemy_counter = 0;
        this.enemy_flag = undefined;
        this.timer = 0;
        /* initialize lists for Element(moving and fixed)*/
        this.tower_list = new Array();
        this.enemy_list = new Array();
        // initialize skills
        this.fireSkill = new DamageSkill(skillType.FIRE);
        this.iceSkill = new DamageSkill(skillType.FROZE);
        this.thunderSkill = new BuffSkill(skillType.LIGHT);
        this.stoneSkill = new BuffSkill(skillType.ARCHER);

        // test control_points (comment it when playing game )
        // drawControlPoints(CONTROL_POINTS_11);
        // drawControlPoints(CONTROL_POINTS_12);
        // drawControlPoints(CONTROL_POINTS_13);

        this.enemy_path_11 = this.scalePath(CONTROL_POINTS_11);
        this.enemy_path_12 = this.scalePath(CONTROL_POINTS_12);
        this.enemy_path_13 = this.scalePath(CONTROL_POINTS_13);

        // skillCondition element
        this.curElement = undefined;
        this.element = [0, 0, 0, 0]; // [fire, ice, thunder, stone]

        /* set interval and call update */
        //this.enemy_list.push(new Enemy(0, 200, enemyType.TANK, this.enemy_list.length));
        setInterval(function () {
            self.update()
        }, 30);
        //this.enemy_list.push(new Enemy(this.enemy_path_13[0].position.x, this.enemy_path_13[0].position.y, enemyType.TANK, this.timer, this.enemy_path_13, 3));
        // start timer
        setInterval(function () {
            if (self.game_state == gameState.PLAY) {
                self.createEnemy();
                self.timer++;
            }
        }, 1000);
    }

    /* */
    update() {
        var self = this;
        switch (this.game_state) {
            case gameState.PLAY:
                if (this.health <= 0) {
                    self.lose();
                    console.log("you lose!!!!!!!!!!!!!!!!!!!!!!!!");
                    // change game state
                }
                if (this.process == enemyGenerate.PROCESS_3 && this.enemy_list.length == 0) {
                    self.win();
                }
                this.showSKillCD();
                //console.log(this.game_state + " and " + "updating");
                //update each tower
                this.enemy_list.forEach(function (item, index) {
                    item.update(self.enemy_path_11);
                    // if enemy dead remove and destroy it
                    if (item.health <= 0 || item.index >= item.posArray.length) {
                        if (item.health <= 0) {
                            // enemy died
                            self.gold += item.type[1];
                        } else {
                            self.health--;
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
                $('#heartNum').text(self.health);
                break;
            case gameState.PAUSE:
                // pause  no update
                break;
        }



    }

    buildTower(px, py, typeS, l) {
        //console.log(typeS);
        var self = this;
        this.tower_list.forEach(function (tower, index) {
            if (tower.position.x == px && tower.position.y == py) {
                self.element[tower.type[7]]--;
                tower.clearUp();
                self.tower_list.splice(index, 1);
            }
        })
        var type = undefined;
        var level = undefined;
        switch (typeS) {
            case '#0':
                type = towerType.LIGHT;
                level = towerLevel.LIGHT[l];
                // this.tower_list.push(new Tower(px, py, towerType.LIGHT));
                // this.element[2]++;
                // this.gold -= towerType.LIGHT[3];
                break;
            case '#1':
                type = towerType.FROZE;
                level = towerLevel.FROZE[l];
                // this.tower_list.push(new Tower(px, py, towerType.FROZE));
                // this.element[1]++;
                // this.gold -= towerType.FROZE[3];
                break;
            case '#2':
                type = towerType.FIRE;
                level = towerLevel.FIRE[l];
                // this.tower_list.push(new Tower(px, py, towerType.FIRE));
                // this.element[0]++;
                // this.gold -= towerType.LIGHT[3];
                break;
            case '#3':
                type = towerType.ARCHER;
                level = towerLevel.ARCHER[l];
                // this.tower_list.push(new Tower(px, py, towerType.ARCHER));
                // this.element[3]++;
                //console.log("build tower #3, need define towerType");
                break;
        }
        if (this.gold >= type[3]) {
            this.gold -= type[3];
            //console.log("what is:" + level);
            this.tower_list.push(new Tower(px, py, type, level));
            this.element[type[7]]++;
        }

        console.log("tower list length: " + this.tower_list.length);

        // this.tower_list.forEach(function(tower) {
        //     console.log(tower.type[0]);
        // });

        // // cur element in the game
        // console.log("element_array[fire, ice, thunder, stone]");
        // var i =0;
        // for(i = 0; i < 4; i++) {
        //     console.log(this.element[i]);
        // }

        this.skillCondition()
        //console.log("curElement!!!!!!!!!!!!!!! = " + this.curElement);
    }

    createEnemy() {
        switch(this.process) {
            case enemyGenerate.PROCESS_1:
                if (this.timer % 3 == 0 && this.enemy_counter < this.process[1]) {
                    this.enemy_list.push(new Enemy(this.enemy_path_11[0].position.x, this.enemy_path_11[0].position.y, this.process[2], this.timer, this.enemy_path_11, 1));
                    this.enemy_counter++;
                    if (this.enemy_counter >= this.process[1]) {
                        this.enemy_counter = 0;
                        this.process = enemyGenerate.PROCESS_2;
                        this.enemy_flag = false;
                        console.log("enter " + this.process[0]);
                    }
                }
                break;
            case enemyGenerate.PROCESS_2:
                if (this.enemy_list.length < 4) {
                    this.enemy_flag = true;
                }
                if (this.enemy_flag && this.timer % 3 == 0 && this.enemy_counter < this.process[1]) {
                    this.enemy_list.push(new Enemy(this.enemy_path_11[0].position.x, this.enemy_path_11[0].position.y, this.process[2], this.timer, this.enemy_path_11, 1));
                    this.enemy_list.push(new Enemy(this.enemy_path_12[0].position.x, this.enemy_path_12[0].position.y, enemyType.AGILE, this.timer, this.enemy_path_12, 2));
                    this.enemy_counter += 2;
                    if (this.enemy_counter >= this.process[1]) {
                        this.enemy_counter = 0;
                        this.process = enemyGenerate.PROCESS_3;
                        console.log("enter " + this.process[0]);
                        this.enemy_flag = false;
                    }
                }
                break;
            case enemyGenerate.PROCESS_3:
                if (this.enemy_list.length < 4) {
                    this.enemy_flag = true;
                }
                if (this.enemy_flag && this.timer % 3 == 0 && this.enemy_counter < this.process[1]) {
                    this.enemy_list.push(new Enemy(this.enemy_path_11[0].position.x, this.enemy_path_11[0].position.y, this.process[2], this.timer, this.enemy_path_11, 1));
                    this.enemy_list.push(new Enemy(this.enemy_path_12[0].position.x, this.enemy_path_12[0].position.y, enemyType.AGILE_2, this.timer, this.enemy_path_12, 2));
                    this.enemy_list.push(new Enemy(this.enemy_path_13[0].position.x, this.enemy_path_13[0].position.y, this.process[2], this.timer, this.enemy_path_13, 3));
                    this.enemy_counter += 3;
                }
                break;
        }
        // if (this.timer % 3 == 0 && this.timer <= 30) {
        //     this.enemy_list.push(new Enemy(this.enemy_path_11[0].position.x, this.enemy_path_11[0].position.y, enemyType.TANK, this.timer, this.enemy_path_11, 1));
        //     //console.log("numbers of enemy: " + this.enemy_list.length + "!!!!!!!!!!!!!!!!!!");

        //     //this.enemy_list.push(new Enemy(this.enemy_path_12[0].position.x, this.enemy_path_12[0].position.y, enemyType.TANK, this.timer, this.enemy_path_12, 2));
        //     //console.log("numbers of enemy: " + this.enemy_list.length + "!!!!!!!!!!!!!!!!!!");

        //     //this.enemy_list.push(new Enemy(this.enemy_path_13[0].position.x, this.enemy_path_13[0].position.y, enemyType.TANK, this.timer, this.enemy_path_13, 3));
        //     //console.log("numbers of enemy: " + this.enemy_list.length + "!!!!!!!!!!!!!!!!!!");
        // }

    }

    // accroding to tower that palyer built, assigin value to this.curElement(FIRE, FROZE, LIGHT, STONE)
    // call this function when build tower
    skillCondition() {
        if (this.tower_list.length <= 2) {
            console.log("length < = 2");
            this.curElement = undefined;
        } else {
            // first and second largest element
            var first = 0;
            var second = -1;
            var index;
            for (var i = 0; i < 4; i++) {
                if (this.element[i] > first) {
                    second = first;
                    first = this.element[i];
                    index = i;

                } else if (this.element[i] > second) {
                    second = this.element[i];
                }
            }

            if (second > 0 && first != second) {
                this.curElement = index;
            } else {
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
        switch (skill) {
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
                this.stoneSkill.implementSkill(this.tower_list);
                break;
        }
    }

    showSKillCD() {
        $("#skillCd0").text(this.fireSkill.cool_down - this.fireSkill.timer);
        $("#skillCd1").text(this.iceSkill.cool_down - this.iceSkill.timer);
        $("#skillCd2").text(this.thunderSkill.cool_down - this.thunderSkill.timer);
        $("#skillCd3").text(this.stoneSkill.cool_down - this.stoneSkill.timer);
        this.fireSkill.curElement = this.curElement;
        this.iceSkill.curElement = this.curElement;
        this.thunderSkill.curElement = this.curElement;
        this.stoneSkill.curElement = this.curElement;
        this.fireSkill.skillIconControl();
        this.iceSkill.skillIconControl();
        this.thunderSkill.skillIconControl();
        this.stoneSkill.skillIconControl();
    }

    /* the following four function just simply change the game_state*/
    win() {
        this.game_state = gameState.PAUSE;
        console.log(this.game_state + "the game!!!!!!");
        $('[id^=heart], [id^=diamond], #backMenuBtn, #pauseGame, #quickGame').fadeOut('fast', function () {
            $('#winScene').fadeIn('fast');
        })
    }

    lose() {
        this.game_state = gameState.PAUSE;
        console.log(this.game_state + "the game!!!!!!");
        $('[id^=heart], [id^=diamond], #backMenuBtn, #pauseGame, #quickGame').fadeOut('fast', function () {
            $('#failScene').fadeIn('fast');
        })
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
        return (x / SCREEN_WIDTH) * this.width;
    }

    scaleH(y) {
        //console.log((y/SCREEN_HEIGHT) * this.height);
        return (y / SCREEN_HEIGHT) * this.height;
    }

    // scale getSpline and enemyPath Array
    scalePath(control_points) {
        self = this;
        var path = undefined;
        // getSpline
        path = getSpline(control_points);
        //scale
        path.forEach(function (point, t) {
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
        clearInterval(this.stoneSkill.interval);
    }
}