// all game data are here
/*---------------------------------------------------------------------------------------------------------------------------------------------*/ 
const debuffType = {
    NORMAL : ['normal', 0],
    DIZZY : ['dizzy', 100],
    FROZE : ['froze', 90, 6],
    FIRE : ['fire',10]
}

/*
 if we have DIZZY : ['dizzy', 2]
 which means next two updates won't update this enemy

 if we have FROZE : ['froze', 90, 2]
 which means next 90 updates enemy will slow down
 the update of the enemy will be 'update, not update, update, not update ...'
 if ['froze', 90, 6]
 then 'update, update ,update, not, not, not, update, update. update ...'
*/
/*---------------------------------------------------------------------------------------------------------------------------------------------*/ 
const buffType = {
    //[name, the increase time, buff_time(sec)]
    ATTACK_SPEED: ["attack_speed_increase", 10, 5],
}

/*---------------------------------------------------------------------------------------------------------------------------------------------*/ 
const towerType = {
    //                   0         1        2         3         4                5                   6
    // tower type and [typeName, damage, attack_cd, cost, range_radius，Bullet_velocity_scale, debuff_on_bullet]
    ARCHER: ['archer', -45, 1, 100, 400, 20, debuffType.NORMAL],
    FROZE: ['froze', -90, 1.5, 200, 400, 20, debuffType.FROZE],
    LIGHT: ['light', -100, 3.5, 200, 300, 30, debuffType.DIZZY],
    FIRE: ['fire', -200, 3, 200, 400, 20, debuffType.NORMAL, 100] // [7] the last one is range of the explosion
}

/*---------------------------------------------------------------------------------------------------------------------------------------------*/ 
const enemyType = {
    // type and [health, loot, velocity_x, velocity_y]
    TANK: [1000, 200],
    AGILE: [200, 100]
}

/*---------------------------------------------------------------------------------------------------------------------------------------------*/ 
const skillType = {
    //              0      1        2       3   4     5
    // skill type[name, damage, cool_down, id, buff, velocity]
    ARCHER : ['archer skill', 0, 10, 3, debuffType.NORMAL, 0],
    FROZE : ['frozen skill', -100, 10, 1, debuffType.DIZZY, 0],
    LIGHT : ['light skill', 0, 10, 2, buffType.ATTACK_SPEED, 0],
    FIRE : ['fire skill', -500, 10, 0, debuffType.FIRE, 25, debuffType.NORMAL]
}

/*---------------------------------------------------------------------------------------------------------------------------------------------*/ 
