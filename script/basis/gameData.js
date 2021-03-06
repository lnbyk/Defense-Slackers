// all game data are here
/*---------------------------------------------------------------------------------------------------------------------------------------------*/ 
const levelPath = {
    LEVEL_1 : [CONTROL_POINTS_11, CONTROL_POINTS_12, CONTROL_POINTS_13],
    LEVEL_2 : [CONTROL_POINTS_21, CONTROL_POINTS_22],
    LEVEL_3 : [CONTROL_POINTS_31, CONTROL_POINTS_32]
}
/*---------------------------------------------------------------------------------------------------------------------------------------------*/ 
const enemyType = {
    // type and [health, loot]
    TANK: [1000, 50],
    TANK_2:[1500, 50],
    TANK_3: [2500, 75],
    AGILE: [750, 100],
    AGILE_2: [1225, 100]
}

const enemyGenerate ={
    //[name, numbers of enemy, type]
    PROCESS_1 : ["process 1", 10, [undefined, enemyType.TANK]],
    PROCESS_2 : ["process 2", 20, [enemyType.AGILE, enemyType.TANK_2]],
    PROCESS_3 : ["process 3", 30, [enemyType.AGILE_2, enemyType.TANK_3]],
    END : ["end"]
}

const levelProcess = {
    LEVEL_1 : [enemyGenerate.PROCESS_1, enemyGenerate.PROCESS_2, enemyGenerate.PROCESS_3, enemyGenerate.END],
    LEVEL_2 : [enemyGenerate.PROCESS_1, enemyGenerate.PROCESS_2, enemyGenerate.PROCESS_3, enemyGenerate.END]
}
/*---------------------------------------------------------------------------------------------------------------------------------------------*/ 
const gameLevel = {
    //  [name,home_health, initial_gola]
    LEVEL_1 : ["level_1", 100000, 300, levelPath.LEVEL_1, levelProcess.LEVEL_1],
    LEVEL_2 : ["level_2", 100000, 300, levelPath.LEVEL_2, levelProcess.LEVEL_2],
    LEVEL_3 : ["level_3", 100000, 300, levelPath.LEVEL_3, levelProcess.LEVEL_2],
    Test : ["test", 1000, 10000]
}

/*---------------------------------------------------------------------------------------------------------------------------------------------*/ 
const debuffType = {
    NORMAL : ['normal', 0],
    DIZZY : ['dizzy', 100],
    FROZE : ['froze', 90, 6],
    FIRE : ['fire',10]
}

const towerPos = [
    ["51% 26%", "60% 57%", "32% 48%", "90%, 54%", "23%, 15%"],
    ["39.5% 29.5%", "47% 67%", "69% 19.5%", "69% 42%"],
    ["29% 13.5%", "81% 13.5%", "65% 40%", "69% 63.5%", "39.5% 83.5%"],
    ["58.5% 35%", "82.5% 51%", "47.5% 69%", "19.5% 74%"]
];
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
    //[name, buff_time(sec), the increase time]
    ATTACK_SPEED: ["attack_speed_increase", 5, 10],
    ATTACK_RANGE: ["attack_range_increase", 7, 3]
}

/*---------------------------------------------------------------------------------------------------------------------------------------------*/ 
const towerLevel = {
    //                   level_1                         2                 3
    // [name, [damage_increase, speed_increase], [damage, speed ], [damage, speed]]
    // new damage = level[damage] + old damage
    // new cd = old cd - level[cd]
    // NOTE: do not change all tower speed under 1 sec 
    ARCHER : ["archer level", [0,0], [25, 0], [50, 0]],  
    FROZE : ["froze level", [0,0], [35, 0], [70, 0.5]],   
    LIGHT : ["light level", [0,0], [70, 0.5], [140, 1]],
    FIRE : ["fire level", [0,0], [25, 0.5], [50, 1]]
}

const towerType = {
    //                   0         1        2         3         4                5                   6            7    8
    // tower type and [typeName, damage, attack_cd, cost, range_radius，Bullet_velocity_scale, debuff_on_bullet, id, level]
    ARCHER: ['archer', -150, 1, 100, 400, 20, debuffType.NORMAL,3, towerLevel.ARCHER],
    FROZE: ['froze', -90, 1.5, 150, 400, 20, debuffType.FROZE,1, towerLevel.FROZE],
    LIGHT: ['light', -90, 4, 200, 270, 30, debuffType.DIZZY,2, towerLevel.LIGHT],
    FIRE: ['fire', -300, 4.5, 300, 300, 20, debuffType.NORMAL, 0, towerLevel.FIRE,125] // [9] the last one is range of the explosion
}


const towerSwitch = [towerType.LIGHT, towerType.FROZE, towerType.FIRE, towerType.ARCHER];


/*---------------------------------------------------------------------------------------------------------------------------------------------*/ 
const skillType = {
    //              0      1        2       3   4     5
    // skill type[name, damage, cool_down, id, buff, velocity]
    ARCHER : ['archer skill', 0, 9, 3, buffType.ATTACK_RANGE, 0,undefined, "stoneSound"],
    FROZE : ['frozen skill', -100, 9, 1, debuffType.DIZZY, 0, undefined, "freezeSound"],
    LIGHT : ['light skill', 0, 25, 2, buffType.ATTACK_SPEED, 0, undefined, "speedUpGame"],
    FIRE : ['fire skill', -800, 25, 0, debuffType.FIRE, 25, debuffType.NORMAL, 'LargeFireball']
}

/*---------------------------------------------------------------------------------------------------------------------------------------------*/ 
