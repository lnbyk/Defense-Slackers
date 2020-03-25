const towerType = {
    //                   0         1        2         3         4                5                   6
    // tower type and [typeName, damage, attack_cd, cost, range_radius，Bullet_velocity_scale, debuff_on_bullet]
    ARCHER: ['archer', -10, 0.5, 100, 400, 20, debuffType.NORMAL],
    FROZE: ['froze', -10, 3, 200, 400, 10, debuffType.FROZE],
    LIGHT: ['light', -200, 3.5, 200, 300, 30, debuffType.DIZZY]
}