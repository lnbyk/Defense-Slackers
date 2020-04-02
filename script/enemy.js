const INIT_LIFE_SIZE  = 5;
const LIFE_SIZE_PERCENTAGE = INIT_LIFE_SIZE.toString() + '%';
const imgNum = 19;

class Enemy extends MovingObject {
    constructor(px, py, type, id, path, iPos) {
        super(px, py);
        this.type = type;
        this.health = type[0];
        this.loot = type[1];
        this.debuff = debuffType.NORMAL;
        this.debuffTime = 0;
        this.debuffSlow = undefined;
        this.fired = 0;
        this.fireBall = undefined;
        this.iPos = iPos
        this.flip = iPos == 3 ? -1 : 1;
        // debuff


        /* ToDO ---- should include a sequence a 2d array with x y position 
            in order to make enenmy to loop through the map
            each enemy have a uniqle position array because each enemy get in the 
            main scene in different time
        */

        // when enemy first appear, it is at the 0 index of the position map
        this.index = 0;
        // just create a empty array, this array shoud be change according to different game map 
        // not finished  --- Rubai Bian if any question please reach me 
        this.posArray = path

        // choose enemy image
        // make sure the id is unique
        this.id = "enemy" + Math.round(this.posArray[0].position.x) + Math.round(this.posArray[0].position.y) +id;
        var img = $('<img />').attr({
            'id': this.id,
            'src': './assets/enemyMove/1_enemies_1_walk_0.png'
        }).css({
            top: this.position.y,
            left: this.position.x,
            position: 'absolute'
        }).css({
            'width': '7%',
            'height': '7%',
            'z-index' : '2',
            'overflow' : 'hidden'
        }).css({
            'transform' : 'scaleX(' + this.flip + ' )'
        }).appendTo('#gameScreen');

        // initialize enemy life bar image
        var lifeId = "lifebar" + this.id;
        var lifeImg = $('<img />').attr({
            'id': lifeId,
            'src': './gameAsset/td-gui/PNG/interface_game/bg_bar.png'
        }).css({
            top: this.position.y,
            left: this.position.x,
            position: 'absolute',
            'overflow' : 'visible'
        }).css({
            'width': LIFE_SIZE_PERCENTAGE,
            'height': '1%',

        }).appendTo('#gameScreen');
        var x;// = docuemnt.querySelector('#' + lifeId);
        ///var myImg = document.getElementById(lifeId);
        //this.lifeWidth = myImg.clientWidth;//$('#' + lifeId).width();
        // initialize health image
        var healthId = "health" + this.id;
        var healthImg = $('<img />').attr({
            'id': healthId,
            'src': './gameAsset/td-gui/PNG/interface_game/bar_4.png'
        }).css({
            top: this.position.y,
            left: this.position.x,
            position: 'absolute'
        }).css({
            'width': LIFE_SIZE_PERCENTAGE,
            'height': '1%',
            'overflow' : 'hidden'
        }).appendTo('#gameScreen');
        //this.black_hand_egg();
    }

    collision() {

    }

    // to move just update enemy position to next index of enemyPath
    move(enemy_path) {
        //console.log("print index: " + this.index );
        if (this.index >= 800 && this.iPos == 3) {
            $('#' + this.id).css({
                'transform' : 'scaleX(1)'
            });
        }
        //console.log("enemy move called");
        // get position from enemy_path(array)
        this.position.x = this.posArray[this.index].position.x;
        this.position.y = this.posArray[this.index].position.y;
        
        // update index to get next position
        if (this.type == enemyType.AGILE || this.type == enemyType.AGILE_2) {
            if (this.index + 3 < this.posArray.length) {
                this.index += 3;
            }else {
                this.index ++;
            }
        }else {
            this.index ++;
        }
    }

    // update function should be constantly called when the game is on and call function move to update postion
    update(enemy_path) {
        //this.posArray = enemy_path;
        //this.position.x += 2;
        // debuff animation
        this.debuffAnimation();
        // if the enemy has a debuff effect
        if (this.debuffEffect()) {
            return;
        }
        //this.upEgg();
        // no debuff
        this.move(enemy_path);
        $('#' + this.id).css({
            top: this.position.y,
            left: this.position.x,
            position: 'absolute'
        });
        
        // Update tje css to show movement
        // update life bar postion
        $('#' + 'lifebar' + this.id).css({
            top:  this.position.y,
            left: this.position.x,
            position: 'absolute'
        });
        // update health postion
        $('#' + 'health' + this.id).css({
            top:  this.position.y,
            left: this.position.x,
            position: 'absolute',
        });


        // enemy animation change images 
        var cur = parseInt($('#' + this.id).attr('src').substring(36));
        cur = ++cur > imgNum ? 0 : cur;
        var nUrl = $('#' + this.id).attr('src').substring(0, 36) + cur + '.png';
        $('#' + this.id).attr('src', nUrl);

        

    }

    // input a int and change the health of the enemy 
    setHealth(x) {
        this.health += x;
        //console.log("lifebar width: " + this.lifeWidth);
        var ratio = (this.health / this.type[0]); //* this.lifeWidth; 
        var curLife = (INIT_LIFE_SIZE * ratio).toString() + '%';
       //console.log("curlife: " + curLife);
        $('#' + 'health' + this.id).css({
            'width': curLife
       });
        
    }

