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
        console.log("position: " + px + ", " + py);
        console.log(this.type);
        // attack_range
        // level
        // bullet_list
        this.bullet_list = new Array();

        // set timer for this tower
        this.timer = 0;
        setInterval(function(){self.calculateCoolDown()}, 1000);
    }

    /* count down the cool_down*/
    calculateCoolDown() {
        this.timer++;
        //console.log(this.timer);
        //console.log(this.cool_down);
        if (this.timer == this.cool_down) {
            //console.log(this.timer % this.cool_down);
            this.attack();
            this.timer = 0;
        }
    }

    /* check if there is enemy in range */
    inRange() {

    }

    /* if inRange and cool_down=0 add bullet to the bullet_list
     */
    attack() {
        console.log(this.type[0] + " attack!!!!");
    }






}

//use for test  don't delet it yet
/*
let tower = new Tower(10, 10, towerType.ARCHER);
console.log(tower);
*/