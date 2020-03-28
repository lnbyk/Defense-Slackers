class DamageSkill extends Skill {
    constructor(type) {
        super(type);
        this.damage = type[1];
        this.debuff = type[4];
    }

    skillEffect(enemy_list) {
        console.log(this.type[0] + " skill used");
        var self = this;
        enemy_list.forEach(function(enemy) {
            // add debuff
            enemy.addDebuff(self.debuff);
            // damage enemy
            if (self.debuff != debuffType.FIRE) {
                enemy.setHealth(self.damage);
            }
        });
    }

}