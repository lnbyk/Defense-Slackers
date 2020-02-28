class Tower extends Element {
    constructor(px, py, type) {
        super(px, py);
        this.type = type;
        this.damage = type[1];
        this.cool_down = type[2];
        this.cost = type[3];
        this.range = type[4];
        console.log("position: " + px + ", " + py);
        console.log(this.type);
        // attack_range
        // level
        // bullet_list
        this.bullet_list = new Array();
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

//use for test  don't delet it yet

let tower = new Tower(10, 10, towerType.ARCHER);
console.log(tower);