    // input a debuffType and set debuff
    addDebuff(debuff) {
        //if enemy is died no debuff
        if (this.health <= 0) {
            return;
        }
        if (debuff == debuffType.FIRE) {
            this.fired = debuff;
            this.debuffAnimationInit();
            return;
        }
        // NORMAL cannot override other debuff 
        if (debuff != debuffType.NORMAL)  {
            if (debuff == debuffType.FROZE && this.debuff == debuffType.DIZZY) {
                // FROZE cannot override DIZZY
                return;
            }
            this.debuff = debuff;
            console.log("debuff!!!!!!!!!!!: " + this.debuff);
            this.debuffTime = debuff[1];
            this.debuffSlow = debuff[2];
            this.debuffAnimationInit();
        }
    }

    // implement debuff effect on enemy
    debuffEffect() {
        // dizzy debuff
        if (this.debuff == debuffType.DIZZY) {
            this.debuffTime--;
            if (this.debuffTime <= 0) {
                this.debuff = debuffType.NORMAL;
                return false;
            }
            return true;
        }

        // froze debuff
        if (this.debuff == debuffType.FROZE) {
            this.debuffTime--;
            // if debuff time is over
            if (this.debuffTime <= 0) {
                this.debuff = debuffType.NORMAL;
                return false;
            }
            
            // if in debuff time
            //console.log("debuffSLow: " + this.debuffSlow);
            if (this.debuffSlow > this.debuff[2]/2) {
                this.debuffSlow--;
                return true;
            }else if (this.debuffSlow <= this.debuff[2]/2 && this.debuffSlow != 0) {
                this.debuffSlow--;
                return false;
            }
            else {
                this.debuffSlow = this.debuff[2];
                return false;
            }
            
        }
    }

    debuffAnimationInit() {
        //fire skill debuff animation initialize
        if (this.fired == debuffType.FIRE) {
            this.fireBall = new Bullet(this.position.x, 0, skillType.FIRE, this, "fireBall" + this.id, skillType.FIRE[1]);
            this.fired = undefined;
        }
        //freeze
        if (this.debuff == debuffType.FROZE) {
            $('#' + 'DebuffFrozen' + this.id).remove();
            var img = $('<img />').attr({
                'id': "DebuffFrozen" + this.id,
                'src': "dandao/freeze/1_effect_freeze_016.png"
            }).css({
                top: this.position.y,
                left: this.position.x,
                position: 'absolute'
            }).css({
                'height' : '8%',
                'width' :'8%',
                'z-index' : '1'
            }).
            appendTo('#gameScreen');
        }

        //dizzy
        if (this.debuff == debuffType.DIZZY) {
            $('#' + 'DebuffDizzy' + this.id).remove();
            var img = $('<img />').attr({
                'id': "DebuffDizzy" + this.id,
                'src': "dandao/dizzy/1_effect_time_014.png"
            }).css({
                top: this.position.y,
                left: this.position.x,
                position: 'absolute'
            }).css({
                'height' : '4%',
                'width' :'8%',
                'z-index' : '3'
            }).
            appendTo('#gameScreen');
        }
    }

    debuffAnimation() {
        // if (this.debuff == debuffType.NORMAL) {
        //     $('#' + 'frozenDebuff' + this.id).remove();
        // } 
        if (this.fireBall != undefined) {
            //console.log("update fireball???????????");
            this.fireBall.update();
            if (this.fireBall.collision(null) || this.health <=0) {
                this.fireBall.destroy_bullet();
                this.fireBall = undefined;
            }
        }
        // freeze
        if (this.debuff == debuffType.FROZE) {
            $('#' + 'DebuffFrozen' + this.id).css({
                top: this.position.y,
                left: this.position.x,
                position: 'absolute'
            });
        }
        //dizzy
        if (this.debuff == debuffType.DIZZY) {
            $('#' + 'DebuffDizzy' + this.id).css({
                top: this.position.y,
                left: this.position.x,
                position: 'absolute'
            });
        }
        if (this.debuff == debuffType.NORMAL) {
            $('#' + 'DebuffFrozen' + this.id).remove();
            $('#' + 'DebuffDizzy' + this.id).remove();
        }
    }

    // when the enemy's health is zero delete it and img
    destroy_enemy(){
        $('#' + this.id).remove();
        $('#' + 'lifebar' + this.id).remove();
        $("#" + 'health' + this.id).remove();
        $('#' + 'DebuffFrozen' + this.id).remove();
        $('#' + 'DebuffDizzy' + this.id).remove();
        $('#'+"enemyBlackHand" + this.id).remove();

    }

    black_hand_egg() {
        var img = $('<img />').attr({
            'id': "enemyBlackHand" + this.id,
            'src': './egg/black_hand.jpg'
        }).css({
            top: this.position.y,
            left: this.position.x,
            position: 'absolute'
        }).css({
            'width': '6%',
            'height': '6%',
            'z-index' : '2',
            'overflow' : 'hidden'
        }).css({
            'transform' : 'scaleX(' + this.flip + ' )'
        }).appendTo('#gameScreen');
    }

    upEgg() {
        $('#'+"enemyBlackHand" + this.id).css({
            top: this.position.y,
            left: this.position.x,
            position: 'absolute'

        });
    }
}