class Bullet extends MovingObject {
    constructor(px, py, type, target, id) {
        /* initilize the type, velocity, acceleration
            damage, attack_target*/
            super(px, py);
            this.type = type;
            this.target = target;
            this.id = "bullet" + Math.round(px) + Math.round(py) + id;
            console.log("TARGET" + this.target);
            // initilize the velocity, scaleVelocity is from super class
            this.scaleVelcity(this.target.position.x, this.target.position.y, type[5]);
            
            // initilize the image
            var img = $('<img />').attr({
                'id': this.id,
                'src': './gameAsset/stone-tower-game-assets/PNG/40.png'
            }).css({
                top: this.position.y,
                left: this.position.x,
                position: 'absolute'
            }).
            appendTo('#gameScreen');
    
    }

    // check if the bullet hits the target
    collision() {
        // this is just a simple version NEED TO IMPROVE
        if (this.getNorm(this.target.position.x, this.target.position.y) <= 10) {
            console.log("hit !!!!!!!!!!!!!!");
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