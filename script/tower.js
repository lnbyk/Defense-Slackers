class Tower extends Element {
    // constructor (position_x, position_y, towerType)
    // towerType[name, damage, cool_down, cost, range] change these info in towerType.js
    constructor(px, py, type, level) {
        super(px, py);
        let self = this;
        this.type = type;
        this.id = "tower" + Math.round(px) +Math.round(py);
        this.level = level;
        this.damage = type[1] - level[0]; // increase level according to level
        this.cool_down = type[2] - level[1]; // decrease cd according to level
        this.cost = type[3];
        this.range = type[4];
        this.debuff = type[6];
        this.buff = undefined;
        this.buff_list = new Array();
        this.target = undefined;
        this.cd_ready = false;

        console.log("position: " + px + ", " + py);
        console.log(this.type[0] + ", " + this.damage +", " + this.cool_down);
        // attack_range
        // level
        // bullet_list
        this.bullet_list = new Array();
        // keep track of the bullet img by id
        this.bullet_id = 0;

        // set timer for this tower
        this.timer = 0.0
        this.buffTimer = 0.0;
        this.timeInterval = setInterval(function(){
            if (game.game_state != gameState.PAUSE) {
                self.calculateCoolDown()
                self.buffTime();
            }
        }, 100);
    }

    /* count down the cool_down*/
    calculateCoolDown() {
        this.timer += 0.1;
        //console.log(Math.floor(this.timer * 10)/ 10);
        //console.log(this.cool_down);
        if (Math.floor(this.timer * 10)/ 10 == this.cool_down) {
            //console.log(this.timer % this.cool_down);
            this.cd_ready = true;
            //this.attack();
            //this.createBullet(); // TEMP Place for test only
            this.timer = 0.0;
        }
    }

    /* check if there is enemy in range 
        if true set the CLOSEST one as target and return true*/
    inRange(enemy_list) {
        // if (this.target != undefined && this.target.health > 0 && this.range >= this.target.getNorm(this.position.x, this.position.y)) {
        //     return true;
        // }

        //console.log("curTarget: " + this.target);
        var self = this;
        // attack closest enemy to tower
        // var tmpDistance;
        // var minDistance = self.range;
        // var attack = false;
        // enemy_list.forEach(function(enemy) {
        //     tmpDistance = enemy.getNorm(self.position.x, self.position.y);
        //     //console.log("distance: " + tmpDistance);
        //     if (tmpDistance < minDistance) {
        //         minDistance = tmpDistance;
        //         self.target = enemy;
        //         attack = true;
        //     }
        // });

        // attack closeest enemy to home
        var tmpDistance , distance;
        var minDistance = 100000000;
        var attack = false;
        enemy_list.forEach(function(enemy) {
            distance = enemy.getNorm(self.position.x, self.position.y);
            if (distance <= self.range) {
                tmpDistance = enemy.getNorm(enemy.posArray[enemy.posArray.length - 1].position.x, enemy.posArray[enemy.posArray.length - 1].position.y);
                if (tmpDistance < minDistance && enemy.health > 0) {
                    minDistance = tmpDistance;
                    self.target = enemy;
                    attack = true;
                }
            }
        })
        return attack;
    }

    /* if inRange and cool_down=0 add bullet to the bullet_list
     */
    attack(enemy_list) {
        if (this.inRange(enemy_list) && this.cd_ready) {
            //console.log(this.type[0] + " attack!!!!");
            this.timer = 0;
            this.cd_ready = false;

            // add bullet to list
            
            
            $('#towerASound').get(0).pause();
            this.createBullet();
            $('#towerASound').get(0).play();
            
        }
    }

    createBullet(){
        this.bullet_list.push(new Bullet(this.position.x, this.position.y, this.type, this.target, this.bullet_id, this.damage));
        this .bullet_id = (this.bullet_id + 1)%50;
        //console.log(this.bullet_list.length);
    }

    update(enemy_list) {
        var self = this;

        // update each bullet in bullet_list
        this.bullet_list.forEach(function(bullet, index) {
            //update bullet
            bullet.update();

            // if it hits the target delete it from the array and delete img
            if (bullet.collision(enemy_list)) {
                bullet.destroy_bullet();
                self.bullet_list.splice(index, 1);
            }
        });

        // check if attack
        this.attack(enemy_list);
    }

    // skill could add buff to tower
    addBuff(buff) {
        // check if there is same buff on tower
        this.buff_list.forEach(function(each) {
            if (each.equal(buff)) {
                return;
            }
        });
        // no same buff
        this.buff_list.push(new Buff(buff));
        switch(buff) {
            case buffType.ATTACK_SPEED:
                // increase attack speed
                this.cool_down = Math.floor((this.cool_down / buff[2]) * 10)/10;
                // need to reset timer
                this.timer = 0.0;
                console.log("current attack cd: " + this.cool_down);
                break;
            case buffType.ATTACK_RANGE:
                // increase attack range
                this.range = this.type[4] * buff[2];
                console.log("current attack range: " + this.range);
                break;
        }
        this.showBuff(buff)
        // this.buff = buff;
        // if (this.buff == buffType.ATTACK_SPEED) {
        //     // increase attack speed
        //     this.cool_down = Math.floor((this.type[2] / this.buff[2]) * 10)/10;
        //     // need to reset timer
        //     this.timer = 0.0;
        //     console.log("current attack cd: " + this.cool_down);
        // }

        // // start timer
        // this.buffTimer = buff[1];
        // this.showBuff();
    }

    buffTime() {
        var self = this;
        this.buff_list.forEach(function(buff, index) {
            buff.updateTimerBy(0.1);
            if (buff.buffEnd()) {
                switch (buff.type) {
                    case buffType.ATTACK_SPEED:
                        //back to normal speed
                        self.cool_down = self.type[2] - self.level[1];
                        self.timer = 0.0;
                        $('#' + 'BuffAttackSpeed' + self.id).remove();
                        break;
                    case buffType.ATTACK_RANGE:
                        // back to normal range
                        self.range = self.type[4];
                        $('#' + 'BuffAttackRange' + self.id).remove();
                        break;
                }
                self.buff_list.splice(index, 1);
            }
        });

        // // if there is a buff
        // if (this.buffTimer > 0) {
        //     this.buffTimer -= 0.1;
        //     return;
        // }
       
        // // buff timer over
        // // reset to zero
        // this.buffTimer = 0.0;
 
        // if (this.buff == buffType.ATTACK_SPEED) {
        //     this.buff = undefined;
        //     //normal speed
        //     this.cool_down = this.type[2];
        //     this.timer = 0.0;
        //     $('#' + 'BuffAttackSpeed' + this.id).remove();
        // }
    }

    showBuff(buff) {
        var id ="";
        var src = "";
        if (buff == buffType.ATTACK_SPEED) {
            id = "BuffAttackSpeed" + this.id;
            src = 'dandao/tower_effect_icons/dizzy_tower.png';
        }else if (buff == buffType.ATTACK_RANGE) {
            id = "BuffAttackRange" + this.id;
            src = 'dandao/tower_effect_icons/4.png';
        }

        if (id != "") {
            var img = $('<img />').attr({
                'id' : id,
                'src' : src
            }).css({
                top: this.position.y,
                left: this.position.x,
                position: 'absolute'
            }).css({
                'height' : '6%',
                'width' : '4%',
                'opacity' : '0.7',
                'z-index' : 28
            }).appendTo('#gameScreen');
        }
    }

    // when the tower is deleted, delete other related img(bullet, buff)
    clearUp() {
        this.bullet_list.forEach(function(bullet) {
            bullet.destroy_bullet();
        });

        $("#BuffAttackSpeed" + this.id).remove();
        $("#BuffAttackRange" + this.id).remove();
    }

    resetTimeInterval() {
        var self = this;
        clearInterval(this.timeInterval);
        this.timeInterval = setInterval(function(){
            if (game.game_state != gameState.PAUSE) {
                self.calculateCoolDown()
                self.buffTime();
            }
        }, 100/gameSpeed);
    }

}