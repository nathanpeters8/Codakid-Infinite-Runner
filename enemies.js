/* ################################################
                REGULAR ENEMY
##################################################*/

// constructor function
function Enemy(x, y, speed, image) {
    // turn object into Sprite
    Phaser.Sprite.call(this, game, x, y, image);

    // add object into game
    game.add.existing(this);

    this.size = 40;
    this.anchor.setTo(0.5, 0.5);

    // add and play animation
    this.animations.add('walk');
    this.animations.play('walk', 10, true);

    this.speed = speed;

}

// tell enemy prototypes (objects) to inherit from Sprite class
Enemy.prototype = Object.create(Phaser.Sprite.prototype);

// enemy update function
Enemy.prototype.update = function() {
    this.x -= this.speed;


    if(this.x < -150) {
        this.destroy();
    }

    //check if enemy collides with player
    if(checkCollision(this, player)) {
        gameOver();
    }
}


/* ################################################
                ZIG ZAG ENEMY
################################################## */

// constructor
function ZigZagger(x, y, speed) {
    // inherit code from regular Enemy constructor
    Enemy.call(this, x, y, speed, 'zigZagEnemy');
}

// make objects/prototypes for zig zag enemy
ZigZagger.prototype = Object.create(Enemy.prototype);


// update function
ZigZagger.prototype.update = function() {
    // inherit Enemy update function
    Enemy.prototype.update.call(this);

    // move up and down
    this.y = Math.sin(this.x * 0.01) * 200 + 300;
}


/* ################################################
                CHASER ENEMY
################################################## */

function Chaser(x, y, speed) {
    Enemy.call(this, x, y, speed, 'chaser');

    this.ySpeed = 0;
    this.maxSpeed = 3;
    this.acc = 0.2;
}
Chaser.prototype = Object.create(Enemy.prototype);

Chaser.prototype.update = function() {
    Enemy.prototype.update.call(this);

    // if enemy is above the player
    if(this.y < player.y) {
        console.log('enemy above the player')
        if(this.ySpeed < this.maxSpeed) {
            this.ySpeed += this.acc;
        }
    }
    else {
        console.log('enemy below the player ')
        if(this.ySpeed > this.maxSpeed) {
            this.ySpeed -= this.acc;
        }
    }

    console.log(this.ySpeed);

    this.y += this.ySpeed;

}


/* ################################################
                SPEED ENEMY
################################################## */

function Speed(y) {
    Enemy.call(this, 3000, y, 30, 'speedEnemy');

    // create flashing warning sign
    this.warning = game.add.sprite(880, y, 'warning');
    this.warning.anchor.setTo(0.5, 0.5);
    this.warning.flash = function() {
        // if visible
        if(this.visible){ //!
            this.visible = false; //!
        }
        // if invisible
        else {
            this.visible = true; //!
        }

        // run flash function on timer
        game.time.events.add(200, this.flash, this);
    }

    this.warning.flash();
}
Speed.prototype = Object.create(Enemy.prototype);

Speed.prototype.update = function() {
    Enemy.prototype.update.call(this);

    // if enemy is on screen
    if(this.x < 900) {
        // destroy warning sign
        this.warning.destroy();
    }
}