class Enemy extends MovingObject{
    constructor(px,py, type) {
        super(px,py);
        this.type = type;
        this.health = type[0];
        this.loot = type[1];
        // debuff
    }

    collision() {

    }
}

// for test
/*
let enemy = new Enemy(0,0, enemyType.TANK);
let enemy2 = new Enemy(10,10, enemyType.AGILE);
enemy.setVelocity(10,20);
enemy.setAcceleration(1,0);
console.log(enemy);
console.log(enemy2);
*/