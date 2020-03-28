class BuffSkill extends Skill {
    constructor(type) {
        super(type);
        this.buff = type[4];
    }

    skillEffect(tower_list) {
        console.log(this.type[0] + " skill used");
        var self = this;
        tower_list.forEach(function(tower) {
            tower.addBuff(self.buff);
        });
    }
}