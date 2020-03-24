const INIT_LIFE_SIZE  = 7;
const LIFE_SIZE_PERCENTAGE = INIT_LIFE_SIZE.toString() + '%';

class Enemy extends MovingObject {
    constructor(px, py, type, id) {
        super(px, py);
        this.type = type;
        this.health = type[0];
        this.loot = type[1];
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
        this.posArray = [
            []
        ];

        // choose enemy image
        this.id = "enemy" + id;
        var img = $('<img />').attr({
            'id': this.id,
            'src': './gameAsset/2d-monster-sprites/PNG/1/1_enemies_1_attack_000.png'
        }).css({
            top: this.position.y,
            left: this.position.x,
            position: 'absolute'
        }).css({
            'width': '10%',
            'height': '10%'
        }).appendTo('#gameScreen');

        // initialize enemy life bar image
        var lifeId = "lifebar" + this.id;
        var lifeImg = $('<img />').attr({
            'id': lifeId,
            'src': './gameAsset/td-gui/PNG/interface_game/bg_bar.png'
        }).css({
            top: this.position.y,
            left: this.position.x,
            position: 'absolute'
        }).css({
            'width': LIFE_SIZE_PERCENTAGE,
            'height': '2%'

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
            'height': '2%'
        }).appendTo('#gameScreen');
    }

    collision() {

    }



    // update function should be constantly called when the game is on to update the position of the enemy 
    update() {
        this.position.x += 2;
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


    }

    // input a int and change the health of the enemy 
    setHealth(x) {
        this.health += x;
        //console.log("lifebar width: " + this.lifeWidth);
        var ratio = (this.health / this.type[0]); //* this.lifeWidth; 
        var curLife = (INIT_LIFE_SIZE * ratio).toString() + '%';
        console.log("curlife: " + curLife);
        $('#' + 'health' + this.id).css({
            'width': curLife
       });
        
    }

    // when the enemy's health is zero delete it and img
    destroy_enemy(){
        $('#' + this.id).remove();
        $('#' + 'lifebar' + this.id).remove();
        $("#" + 'health' + this.id).remove();

    }

}

// for test

/*
let enemy = new Enemy(0, 0, enemyType.TANK);
let enemy2 = new Enemy(10, 10, enemyType.AGILE);
enemy.setVelocity(10, 20);
enemy.setAcceleration(1, 0);
console.log(enemy);
console.log(enemy2);
*/