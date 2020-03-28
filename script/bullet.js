class Bullet extends MovingObject {
    constructor(px, py, type, target, id) {
        /* initilize the type, velocity, acceleration
            damage, attack_target*/
            super(px, py);
            this.type = type;
            this.damage = type[1];
            this.target = target;
            this.id = "bullet" + Math.round(px) + Math.round(py) + id;
            this.debuff = type[6];
            //console.log("TARGET" + this.target);
            // initilize the velocity, scaleVelocity is from super class
            this.scaleVelcity(this.target.position.x, this.target.position.y, type[5]);
            
            // initilize the image
            var imgPath = './gameAsset/stone-tower-game-assets/PNG/40.png'
            var height = '2%';
            var width = '2%';
            if (type == skillType.FIRE) {
                imgPath = './gameAsset/stone-tower-game-assets/PNG/35.png';
                height = '10%';
                width = '3%';
            }else if (type == towerType.FIRE) {
                imgPath = './gameAsset/stone-tower-game-assets/PNG/51.png';
                height = '5%';
                width = '5%';
            }
            
            var img = $('<img />').attr({
                'id': this.id,
                'src': imgPath
            }).css({
                top: this.position.y,
                left: this.position.x,
                position: 'absolute'
            }).css ({
                'height' : height,
                'width' : width
            }).
            appendTo('#gameScreen');
    
    }

    // check if the bullet hits the target
    collision(enemy_list) {
        var self = this;
        // this is just a simple version NEED TO IMPROVE
        if (this.getNorm(this.target.position.x, this.target.position.y) <= 15) {
            // set debuff
            this.target.addDebuff(this.debuff);

            // if it is a fire bullet, explode (hit every enemies in exlposion range)
            if (this.type == towerType.FIRE) {
                console.log("explode!!!!!!!!!!!!!!!");
                enemy_list.forEach(function(enemy) {
                    if (self.getNorm(enemy.position.x, enemy.position.y) <= self.type[7]) {
                        enemy.setHealth(self.damage);
                    }
                });
                return true;
            }

            // reduce target's health
            this.target.setHealth(this.damage);
            console.log("hit!!!: health = ", this.target.health);
            
            return true;
        }
        return false;
    }

    update() {
        // uncommon the next line to allow bullet follow enenmy
        this.scaleVelcity(this.target.position.x, this.target.position.y, this.type[5]);
        this.move();
        // update img position
        $('#' + this.id).css({
            top: this.position.y,
            left: this.position.x,
            position: 'absolute'
        });

    }

    // delete the bullet img from html
    destroy_bullet() {
        $('#' + this.id).remove();
    }

}