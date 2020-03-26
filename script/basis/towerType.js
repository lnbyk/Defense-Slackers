const towerType = {
    //                   0         1        2         3         4                5                   6
    // tower type and [typeName, damage, attack_cd, cost, range_radius，Bullet_velocity_scale, debuff_on_bullet]
    ARCHER: ['archer', -35, 0.5, 100, 400, 20, debuffType.NORMAL],
    FROZE: ['froze', -50, 1, 200, 400, 20, debuffType.FROZE],
    LIGHT: ['light', -100, 3.5, 200, 300, 30, debuffType.DIZZY],
    FIRE: ['fire', -200, 3, 200, 400, 20, debuffType.NORMAL, 100] // [7] the last one is range of the explosion
}