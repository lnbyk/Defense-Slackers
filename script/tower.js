class Tower extends MovingObject{
    constructor(px, py, type, cd, cost) {
        super(px,py);
        this.type = type;
        this.cool_down = cd;
        this.cost = cost;
        // attack_range
        // level
        // bullet_list
    }

    /* count down the cool_down*/
    calculateCoolDown() {

    }

    /* check if there is enemy in range */
    inRange() {

    }

    /* if inRange and cool_down=0 add bullet to the bullet_list
     */
    attack() {

    }






}
/*  
use for test  don't delet it yet

let tower = new Tower(10,10,"tower1", 1, 1000);
tower.setVelocity(5,5);
tower.setAcceleration(1,1);
console.log(tower);
tower.setVelocity(100, tower.velocity.y);
console.log(tower.velocity);
*/