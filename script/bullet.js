class Bullet extends MovingObject {
    constructor(px, py, type, target) {
        /* initilize the type, velocity, acceleration
            damage, attack_target*/
            super(px, py);
            this.type = type;
            this.target = target;
            console.log("TARGET" + this.target)
            
    }

    collision() {

    }
}