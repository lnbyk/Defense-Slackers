class Tower extends Element {
    // constructor (position_x, position_y, towerType)
    // towerType[name, damage, cool_down, cost, range] change these info in towerType.js
    constructor(px, py, type) {
        super(px, py);
        let self = this;
        this.type = type;
        this.damage = type[1];
        this.cool_down = type[2];
        this.cost = type[3];
        this.range = type[4];
        this.debuff = type[6];
        this.buff = undefined;
        this.target = undefined;
        this.cd_ready = false;

        console.log("position: " + px + ", " + py);
        console.log(this.type);
        // attack_range
        // level
        // bullet_list
        this.bullet_list = new Array();
        // keep track of the bullet img by id
        this.bullet_id = 0;

        // set timer for this tower
        this.timer = 0.0
        this.buffTimer = 0.0;
        setInterval(function(){
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
        if (this.target != undefined && this.target.health > 0 && this.range >= this.target.getNorm(this.position.x, this.position.y)) {
            return true;
        }

        //console.log("curTarget: " + this.target);
        var self = this;
        var tmpDistance;
        var minDistance = self.range;
        var attack = false;
        enemy_list.forEach(function(enemy) {
            tmpDistance = enemy.getNorm(self.position.x, self.position.y);
            //console.log("distance: " + tmpDistance);
            if (tmpDistance < minDistance) {
                minDistance = tmpDistance;
                self.target = enemy;
                attack = true;
            }
        });
        return attack;
    }

    /* if inRange and cool_down=0 add bullet to the bullet_list
     */
    attack(enemy_list) {
        if (this.inRange(enemy_list) && this.cd_ready) {
            console.log(this.type[0] + " attack!!!!");
            this.timer = 0;
            this.cd_ready = false;

            // add bullet to list
            this.createBullet();
        }
    }

    createBullet(){
        this.bullet_list.push(new Bullet(this.position.x, this.position.y, this.type, this.target, this.bullet_id));
        this .bullet_id = (this.bullet_id + 1)%50;
        console.log(this.bullet_list.length);
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

    addBuff(buff) {
        this.buff = buff;
        if (this.buff == buffType.ATTACK_SPEED) {
            // increase attack speed
            this.cool_down = Math.floor((this.type[2] / this.buff[1]) * 10)/10;
            // need to reset timer
            this.timer = 0.0;
            console.log("current attack cd: " + this.cool_down);
        }

        // start timer
        this.buffTimer = buff[2];
    }

    buffTime() {
        // if there is a buff
        if (this.buffTimer > 0) {
            this.buffTimer -= 0.1;
            return;
        }
       
        // buff timer over
        // reset to zero
        this.buffTimer = 0.0;
 
        if (this.buff == buffType.ATTACK_SPEED) {
            this.buff = undefined;
            //normal speed
            this.cool_down = this.type[2];
            this.timer = 0.0;
        }
    }





}

//use for test  don't delet it yet
/*
let tower = new Tower(10, 10, towerType.ARCHER);
console.log(tower);
*/