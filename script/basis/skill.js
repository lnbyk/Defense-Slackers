class Skill {
    //constructor(skillType)
    constructor(type) {
        this.type = type;
        this.cool_down = type[2];
        this.ready = true;
        this.curElement = undefined;
        this.timer = 0;
        var self = this;
        this.interval = setInterval(function() {
            if (game.game_state != gameState.PAUSE) {
                self.calculateCoolDown();
            }
        }, 1000);

        $("#skill" + this.type[3]).css({
            opacity: 0.5
        });
        $("#skillCd" + this.type[3]).hide();
    }

    implementSkill(list) {
        if (this.curElement != this.type[3]) {
            console.log("curElement is not: " + this.type[3] + " -> " + this.type[0]);
            return;
        }
        if (this.ready) {
            // use the skill
            this.skillEffect(list);

            // start cool down
            this.ready = false;

            //show cool down
            $("#skillCd" + this.type[3]).show();
            $("#skill" +this.type[3]).css({
                opacity : 0.5
            });

        }else {
            // for test
            console.log("skill: " + this.type[0] + " in cd : " + (this.cool_down - this.timer));
        }
    }

    calculateCoolDown() {
        //console.log("calculateCoolDown in Skill class!!!!!!!!!!!!!!!!!");
        if (!this.ready) {
            this.timer++;
            //console.log(this.type[0] + "-> cool down: " + this.timer);
            if (this.timer >= this.cool_down) {
                // cool down finsih
                this.timer = 0;
                this.ready = true;
                //hide cool down
                $("#skillCd" + this.type[3]).hide();
                if (this.curElement == this.type[3]) {
                    $("#skill" +this.type[3]).css({
                        opacity : 1
                    });
                }
            }
        }
    }

    skillEffect() {
        console.log("skillEffect in Skill class !!!!!!!!!!!!!!");
    }

    skillIconControl() {
        if (this.curElement != this.type[3]) {
            $("#skill" + this.type[3]).css({
                opacity: 0.5
            });
        }else if (this.ready && this.curElement == this.type[3]){
            $("#skill" + this.type[3]).css({
                opacity: 1
            });
        }
    }
}